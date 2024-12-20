export const base64ByteSize = (base64String: string) => {
  const cleanedBase64 = base64String.split(',').pop() || base64String;

  const padding = (cleanedBase64.match(/[=]/g) || []).length;

  const sizeInBytes = (cleanedBase64.length * 3) / 4 - padding;

  return Math.floor(sizeInBytes);
};
