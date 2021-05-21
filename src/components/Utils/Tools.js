export function DateToString(date) {
  const date1 = new Date(date);
  return `${date1.getDate()}/${date1.getMonth() + 1}/${date1.getFullYear()}`;
}
export function isEmpty(data) {
  if (data === "") return true;
  if (data === null) return true;
  if (data === undefined) return true;
  if (data == null) return true;
  return false;
}
