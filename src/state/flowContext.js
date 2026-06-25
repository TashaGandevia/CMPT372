// useFlow (SYS-1) — navigation facade over the global game context.
//
// INF-4 introduced a standalone flow provider; SYS-1 merged flow into the
// single game reducer (GDD: one source of truth). useFlow remains as a
// convenience alias so navigation-only components (the screens) read clearly
// and didn't need to change when flow moved into GameProvider. The game context
// value already includes flow/overlay/zoneId and all the flow action helpers.
import { useGame } from './gameContext.js';

export function useFlow() {
  return useGame();
}
