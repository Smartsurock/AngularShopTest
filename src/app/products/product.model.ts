export class Product {
  constructor(
    public id: number,
    public name: string,
    public category: string,
    public images: string[],
    public description: string,
    public stars: number[],
    public price: number,
  ) { }
}