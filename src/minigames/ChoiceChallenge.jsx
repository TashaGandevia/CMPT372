import { useState } from 'react';
import { Button, Card } from '../components';

export default function ChoiceChallenge({ challenge, onAnswer, onComplete }) {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;
  const correct = selected === challenge.answer;

  const choose = (choice) => {
    if (answered) return;
    setSelected(choice);
    onAnswer?.(choice === challenge.answer, { challenge, selected: choice });
  };

  return (
    <Card className="flex flex-col gap-4 text-left">
      <div className="flex flex-col gap-2">
        {challenge.concept && (
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            {challenge.concept.replaceAll('-', ' ')}
          </p>
        )}
        <h2 className="text-xl font-bold text-text">{challenge.prompt}</h2>
        {challenge.url && (
          <code className="code-block block text-sm">{challenge.url}</code>
        )}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {challenge.choices.map((choice) => {
          const isSelected = selected === choice;
          const isAnswer = answered && choice === challenge.answer;
          return (
            <button
              key={choice}
              type="button"
              onClick={() => choose(choice)}
              className={[
                'min-h-14 rounded-lg border px-4 py-3 text-left font-semibold transition',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                isAnswer
                  ? 'border-[var(--color-success)] bg-[rgba(110,231,168,0.14)] text-text'
                  : 'border-border bg-surface-muted text-text hover:border-accent',
                isSelected && !correct
                  ? 'border-[var(--color-danger)] bg-[rgba(255,107,138,0.14)]'
                  : '',
              ].join(' ')}
              disabled={answered}
            >
              {choice}
            </button>
          );
        })}
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
            {correct ? 'Correct' : `Answer: ${challenge.answer}`}
          </p>
          <p className="mt-1 text-sm text-text-muted">{challenge.explain}</p>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={() => onComplete?.()} disabled={!answered}>
          Continue
        </Button>
      </div>
    </Card>
  );
}
