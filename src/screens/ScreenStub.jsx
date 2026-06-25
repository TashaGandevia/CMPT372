// ScreenStub (INF-4) — shared layout for the placeholder screens.
//
// INF-4 only needs the flow to be walkable, so every screen reuses this simple
// centered card. M2 (UI-1..UI-9) replaces each screen with its real design.
import { motion } from 'framer-motion';
import { Card } from '../components';
import { slideUp } from '../lib/motion.js';

export default function ScreenStub({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div {...slideUp} className="w-full max-w-md">
        <Card className="flex flex-col gap-4 text-center">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && <p className="mt-1 text-text-muted">{subtitle}</p>}
          </div>
          {/* Action buttons that drive the flow transitions. */}
          <div className="flex flex-wrap justify-center gap-3">{children}</div>
        </Card>
      </motion.div>
    </div>
  );
}
