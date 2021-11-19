export function cloneDate(date: Date): Date;

export function addDays(date: Date, days: number): Date;

export class FlatRentSdk {
  database: Hotel[];
  get(id: string): Promise<Hotel>;
  search(query_Object: object): Promise<Hotel[]>;
  book(flat_id: string, checkin: Date, checkout: Date): Promise<Hotel>;
}

export interface Hotel {
  id: string;
  title: string;
  details: string;
  photos: string[] | null;
  coordinates: number[] | null;
  bookedDates: string[] | [];
  totalPrice: number;
}
