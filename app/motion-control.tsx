'use client';
import { Switch } from '@/components/ui/switch';
import { useTerminalMotion } from './terminal-experience';

export function MotionControl() {
  const { enabled, systemReduced, toggle } = useTerminalMotion();
  return (
    <label
      className="motion-control"
      title={
        systemReduced
          ? 'Systemowe ograniczenie ruchu: intro i animacje są wyłączone.'
          : 'Wyłącz intro oraz animacje pisania. Ustawienie zostanie zapamiętane.'
      }
    >
      <span>
        {systemReduced ? 'tryb lekki' : 'animacje'}{' '}
        <span className="motion-state">[{enabled ? 'on' : 'off'}]</span>
      </span>
      <Switch
        checked={enabled}
        onCheckedChange={toggle}
        disabled={systemReduced}
        aria-label="Animacje terminala — wyłącz, aby włączyć tryb lekki"
      />
    </label>
  );
}
