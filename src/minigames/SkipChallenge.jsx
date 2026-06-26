import { useState } from 'react';
import { Button, Card } from '../components';

export default function SkipChallenge({ challenge, onAnswer, onComplete }) {
  const [answered, setAnswered] = useState(false);

  const skip = () => {
    setAnswered(true);
    onAnswer?.(true, { challenge, selected: 'SKIP' });
  };

  return (
    <Card className="flex flex-col gap-4 text-left">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        Placeholder
      </p>
      <h2 className="text-xl font-bold text-text">{challenge.prompt}</h2>
      <p className="text-text-muted">{challenge.explain}</p>
      <div className="flex justify-end">
        {answered ? (
          <Button onClick={() => onComplete?.()}>Continue</Button>
        ) : (
          <Button onClick={skip}>SKIP</Button>
        )}
      </div>
    </Card>
  );
}
