const locales = {
  kb: 'KB',
  mb: 'MB',
  gb: 'GB',
  tb: 'TB',
};

export function getSizeInUnit(size, unit = 'bytes') {
  let humanized = 0;
  switch (unit) {
    case 'kb':
      humanized = size / 1024;
      break;
    case 'mb':
      humanized = size / 1024 / 1024;
      break;
    case 'gb':
      humanized = size / 1024 / 1024 / 1024;
      break;
    case 'tb':
      humanized = size / 1024 / 1024 / 1024 / 1024;
      break;
    default:
      humanized = size;
  }
  const useDecimals = ((humanized * 100) % 100) !== 0;
  return `${useDecimals ? humanized.toFixed(2) : humanized} ${locales[unit]}`;
}

export function getSize(size) {
  let unit = 'bytes';
  if (size > 1024 * 1024 * 1024 * 1024) {
    unit = 'tb';
  } else if (size > 1024 * 1024 * 1024) {
    unit = 'gb';
  } else if (size > 1024 * 1024) {
    unit = 'mb';
  } else if (size > 1024) {
    unit = 'kb';
  }
  return getSizeInUnit(size, unit);
}
