import { useMemo, useState } from 'react';
import { Button, Card } from '../components';

function renderLine(line, values, selectedGap, setSelectedGap) {
  const parts = line.split(/(\{\{\d+\}\})/g);

  return parts.map((part, index) => {
    const match = part.match(/^\{\{(\d+)\}\}$/);
    if (!match) return <span key={`${part}-${index}`}>{part}</span>;

    const gapId = Number(match[1]);
    const value = values[gapId];
    return (
      <button
        key={`${part}-${index}`}
        type="button"
        onClick={() => setSelectedGap(gapId)}
        className={[
          'mx-1 rounded-md border px-2 py-0.5 font-mono text-sm font-bold',
          selectedGap === gapId
            ? 'border-accent bg-[var(--color-accent-muted)] text-text'
            : 'border-border bg-surface text-text-muted',
        ].join(' ')}
      >
        {value || `gap ${gapId + 1}`}
      </button>
    );
  });
}

export default function TokenFillChallenge({ challenge, onAnswer, onComplete }) {
  const [values, setValues] = useState({});
  const [selectedGap, setSelectedGap] = useState(0);
  const [answered, setAnswered] = useState(false);

  const palette = useMemo(
    () => [...new Set(challenge.gaps.flatMap((gap) => gap.palette))],
    [challenge.gaps]
  );

  const allFilled = challenge.gaps.every((gap) => values[gap.id]);
  const correct = challenge.gaps.every((gap) =>
    gap.accept.includes(values[gap.id])
  );

  const placeToken = (token) => {
    if (answered) return;
    setValues((current) => ({ ...current, [selectedGap]: token }));
  };

  const check = () => {
    if (!allFilled || answered) return;
    setAnswered(true);
    onAnswer?.(correct, { challenge, selected: values });
  };

  return (
    <Card className="flex flex-col gap-4 text-left">
      <div>
        {challenge.concept && (
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            {challenge.concept.replaceAll('-', ' ')}
          </p>
        )}
        <h2 className="mt-2 text-xl font-bold text-text">{challenge.prompt}</h2>
      </div>

      <pre className="code-block text-sm leading-7">
        <code>
          {challenge.code.map((line, index) => (
            <span key={`${line}-${index}`} className="block">
              {renderLine(line, values, selectedGap, setSelectedGap)}
            </span>
          ))}
        </code>
      </pre>

      <div className="flex flex-wrap gap-2">
        {palette.map((token) => (
          <button
            key={token}
            type="button"
            onClick={() => placeToken(token)}
            disabled={answered}
            className="rounded-lg border border-border bg-surface-muted px-3 py-2 font-mono text-sm font-semibold text-text transition hover:border-accent disabled:opacity-50"
          >
            {token}
          </button>
        ))}
      </div>

      {answered && (
        <div
          className={[
            'rounded-lg border p-4',
            correct
              ? 'border-[rgba(110,231,168,0.35)] bg-[rgba(110,231,168,0.1)]'
              : 'border-[rgba(255,107,138,0.35)] bg-[rgba(255,107,138,0.1)]',
          ].join(' ')}
        >
          <p className="font-semibold text-text">
            {correct ? 'Code checks out' : 'Not quite'}
          </p>
          <p className="mt-1 text-sm text-text-muted">{challenge.explain}</p>
        </div>
      )}

      <div className="flex justify-end gap-2">
        {!answered ? (
          <>
            <Button
              variant="secondary"
              onClick={() => setValues({})}
              disabled={!Object.keys(values).length}
            >
              Reset
            </Button>
            <Button onClick={check} disabled={!allFilled}>
              Run check
            </Button>
          </>
        ) : (
          <Button onClick={() => onComplete?.()}>Continue</Button>
        )}
      </div>
    </Card>
  );
}
