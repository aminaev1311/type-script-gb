export interface Hotel {
  id: string;
  title: string;
  details: string;
  photos: string[] | null;
  coordinates: number[] | null;
  bookedDates: string[] | [];
  totalPrice: number;
}
