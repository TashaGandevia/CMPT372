// Capstone (INF-4 stub) — flow state CAPSTONE. Built out in META-1 (the timed
// one-challenge-per-zone gauntlet with the filling stack diagram).
import { Button } from '../components';
import { useFlow } from '../state/flowContext.js';
import ScreenStub from './ScreenStub.jsx';

export default function Capstone() {
  const { finishCapstone } = useFlow();
  return (
    <ScreenStub title="Capstone" subtitle="Full-pipeline gauntlet (META-1)">
      <Button onClick={finishCapstone}>Ship it</Button>
    </ScreenStub>
  );
}
