export const replaceInPlace = <T extends { id: string }>(
  items: T[],
  replacement: T
): T[] => {
  const indexToReplace = items.findIndex(item => item.id === replacement.id);
  return [
    ...items.slice(0, indexToReplace),
    { ...replacement },
    ...items.slice(indexToReplace + 1),
  ];
};
