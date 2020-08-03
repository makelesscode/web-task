export function getDurationFromSeconds(duration) {
  return `${Math.floor(duration / 60)}:${duration % 60}`;
}

export function getDurationLeft(secsTotal, secsLeft) {
  return `-${getDurationFromSeconds(secsTotal - secsLeft)}`;
}

export function getSecondsFromDuration(duration) {
  const parts = duration.split(':');
  return parts[0] * 60 * 60 + parts[1] * 60 + parseInt(parts[2], 10);
}
