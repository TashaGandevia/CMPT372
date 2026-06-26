import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, ComboMeter, ProgressBar } from '../components';
import { buildRunForZone } from '../data/contentPack.js';
import { slideUp } from '../lib/motion.js';
import { useContent } from '../state/contentContext.js';
import { useFlow } from '../state/flowContext.js';
import { selectReviewIds } from '../state/selectors.js';

export default function PlayingScreen() {
  const content = useContent();
  const game = useFlow();
  const { zoneId, run, startRun, answer, completeRun, startBoss, openPause } =
    game;
  const zone = content.zones.find((item) => item.id === zoneId);

  useEffect(() => {
    if (run) return;

    const available = content
      .challengesForZone(zoneId ?? 'z1')
      .filter((challenge) => !challenge.isBoss);
    const queue = buildRunForZone(content, zoneId ?? 'z1', {
      count: Math.min(8, available.length),
      difficultyCurve: ['easy', 'easy', 'med', 'med', 'hard'],
      reviewIds: selectReviewIds(game),
      reviewBias: 0.25,
    });

    startRun(zoneId ?? 'z1', { queue });
    // Start only when this screen mounts without a run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentChallenge = run?.queue?.[run.index] ?? null;
  const MiniGame = useMemo(
    () => content.resolveMiniGame(currentChallenge?.type),
    [content, currentChallenge?.type]
  );
  const progressValue = run?.index ?? 0;
  const progressMax = run?.queue?.length ?? 1;

  const handleAnswer = (correct, meta = {}) => {
    const challenge = meta.challenge ?? currentChallenge;
    answer({
      correct,
      difficulty: challenge?.difficulty ?? 'easy',
      challengeId: challenge?.id,
    });
  };

  const handleComplete = () => {
    if (!run?.queue?.length || run.index >= run.queue.length) {
      completeRun();
      startBoss();
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <motion.div {...slideUp} className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <Card className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                {zone?.theme ?? 'Zone'}
              </p>
              <h1 className="mt-1 text-2xl font-bold text-text">
                {zone?.name ?? 'Playing'}
              </h1>
            </div>
            <Button variant="ghost" onClick={openPause}>
              Pause
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <div className="mb-2 flex justify-between text-sm text-text-muted">
                <span>
                  Challenge {Math.min((run?.index ?? 0) + 1, run?.queue?.length ?? 1)}
                  /{run?.queue?.length ?? 1}
                </span>
                <span>{run?.xpThisRun ?? 0} XP this run</span>
              </div>
              <ProgressBar value={progressValue} max={progressMax} />
            </div>
            <div className="min-w-48">
              <ComboMeter />
            </div>
          </div>
        </Card>

        {currentChallenge ? (
          <MiniGame
            key={currentChallenge.id}
            challenge={currentChallenge}
            onAnswer={handleAnswer}
            onComplete={handleComplete}
          />
        ) : (
          <Card className="flex flex-col gap-4 text-left">
            <h2 className="text-xl font-bold text-text">No challenges yet</h2>
            <p className="text-text-muted">
              This section is waiting for course notes. Continue to the checkpoint.
            </p>
            <div className="flex justify-end">
              <Button onClick={startBoss}>Continue</Button>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
