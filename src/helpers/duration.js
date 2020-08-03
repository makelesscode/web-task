function getLeadingZero(n) {
  return n < 10 ? `0${n}` : n.toString();
}
export function getDurationFromSeconds(duration) {
  return `${getLeadingZero(Math.floor(duration / 60))}:${getLeadingZero(Math.floor(duration % 60))}`;
}

export function getDurationLeft(secsTotal, secsLeft) {
  return `-${getDurationFromSeconds(secsTotal - secsLeft)}`;
}

export function getSecondsFromDuration(duration) {
  const parts = duration.split(':');
  return parts[0] * 60 * 60 + parts[1] * 60 + parseInt(parts[2], 10);
}
