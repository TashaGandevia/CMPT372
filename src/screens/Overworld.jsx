import { motion } from 'framer-motion';
import { Button, Card, ProgressBar } from '../components';
import { slideUp } from '../lib/motion.js';
import { useContent } from '../state/contentContext.js';
import { useFlow } from '../state/flowContext.js';
import { selectStackCompletion } from '../state/selectors.js';

export default function Overworld() {
  const content = useContent();
  const game = useFlow();
  const { zones, selectZone, startCapstone, openProfile } = game;
  const completion = selectStackCompletion(game);

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <motion.div {...slideUp} className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <Card className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Full-Stack Quest
              </p>
              <h1 className="mt-1 text-3xl font-bold text-text">
                Ship an app through the stack
              </h1>
              <p className="mt-2 max-w-2xl text-text-muted">
                Start with how the web works, then move through the front end,
                Node, databases, and the later delivery checkpoints as course
                notes are added.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={openProfile}>
                Profile
              </Button>
              <Button variant="ghost" onClick={startCapstone}>
                Capstone
              </Button>
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm text-text-muted">
              <span>Stack completion</span>
              <span>{Math.round(completion * 100)}%</span>
            </div>
            <ProgressBar value={completion} max={1} />
          </div>
        </Card>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {content.zones.map((zone) => {
            const progress = zones[zone.id];
            const challengeCount = content.challengesForZone(zone.id).length;
            const awaitingNotes =
              zone.status === 'locked-content' && challengeCount === 0;
            const locked = !progress?.unlocked || awaitingNotes;
            let statusLabel = 'Ready';
            if (zone.status === 'placeholder') statusLabel = 'SKIP';
            else if (awaitingNotes) statusLabel = 'Awaiting notes';
            else if (progress?.completed) statusLabel = `${progress.stars}/3`;
            else if (!progress?.unlocked) statusLabel = 'Locked';

            let actionLabel = 'Enter zone';
            if (awaitingNotes) actionLabel = 'Awaiting notes';
            else if (zone.status === 'placeholder') {
              actionLabel = 'Open checkpoint';
            }

            return (
              <Card
                key={zone.id}
                className={[
                  'flex min-h-56 flex-col gap-4',
                  locked ? 'opacity-55' : '',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                      Zone {zone.order}
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-text">{zone.name}</h2>
                    <p className="mt-1 text-sm text-text-muted">{zone.theme}</p>
                  </div>
                  <span className="badge">{statusLabel}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {zone.concepts.map((concept) => (
                    <span
                      key={concept}
                      className="rounded-md border border-border bg-surface-muted px-2 py-1 text-xs font-semibold text-text-muted"
                    >
                      {concept}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex justify-end">
                  <Button
                    onClick={() => selectZone(zone.id)}
                    disabled={locked}
                    variant={
                      zone.status === 'placeholder' ? 'secondary' : 'primary'
                    }
                  >
                    {actionLabel}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
