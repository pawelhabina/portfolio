'use client';

import { useEffect, useRef } from 'react';
import { useTerminalMotion } from './terminal-experience';

export function CustomCursor() {
  const { enabled, ready } = useTerminalMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!enabled || !ready || !cursor) return;
    const root = document.documentElement;
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    let x = 0;
    let y = 0;
    let interactive = false;

    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      delete root.dataset.customCursor;
      cursor.dataset.visible = 'false';
    };
    const move = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (
        !pointer.matches ||
        event.pointerType !== 'mouse' ||
        document.hidden ||
        target?.closest(
          'input, textarea, select, [contenteditable]:not([contenteditable="false"])',
        )
      ) {
        hide();
        return;
      }
      x = event.clientX;
      y = event.clientY;
      interactive = !!target?.closest(
        'a, button, [role="button"], [role="switch"], summary',
      );
      // One paint per mouse event burst; no idle animation loop or React rerenders.
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          cursor.dataset.interactive = String(interactive);
          cursor.dataset.visible = 'true';
          root.dataset.customCursor = 'on';
        });
    };
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Tab' || event.key === 'Escape') hide();
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', hide);
    document.addEventListener('pointercancel', hide);
    document.addEventListener('keydown', keyboard);
    document.addEventListener('visibilitychange', hide);
    document.addEventListener('contextmenu', hide);
    window.addEventListener('blur', hide);
    pointer.addEventListener('change', hide);
    return () => {
      hide();
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', hide);
      document.removeEventListener('pointercancel', hide);
      document.removeEventListener('keydown', keyboard);
      document.removeEventListener('visibilitychange', hide);
      document.removeEventListener('contextmenu', hide);
      window.removeEventListener('blur', hide);
      pointer.removeEventListener('change', hide);
    };
  }, [enabled, ready]);

  return (
    <div ref={ref} className="custom-cursor" aria-hidden="true">
      <span />
    </div>
  );
}
