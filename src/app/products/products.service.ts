import { EventEmitter, Injectable } from "@angular/core";
import { Product } from "./product.model";

@Injectable({ providedIn: 'root' })
export class ProductsService {

  products = [
    new Product(
      100001, "Name", "phone",
      ["https://avatars.mds.yandex.net/get-zen_doc/96748/pub_5b6920497f5fa100a9a9a58a_5b69715db3263300a9c78a59/scale_1200"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 1, 1, 1, 5], 249,
    ),
    new Product(
      100002, "Name", "phone",
      ["https://images.ua.prom.st/833735183_w640_h640_smartfon-agm-a8.jpg", "https://images.ua.prom.st/833735183_w640_h640_smartfon-agm-a8.jpg"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.", [1, 1, 2, 2, 3, 5], 1249,
    ),
    new Product(
      100003, "Name", "TV",
      ["https://i.pinimg.com/originals/c6/8f/16/c68f169a4efb31d5d7686cb1baef1e57.jpg"],
      "Lorem ipsum inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 5, 4, 5, 4, 3], 2249,
    ),
    new Product(
      100004, "Name", "TV",
      ["https://i.pinimg.com/originals/28/5d/f9/285df9424a43502d783ac13cd4e6404d.jpg"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur", [4, 5, 1, 2, 2, 2, 2, 5], 2449,
    ),
    new Product(
      100005, "Name", "weapon",
      ["https://images.stopgame.ru/uploads/users/2021/315558/00721.VgQoGA_.jpg"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur", [1, 2, 3, 4, 5, 5, 5], 4449,
    ),
    new Product(
      100006, "Name", "weapon",
      ["https://i.pinimg.com/originals/44/c2/b5/44c2b5c13c02b463a8a126002b2a107b.jpg"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur", [2, 3, 3, 5, 5, 5, 5, 5], 24149,
    ),
    new Product(
      100007, "Name", "weapon",
      ["https://i.pinimg.com/originals/44/c2/b5/44c2b5c13c02b463a8a126002b2a107b.jpg"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur", [4, 2, 3, 5], 23149,
    ),
    new Product(
      100008, "Name", "weapon",
      ["https://i.pinimg.com/originals/44/c2/b5/44c2b5c13c02b463a8a126002b2a107b.jpg"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur", [2, 2, 3, 5], 14149,
    ),
    new Product(
      100009, "Name", "weapon",
      ["https://i.pinimg.com/originals/44/c2/b5/44c2b5c13c02b463a8a126002b2a107b.jpg"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur", [4, 5, 3, 5], 24149,
    ),
    new Product(
      100010, "Name", "weapon",
      ["https://i.pinimg.com/originals/44/c2/b5/44c2b5c13c02b463a8a126002b2a107b.jpg"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur", [4, 1, 3, 5], 24149,
    ),
    new Product(
      100011, "Name", "weapon",
      ["https://i.pinimg.com/originals/44/c2/b5/44c2b5c13c02b463a8a126002b2a107b.jpg"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur", [1, 5, 3, 5], 24149,
    ),
  ];

  categories: string[] = [];

  getCategories() {
    this.products.forEach(product => {
      if (!this.categories.includes(product.category)) {
        this.categories.push(product.category);
      }
    });
    return this.categories.slice();
  }

  getFilteredProducts(category: string) {
    const filtredProducts = this.products.filter(product => {
      return product.category === category;
    });
    return filtredProducts;
  }

  getProduct(id: number) {
    return this.products.filter(product => {
      return product.id === id;
    });
  }
}