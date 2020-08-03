export const allowedExtensions = ['mp3', 'wav'];
export const maxFileSize = 1024 * 1024 * 1024 * 10; // 10 Mb

export function isValidFilename(filename) {
  const extension = filename.split('.').pop();
  return allowedExtensions.indexOf(extension);
}
