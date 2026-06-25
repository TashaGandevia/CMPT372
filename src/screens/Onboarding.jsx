// Onboarding (INF-4 stub) — flow state ONBOARDING. Built out in UI-2
// (the 3-card, unfailable tutorial).
import { Button } from '../components';
import { useFlow } from '../state/flowContext.js';
import ScreenStub from './ScreenStub.jsx';

export default function Onboarding() {
  const { finishOnboarding } = useFlow();
  return (
    <ScreenStub title="Onboarding" subtitle="Tutorial cards (UI-2)">
      <Button onClick={finishOnboarding}>Start playing</Button>
    </ScreenStub>
  );
}
