export function idToString(id?: number): string {
  if (!id) throw 'Id задачи не найдено';
  return id.toString();
}
