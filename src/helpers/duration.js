export function getDurationFromSeconds(duration) {
    return `${Math.floor(duration / 60)}:${duration % 60}`;
}