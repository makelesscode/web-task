export function getDurationFromSeconds(duration) {
  return `${Math.floor(duration / 60)}:${duration % 60}`;
}

export function getDurationLeft(secsTotal, secsLeft) {
  return `-${getDurationFromSeconds(secsTotal - secsLeft)}`;
}
