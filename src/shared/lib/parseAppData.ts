export const parseAppData = (data: string[]) => {
  const result = [];

  for (let i = 0; i < data.length; i += 4) {
    const appName = data[i].split(':')[1];
    const versionName = data[i + 1].split(':')[1];
    const fileName = data[i + 2].split(':')[1];
    const absolutePath = data[i + 3].split(':')[1];

    result.push({
      appName,
      versionName,
      fileName,
      absolutePath,
    });
  }

  return result;
};
