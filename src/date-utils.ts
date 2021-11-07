export function formatDate(date: Date): string {
  const formattedDateString = `${date.getFullYear()}-${
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
  }-${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}`;
  return formattedDateString;
}
