export class Hotel {
  constructor(
    public id: string,
    public title: string,
    public details: string,
    public photos: string[] | null,
    public coordinates: number[] | null,
    public bookedDates: string[] | [],
    public totalPrice: number
  ) {}
}
