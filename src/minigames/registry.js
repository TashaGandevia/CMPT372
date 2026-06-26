// Mini-game type router (SYS-9): maps a challenge `type` to its component.
import FallbackChallenge from './FallbackChallenge.jsx';
import ChoiceChallenge from './ChoiceChallenge.jsx';
import OrderChallenge from './OrderChallenge.jsx';
import SkipChallenge from './SkipChallenge.jsx';
import TokenFillChallenge from './TokenFillChallenge.jsx';

export const MINIGAME_REGISTRY = {
  choice: ChoiceChallenge,
  url_part: ChoiceChallenge,
  order: OrderChallenge,
  code_fill: TokenFillChallenge,
  skip: SkipChallenge,
};

export function resolveMiniGame(type) {
  return MINIGAME_REGISTRY[type] ?? FallbackChallenge;
}
