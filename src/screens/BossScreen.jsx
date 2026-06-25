// BossScreen (INF-4 stub → SYS-5 M1 harness) — flow state BOSS.
//
// Real boss encounters arrive in M3; until then this drives the engine to
// exercise the lives system: it starts a 3-life boss run on entry, lets you
// take hits (wrong answers) or win, and — per the GDD — failing (losing all
// lives) retries the boss, not the whole zone. Winning records progress
// (completeRun) and advances to RESULTS.
import { useEffect } from 'react';
import { Button, ComboMeter } from '../components';
import { useFlow } from '../state/flowContext.js';
import { selectBossFailed } from '../state/selectors.js';
import ScreenStub from './ScreenStub.jsx';

export default function BossScreen() {
  const game = useFlow();
  const {
    zoneId,
    run,
    startRun,
    answer,
    completeRun,
    winBoss,
    retryBoss,
    openPause,
  } = game;
  const failed = selectBossFailed(game);

  // Start a boss run (3 lives) on entry if not already in one.
  useEffect(() => {
    if (!run || !run.isBoss) startRun(zoneId ?? 'z1', { isBoss: true });
    // Run once on mount; startRun/run intentionally omitted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (correct) =>
    answer({
      correct,
      difficulty: 'hard',
      challengeId: `${zoneId ?? 'z1'}_boss_${run?.index ?? 0}`,
    });

  const handleWin = () => {
    completeRun(); // record progress / unlock next zone
    winBoss(); // BOSS → RESULTS
  };

  return (
    <ScreenStub
      title="Boss"
      subtitle={`Zone ${zoneId ?? '?'} boss — M1 harness (M3)`}
    >
      {run?.isBoss && (
        <div className="w-full text-sm text-text-muted">
          Lives: {run.lives > 0 ? '❤'.repeat(run.lives) : '0'} · correct{' '}
          {run.correct}/{run.total}
        </div>
      )}
      <div className="w-full">
        <ComboMeter />
      </div>

      {failed ? (
        <>
          <p className="w-full font-semibold text-zone5-600">
            Out of lives! Retry the boss.
          </p>
          <Button onClick={retryBoss}>Retry boss</Button>
        </>
      ) : (
        <>
          <Button onClick={handleWin}>Defeat boss</Button>
          <Button variant="ghost" onClick={() => submit(true)}>
            Answer correct
          </Button>
          <Button variant="secondary" onClick={() => submit(false)}>
            Take a hit
          </Button>
        </>
      )}
      <Button variant="ghost" onClick={openPause}>
        Pause
      </Button>
    </ScreenStub>
  );
}
