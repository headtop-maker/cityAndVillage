export const isNewerVersion = (
  currentVersion: string,
  availableVersion: string,
) => {
  const currentParts = currentVersion.split('.').map(Number);
  const availableParts = availableVersion.split('.').map(Number);

  for (
    let i = 0;
    i < Math.max(currentParts.length, availableParts.length);
    i++
  ) {
    const current = currentParts[i] || 0; // Подразумеваем 0, если элемент отсутствует
    const available = availableParts[i] || 0;

    if (available > current) {
      return true;
    } else if (current > available) {
      return false;
    }
  }

  return false; // Если все части равны, то доступная версия не новее
};
