// Review queue (SYS-8) — pure functions, no React.
//
// The highest-value study feature (GDD §3.6): a missed challenge must be
// answered correctly TWICE (not necessarily consecutively) before it leaves the
// queue. So the queue stores items as { id, remaining }, where `remaining` is
// the number of correct answers still required to clear it.

export const REQUIRED_CORRECT = 2;

// Returns a new queue reflecting one answered challenge.
//   - wrong  → (re)queue the id with the full requirement
//   - correct→ if queued, decrement; clear it once the requirement is met
//   - no id  → unchanged
export function applyAnswerToQueue(queue, { id, correct } = {}) {
  if (!id) return queue;
  const idx = queue.findIndex((item) => item.id === id);

  if (!correct) {
    // Missed: add it, or reset its counter if it was already in the queue.
    if (idx === -1) return [...queue, { id, remaining: REQUIRED_CORRECT }];
    const next = queue.slice();
    next[idx] = { ...next[idx], remaining: REQUIRED_CORRECT };
    return next;
  }

  // Correct answers only matter for items currently in the queue.
  if (idx === -1) return queue;
  const remaining = queue[idx].remaining - 1;
  if (remaining <= 0) return queue.filter((_, i) => i !== idx); // cleared
  const next = queue.slice();
  next[idx] = { ...next[idx], remaining };
  return next;
}

// Just the challenge ids in the queue (for the run builder's review bias).
export function reviewIds(queue) {
  return queue.map((item) => item.id);
}
