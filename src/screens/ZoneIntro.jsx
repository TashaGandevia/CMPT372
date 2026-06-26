import { motion } from 'framer-motion';
import { Button, Card } from '../components';
import { slideUp } from '../lib/motion.js';
import { useContent } from '../state/contentContext.js';
import { useFlow } from '../state/flowContext.js';

export default function ZoneIntro() {
  const content = useContent();
  const { zoneId, startZone } = useFlow();
  const zone = content.zones.find((item) => item.id === zoneId);
  const zoneChallenges = content.challengesForZone(zoneId);
  const challengeCount = zoneChallenges.filter(
    (challenge) => !challenge.isBoss
  ).length;
  const bossCount = zoneChallenges.filter((challenge) => challenge.isBoss).length;
  const subsectionCounts = Object.fromEntries(
    (zone?.subsections ?? []).map((subsection) => [
      subsection.id,
      zoneChallenges.filter((challenge) => challenge.subsection === subsection.id)
        .length,
    ])
  );
  let checkpointLabel = 0;
  if (bossCount > 0) checkpointLabel = bossCount;
  else if (zone?.status === 'placeholder') checkpointLabel = 'SKIP';
  const actionLabel =
    zone?.status === 'placeholder' ? 'Start SKIP checkpoint' : 'Start zone';

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <motion.div {...slideUp} className="mx-auto grid w-full max-w-4xl gap-4">
        <Card className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Zone {zone?.order ?? '?'}
            </p>
            <h1 className="mt-1 text-3xl font-bold text-text">
              {zone?.name ?? 'Zone Intro'}
            </h1>
            <p className="mt-2 text-lg text-text-muted">{zone?.theme}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Practice
              </p>
              <p className="mt-1 text-2xl font-bold text-text">{challengeCount}</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Checkpoint
              </p>
              <p className="mt-1 text-2xl font-bold text-text">{checkpointLabel}</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Status
              </p>
              <p className="mt-1 text-2xl font-bold text-text">
                {zone?.status === 'placeholder' ? 'SKIP' : 'Ready'}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text">Concepts</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {(zone?.concepts ?? []).map((concept) => (
                <span
                  key={concept}
                  className="rounded-md border border-border bg-surface-muted px-3 py-2 text-sm font-semibold text-text-muted"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {zone?.subsections?.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-text">Subsections</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {zone.subsections.map((subsection) => {
                  const count = subsectionCounts[subsection.id] ?? 0;
                  return (
                    <div
                      key={subsection.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-muted px-3 py-2"
                    >
                      <span className="text-sm font-semibold text-text">
                        {subsection.name}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                        {count > 0 ? `${count} items` : 'Empty for now'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={startZone}>{actionLabel}</Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
