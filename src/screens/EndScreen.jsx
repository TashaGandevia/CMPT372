// EndScreen (INF-4 stub) — flow state END. Built out in META-2 (the "App
// Shipped" celebration that unlocks Review + Endless modes).
import { Button } from '../components';
import { useFlow } from '../state/flowContext.js';
import ScreenStub from './ScreenStub.jsx';

export default function EndScreen() {
  const { exitEnd } = useFlow();
  return (
    <ScreenStub title="App Shipped!" subtitle="End sequence (META-2)">
      <Button onClick={exitEnd}>Back to map</Button>
    </ScreenStub>
  );
}
