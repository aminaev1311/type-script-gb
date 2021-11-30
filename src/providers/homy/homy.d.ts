import { Provider } from "../../domain/provider.js";
import { Hotel } from "../../hotel.js";
export function cloneDate(date: Date): Date;

export class Homy implements Provider {
  database: Hotel[];
  getById(id: string): Promise<Hotel>;
  search(query_Object: object): Promise<Hotel[]>;
  book(flat_id: string, checkin: Date, checkout: Date): Promise<Hotel>;
}
