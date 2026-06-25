// Overlay (INF-4) — shared modal shell for the PAUSED and PROFILE overlays.
//
// Renders a dimmed backdrop with a centered dialog that floats above the
// suspended screen (which stays mounted underneath, so closing resumes exactly
// where the player left off). Closing on Escape and on backdrop click is built
// in for accessibility/convenience.
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components';
import { fade, slideUp } from '../lib/motion.js';

export default function Overlay({ title, onClose, children }) {
  // Close when Escape is pressed, regardless of focus.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      {...fade}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
      onClick={onClose} // click on backdrop closes
    >
      <motion.div
        {...slideUp}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-sm"
        onClick={(e) => e.stopPropagation()} // clicks inside don't close
      >
        <Card className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">{title}</h2>
          {children}
        </Card>
      </motion.div>
    </motion.div>
  );
}
