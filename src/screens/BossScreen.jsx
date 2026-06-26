import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, ComboMeter } from '../components';
import { slideUp } from '../lib/motion.js';
import { useContent } from '../state/contentContext.js';
import { useFlow } from '../state/flowContext.js';
import { selectBossFailed } from '../state/selectors.js';

export default function BossScreen() {
  const content = useContent();
  const game = useFlow();
  const {
    zoneId,
    run,
    startRun,
    answer,
    completeRun,
    winBoss,
    openPause,
  } = game;
  const zone = content.zones.find((item) => item.id === zoneId);
  const failed = selectBossFailed(game);

  useEffect(() => {
    if (run?.isBoss) return;

    const zoneChallenges = content.challengesForZone(zoneId ?? 'z1');
    const boss =
      zoneChallenges.find((challenge) => challenge.isBoss) ?? zoneChallenges[0];

    const queue =
      boss?.type === 'skip' ? [boss] : [boss, boss, boss].filter(Boolean);

    startRun(zoneId ?? 'z1', {
      isBoss: true,
      queue,
    });
    // Start only when this screen mounts without a boss run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentChallenge = run?.queue?.[run.index] ?? null;
  const MiniGame = useMemo(
    () => content.resolveMiniGame(currentChallenge?.type),
    [content, currentChallenge?.type]
  );

  const handleAnswer = (correct, meta = {}) => {
    const challenge = meta.challenge ?? currentChallenge;
    answer({
      correct,
      difficulty: challenge?.difficulty ?? 'hard',
      challengeId: challenge?.id,
    });
  };

  const handleComplete = () => {
    if (run?.correct > 0 || currentChallenge?.type === 'skip') {
      completeRun();
      winBoss();
      return;
    }

    if (!run?.queue?.length || run.index >= run.queue.length) {
      completeRun();
      winBoss();
    }
  };

  const handleRetry = () => {
    startRun(zoneId ?? 'z1', {
      isBoss: true,
      queue: run?.queue ?? [],
    });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <motion.div
        {...slideUp}
        className="mx-auto flex w-full max-w-4xl flex-col gap-4"
      >
        <Card className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                Boss checkpoint
              </p>
              <h1 className="mt-1 text-2xl font-bold text-text">
                {zone?.name ?? 'Boss'}
              </h1>
            </div>
            <Button variant="ghost" onClick={openPause}>
              Pause
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:items-center">
            <div className="text-sm text-text-muted">
              Lives: {run?.lives ?? 0}
            </div>
            <ComboMeter />
          </div>
        </Card>

        {failed ? (
          <Card className="flex flex-col gap-4 text-left">
            <h2 className="text-xl font-bold text-text">
              Try the checkpoint again
            </h2>
            <p className="text-text-muted">
              Boss encounters use lives. Retry this checkpoint without replaying
              the whole zone.
            </p>
            <div className="flex justify-end">
              <Button onClick={handleRetry}>Retry boss</Button>
            </div>
          </Card>
        ) : currentChallenge ? (
          <MiniGame
            key={`${currentChallenge.id}-${run?.index ?? 0}`}
            challenge={currentChallenge}
            onAnswer={handleAnswer}
            onComplete={handleComplete}
          />
        ) : (
          <Card className="flex flex-col gap-4 text-left">
            <h2 className="text-xl font-bold text-text">Checkpoint clear</h2>
            <p className="text-text-muted">No boss content has been added yet.</p>
            <div className="flex justify-end">
              <Button onClick={handleComplete}>Continue</Button>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
