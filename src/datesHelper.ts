export abstract class DatesHelper {
  public static cloneDate(date: Date): Date {
    return new Date(date.getTime());
  }

  public static addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
}
