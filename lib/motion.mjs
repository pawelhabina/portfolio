/** @param {Pick<Storage, 'getItem'> | undefined} storage @param {boolean} systemReduced */
export function motionEnabled(storage, systemReduced) {
  if (systemReduced) return false;
  try {
    return storage?.getItem('ph-motion') !== 'off';
  } catch {
    return true;
  }
}

/** Stop observers and visibility listeners when light mode is enabled or the component unmounts.
 * @param {Document} doc
 * @param {typeof IntersectionObserver | undefined} Observer
 */
export function startMotionEffects(doc, Observer) {
  const visibility = () => {
    doc.documentElement.dataset.paused = String(doc.hidden);
  };
  visibility();
  doc.addEventListener('visibilitychange', visibility);
  const reveal = Observer
    ? new Observer(
        (entries) => {
          for (const entry of entries)
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              reveal?.unobserve(entry.target);
            }
        },
        { threshold: 0.12 },
      )
    : null;
  const regions = Observer
    ? new Observer((entries) => {
        for (const entry of entries)
          entry.target.setAttribute(
            'data-active',
            String(entry.isIntersecting),
          );
      })
    : null;
  doc.querySelectorAll('.reveal').forEach((el) => reveal?.observe(el));
  doc.querySelectorAll('.motion-region').forEach((el) => regions?.observe(el));
  return () => {
    reveal?.disconnect();
    regions?.disconnect();
    doc.removeEventListener('visibilitychange', visibility);
    delete doc.documentElement.dataset.paused;
  };
}
