import test from 'node:test';
import assert from 'node:assert/strict';
import { motionEnabled, startMotionEffects } from '../lib/motion.mjs';

test('system preference takes precedence over saved animation opt-in', () => {
  assert.equal(motionEnabled({ getItem: () => 'on' }, true), false);
});
test('light mode persists while a new visitor gets animation by default', () => {
  assert.equal(motionEnabled({ getItem: () => 'off' }, false), false);
  assert.equal(motionEnabled({ getItem: () => null }, false), true);
});
test('blocked browser storage cannot break rendering', () => {
  assert.equal(
    motionEnabled(
      {
        getItem() {
          throw Error('SecurityError');
        },
      },
      false,
    ),
    true,
  );
  assert.equal(motionEnabled(undefined, true), false);
});
function fixture() {
  const listeners = new Map();
  const doc = {
    hidden: false,
    documentElement: { dataset: {} },
    querySelectorAll: () => [],
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: (name) => listeners.delete(name),
  };
  const observers = [];
  class Observer {
    constructor(callback) {
      this.callback = callback;
      this.disconnected = false;
      observers.push(this);
    }
    observe() {}
    unobserve(target) {
      this.unobserved = target;
    }
    disconnect() {
      this.disconnected = true;
    }
  }
  return { doc, listeners, observers, Observer };
}
test('hidden tabs pause motion and light-mode cleanup releases all observers/listeners', () => {
  const { doc, listeners, observers, Observer } = fixture();
  const stop = startMotionEffects(doc, Observer);
  assert.equal(doc.documentElement.dataset.paused, 'false');
  doc.hidden = true;
  listeners.get('visibilitychange')();
  assert.equal(doc.documentElement.dataset.paused, 'true');
  stop();
  assert.equal(listeners.size, 0);
  assert.equal(observers.length, 2);
  assert.ok(observers.every((observer) => observer.disconnected));
  assert.equal(doc.documentElement.dataset.paused, undefined);
});
test('offscreen regions pause and entrance observers release revealed sections', () => {
  const { doc, observers, Observer } = fixture();
  const stop = startMotionEffects(doc, Observer);
  const target = {
    classList: {
      add(name) {
        target.className = name;
      },
    },
    setAttribute(name, value) {
      target[name] = value;
    },
  };
  observers[0].callback([{ target, isIntersecting: true }]);
  assert.equal(target.className, 'is-visible');
  assert.equal(observers[0].unobserved, target);
  observers[1].callback([{ target, isIntersecting: false }]);
  assert.equal(target['data-active'], 'false');
  observers[1].callback([{ target, isIntersecting: true }]);
  assert.equal(target['data-active'], 'true');
  stop();
});
test('older browsers without IntersectionObserver retain visible, usable content', () => {
  const { doc, listeners } = fixture();
  const stop = startMotionEffects(doc, undefined);
  assert.equal(doc.documentElement.dataset.paused, 'false');
  stop();
  assert.equal(listeners.size, 0);
});
