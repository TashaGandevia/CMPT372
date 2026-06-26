import { useMemo, useState } from 'react';
import { Button, Card } from '../components';

function move(items, from, to) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function sameOrder(a, b) {
  return a.length === b.length && a.every((item, index) => item === b[index]);
}

export default function OrderChallenge({ challenge, onAnswer, onComplete }) {
  const initialItems = useMemo(
    () => [...challenge.items].sort((a, b) => a.localeCompare(b)),
    [challenge.items]
  );
  const [items, setItems] = useState(initialItems);
  const [answered, setAnswered] = useState(false);
  const correct = sameOrder(items, challenge.answer);

  const submit = () => {
    if (answered) return;
    setAnswered(true);
    onAnswer?.(correct, { challenge, selected: items });
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

      <ol className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li
            key={item}
            className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 rounded-lg border border-border bg-surface-muted p-3"
          >
            <span className="font-mono text-sm text-text-muted">{index + 1}</span>
            <span className="font-semibold text-text">{item}</span>
            <span className="flex gap-1">
              <button
                type="button"
                className="h-8 w-8 rounded-md border border-border bg-surface text-sm font-bold"
                onClick={() => setItems(move(items, index, index - 1))}
                disabled={answered || index === 0}
                aria-label={`Move ${item} up`}
              >
                ^
              </button>
              <button
                type="button"
                className="h-8 w-8 rounded-md border border-border bg-surface text-sm font-bold"
                onClick={() => setItems(move(items, index, index + 1))}
                disabled={answered || index === items.length - 1}
                aria-label={`Move ${item} down`}
              >
                v
              </button>
            </span>
          </li>
        ))}
      </ol>

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
            {correct ? 'Correct order' : 'Correct order:'}
          </p>
          {!correct && (
            <p className="mt-1 text-sm text-text-muted">
              {challenge.answer.join(' -> ')}
            </p>
          )}
          <p className="mt-1 text-sm text-text-muted">{challenge.explain}</p>
        </div>
      )}

      <div className="flex justify-end gap-2">
        {!answered ? (
          <Button onClick={submit}>Check order</Button>
        ) : (
          <Button onClick={() => onComplete?.()}>Continue</Button>
        )}
      </div>
    </Card>
  );
}
