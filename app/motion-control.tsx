'use client';
import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { motionEnabled, startMotionEffects } from '@/lib/motion.mjs';

export function MotionControl() {
  const [enabled, setEnabled] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      let storage: Storage | undefined;
      try {
        storage = window.localStorage;
      } catch {
        /* Browser can block storage access. */
      }
      setSystemReduced(media.matches);
      setEnabled(motionEnabled(storage, media.matches));
    };
    const onStorage = (event: StorageEvent) => {
      if (!event.key || event.key === 'ph-motion') sync();
    };
    sync();
    media.addEventListener('change', sync);
    window.addEventListener('storage', onStorage);
    return () => {
      media.removeEventListener('change', sync);
      window.removeEventListener('storage', onStorage);
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? 'full' : 'reduced';
    if (!enabled) return;
    return startMotionEffects(document, window.IntersectionObserver);
  }, [enabled]);
  function toggle(value: boolean) {
    setEnabled(value && !systemReduced);
    try {
      localStorage.setItem('ph-motion', value ? 'on' : 'off');
    } catch {
      /* Keep session preference. */
    }
  }
  return (
    <label
      className="motion-control"
      title={
        systemReduced
          ? 'Tryb lekki: systemowe ograniczenie ruchu jest włączone.'
          : 'Wyłącz animacje, aby zmniejszyć obciążenie komputera. Ustawienie zostanie zapamiętane.'
      }
    >
      <Zap size={14} />
      <span>
        {systemReduced ? 'Tryb lekki' : 'Animacje'}{' '}
        <span className="motion-state">
          {systemReduced ? '(system)' : enabled ? 'wł.' : 'wył.'}
        </span>
      </span>
      <Switch
        checked={enabled}
        onCheckedChange={toggle}
        disabled={systemReduced}
        aria-label={
          systemReduced
            ? 'Animacje wyłączone zgodnie z ustawieniami systemu'
            : 'Animacje — wyłącz, aby włączyć tryb lekki'
        }
      />
    </label>
  );
}
