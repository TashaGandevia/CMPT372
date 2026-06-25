// ProfileOverlay (INF-4 stub; SYS-7 badge shelf) — the PROFILE overlay. Built
// out in UI-8 (level, total XP, badge shelf, per-zone accuracy, review-queue
// size). For now it shows the data-driven badge shelf. Closing resumes the
// screen underneath.
import { Button, BadgeShelf } from '../components';
import { useFlow } from '../state/flowContext.js';
import { selectReviewQueueSize } from '../state/selectors.js';
import Overlay from './Overlay.jsx';

export default function ProfileOverlay() {
  const game = useFlow();
  const reviewSize = selectReviewQueueSize(game);
  return (
    <Overlay title="Profile" onClose={game.closeProfile}>
      <p className="text-sm text-text-muted">
        Review queue: {reviewSize} item{reviewSize === 1 ? '' : 's'}
      </p>
      <BadgeShelf />
      <Button onClick={game.closeProfile}>Close</Button>
    </Overlay>
  );
}
