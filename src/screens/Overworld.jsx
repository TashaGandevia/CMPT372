// Overworld (INF-4 stub) — flow state OVERWORLD, the zone map hub. Built out in
// UI-3. For now it just offers entry into a zone, the capstone, and the profile.
import { Button } from '../components';
import { useFlow } from '../state/flowContext.js';
import ScreenStub from './ScreenStub.jsx';

export default function Overworld() {
  const { selectZone, startCapstone, openProfile } = useFlow();
  return (
    <ScreenStub title="Overworld" subtitle="Zone map (UI-3)">
      <Button onClick={() => selectZone('z1')}>Enter Zone 1</Button>
      <Button variant="secondary" onClick={startCapstone}>
        Capstone
      </Button>
      <Button variant="ghost" onClick={openProfile}>
        Profile
      </Button>
    </ScreenStub>
  );
}
