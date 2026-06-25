// Game context + hook (SYS-1).
//
// Split from GameProvider so the provider file exports only a component (keeps
// React Fast Refresh working). Components call useGame() to read the single
// source of truth and to fire actions. The context value intentionally exposes
// named action helpers but NOT the raw dispatch, so mini-games can only affect
// state through the sanctioned onAnswer/onComplete path (no direct mutation).
import { createContext, useContext } from 'react';

export const GameContext = createContext(null);

// Returns the full game state plus action helpers. Throws if used outside the
// provider so misuse fails loudly.
export function useGame() {
  const ctx = useContext(GameContext);
  if (ctx === null) {
    throw new Error('useGame must be used within a <GameProvider>');
  }
  return ctx;
}
