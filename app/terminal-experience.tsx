'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { motionEnabled, startMotionEffects } from '@/lib/motion.mjs';

const MotionContext = createContext({
  enabled: false,
  ready: false,
  systemReduced: false,
  booting: false,
  toggle: (_value: boolean) => {},
});
export const useTerminalMotion = () => useContext(MotionContext);
const bootLines = [
  'Wczytywanie profilu: Paweł Habina',
  'Otwieranie katalogu projektów',
  'SeaByte / ParsHub / eksperymenty',
  'Przygotowanie środowiska',
  'Portfolio gotowe. Witaj!',
];

export function TerminalExperience({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preferences, setPreferences] = useState({
    enabled: false,
    systemReduced: false,
    ready: false,
  });
  const [boot, setBoot] = useState<'pending' | 'running' | 'done'>('pending');
  const [step, setStep] = useState(0);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      let storage: Storage | undefined;
      try {
        storage = window.localStorage;
      } catch {
        /* Optional device preference. */
      }
      setPreferences({
        enabled: motionEnabled(storage, media.matches),
        systemReduced: media.matches,
        ready: true,
      });
    };
    const storageChange = (event: StorageEvent) => {
      if (!event.key || event.key === 'ph-motion') sync();
    };
    sync();
    media.addEventListener('change', sync);
    window.addEventListener('storage', storageChange);
    return () => {
      media.removeEventListener('change', sync);
      window.removeEventListener('storage', storageChange);
    };
  }, []);
  useEffect(() => {
    if (!preferences.ready) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setBoot((current) =>
        current === 'pending'
          ? preferences.enabled
            ? 'running'
            : 'done'
          : !preferences.enabled
            ? 'done'
            : current,
      );
    });
    return () => {
      cancelled = true;
    };
  }, [preferences.ready, preferences.enabled]);
  useEffect(() => {
    document.documentElement.dataset.motion = preferences.enabled
      ? 'full'
      : 'reduced';
    if (!preferences.enabled) return;
    return startMotionEffects(document, window.IntersectionObserver);
  }, [preferences.enabled]);
  useEffect(() => {
    if (boot !== 'running') return;
    const timers = bootLines.map((_, index) =>
      window.setTimeout(() => setStep(index + 1), 250 + index * 420),
    );
    timers.push(window.setTimeout(() => setBoot('done'), 2650));
    return () => timers.forEach(window.clearTimeout);
  }, [boot]);
  function toggle(value: boolean) {
    setPreferences((current) => ({
      ...current,
      enabled: value && !current.systemReduced,
    }));
    if (!value) setBoot('done');
    try {
      localStorage.setItem('ph-motion', value ? 'on' : 'off');
    } catch {
      /* Keep session preference. */
    }
  }
  const booting = boot !== 'done';
  return (
    <MotionContext.Provider value={{ ...preferences, booting, toggle }}>
      {children}
      <Dialog
        open={boot === 'running' && preferences.enabled}
        onOpenChange={(open) => {
          if (!open) setBoot('done');
        }}
      >
        <DialogContent className="boot-dialog" showCloseButton={false}>
          <div className="terminal-bar">
            <span className="window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>pawel@portfolio: ~</span>
            <span>bash</span>
          </div>
          <div className="boot-body">
            <DialogTitle className="boot-title">
              Uruchamianie portfolio
              <span className="terminal-cursor" aria-hidden="true">
                _
              </span>
            </DialogTitle>
            <DialogDescription className="boot-description">
              Paweł Habina / informatyk & programista
            </DialogDescription>
            <p className="command-line">
              <span>~ $</span> ./portfolio --start
            </p>
            <ol className="boot-log" aria-label="Etapy uruchamiania">
              {bootLines.map((line, index) => (
                <li
                  key={line}
                  className={step > index ? 'boot-line completed' : 'boot-line'}
                >
                  <span aria-hidden="true">[ok]</span>
                  {line}
                </li>
              ))}
            </ol>
            <div className="boot-bottom">
              <span aria-live="polite">
                {step === bootLines.length ? 'Gotowe.' : 'Inicjalizacja sesji…'}
              </span>
              <button type="button" onClick={() => setBoot('done')}>
                Pomiń intro <span aria-hidden="true">↵</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MotionContext.Provider>
  );
}

function subscribeVisibility(callback: () => void) {
  document.addEventListener('visibilitychange', callback);
  return () => document.removeEventListener('visibilitychange', callback);
}
const noSubscription = () => () => {};
const visibleSnapshot = () => !document.hidden;
const serverVisible = () => true;

/** A stable accessible label and an invisible full-size copy prevent chatter and layout shifts. */
export function Typewriter({
  text,
  phrases,
  loop = false,
  className = '',
}: {
  text: string;
  phrases?: string[];
  loop?: boolean;
  className?: string;
}) {
  const { enabled, ready, booting } = useTerminalMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [value, setValue] = useState(text);
  const visible = useSyncExternalStore(
    enabled ? subscribeVisibility : noSubscription,
    visibleSnapshot,
    serverVisible,
  );
  const sequenceKey = JSON.stringify(phrases?.length ? phrases : [text]);
  const reserve = (phrases?.length ? phrases : [text]).reduce(
    (longest, phrase) =>
      Array.from(phrase).length > Array.from(longest).length ? phrase : longest,
    text,
  );
  const active = enabled && ready && !booting && inView && visible;
  useEffect(() => {
    if (!enabled || !window.IntersectionObserver || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0].isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled]);
  useEffect(() => {
    if (!active) return;
    const words: string[] = JSON.parse(sequenceKey);
    let wordIndex = 0;
    let count = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const letters = Array.from(words[wordIndex]);
      setValue(letters.slice(0, count).join(''));
      if (!deleting && count === letters.length) {
        if (!loop) return;
        deleting = true;
        timer = setTimeout(tick, 5200);
      } else if (deleting && count === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timer = setTimeout(tick, 350);
      } else {
        count += deleting ? -1 : 1;
        timer = setTimeout(tick, deleting ? 26 : 64);
      }
    };
    timer = setTimeout(tick, 120);
    return () => clearTimeout(timer);
  }, [active, sequenceKey, loop]);
  return (
    <span className={`typewriter ${className}`} ref={ref}>
      <span className="sr-only">{text}</span>
      <span className="type-reserve" aria-hidden="true">
        {reserve}
      </span>
      <span className="type-ink" aria-hidden="true">
        {active ? value : text}
        <span className="terminal-cursor">_</span>
      </span>
    </span>
  );
}
