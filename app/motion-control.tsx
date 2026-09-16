'use client';
import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function MotionControl() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem('ph-motion'); } catch { /* Storage may be unavailable. */ }
      setEnabled(!media.matches && saved !== 'off');
    };
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? 'full' : 'reduced';
    if (!enabled || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);
  function toggle(value: boolean) {
    setEnabled(value);
    try { localStorage.setItem('ph-motion', value ? 'on' : 'off'); } catch { /* Keep session preference. */ }
  }
  return <label className="motion-control"><Zap size={14}/><span>Animacje <span className="motion-state">{enabled ? 'wł.' : 'wył.'}</span></span><Switch checked={enabled} onCheckedChange={toggle} aria-label="Animacje — wyłącz, aby włączyć tryb lekki"/></label>;
}
