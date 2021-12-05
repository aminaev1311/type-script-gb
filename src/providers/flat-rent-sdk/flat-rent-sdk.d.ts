import { Hotel } from "../../hotel.js";
import { Provider } from "../../domain/provider.js";

export class FlatRentSdk implements Provider {
  database: Hotel[];
  getById(id: string): Promise<Hotel>;
  search(query_Object: object): Promise<Hotel[]>;
  book(flat_id: string, checkin: Date, checkout: Date): Promise<Hotel>;
}
