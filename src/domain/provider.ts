import { Hotel } from "./hotel.js";
import { SearchFilter } from "./searchFilter.js";

export interface Provider {
  database: Hotel[];
  search(filter: SearchFilter): Promise<Hotel[]>;
  getById(id: string): Promise<Hotel>;
  book(flat_id: string, checkin: Date, checkout: Date): Promise<Hotel>;
}
