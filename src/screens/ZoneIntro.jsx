// ZoneIntro (INF-4 stub) — flow state ZONE_INTRO. Built out in UI-4 (concepts +
// badges available for the selected zone).
import { Button } from '../components';
import { useFlow } from '../state/flowContext.js';
import ScreenStub from './ScreenStub.jsx';

export default function ZoneIntro() {
  const { zoneId, startZone } = useFlow();
  return (
    <ScreenStub
      title="Zone Intro"
      subtitle={`Zone ${zoneId ?? '?'} — concepts & badges (UI-4)`}
    >
      <Button onClick={startZone}>Start zone</Button>
    </ScreenStub>
  );
}
