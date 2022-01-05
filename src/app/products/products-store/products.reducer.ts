import { Buyer } from "../buyer.model";
import { Comment } from "../comment.model";
import { Product } from "../product.model";
import * as ProductsActions from "./products.actions";

export interface State {
  products: Product[];
  basket: Buyer[];
}

const initialState = {
  products: [
    // new Product(100001, "images.ua.prom.st", "Телефоны",
    //   ["https://avatars.mds.yandex.net/get-zen_doc/96748/pub_5b6920497f5fa100a9a9a58a_5b69715db3263300a9c78a59/scale_1200"],
    //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 449,
    //   [new Comment(4, "Вася Пупкин", "test@test.ru",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")]),
    // new Product(100002, "images.ua.prom.st", "Телефоны",
    //   ["https://avatars.mds.yandex.net/get-mpic/4362548/img_id2592907152391763995.jpeg/orig"],
    //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 3249,
    //   [new Comment(4, "Вася Пупкин", "test@test.ru",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")]),
    // new Product(100003, "images.ua.prom.st", "TV",
    //   ["https://avatars.mds.yandex.net/get-mpic/4383514/img_id8774552388959286494.jpeg/14hq"],
    //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 8249,
    //   [new Comment(4, "Вася Пупкин", "test@test.ru",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")]),
    // new Product(100004, "images.ua.prom.st", "TV",
    //   ["https://cmp24.com.ua/images/prodacts/sourse/65934/65934357_televizor-hyundai-h-led32r405bs2.jpg"],
    //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 8249,
    //   [new Comment(4, "Вася Пупкин", "test@test.ru",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")]),
    // new Product(100005, "images.ua.prom.st", "Оружие",
    //   ["https://img3.goodfon.ru/original/800x480/c/8d/remington-870-pompovoe-ruzhe.jpg"],
    //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 2249,
    //   [new Comment(4, "Вася Пупкин", "test@test.ru",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")]),
    // new Product(100006, "images.ua.prom.st", "Оружие",
    //   ["http://i1.ytimg.com/vi/WT1uLvNvPdk/maxresdefault.jpg"],
    //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 1249,
    //   [new Comment(4, "Вася Пупкин", "test@test.ru",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")]),
    // new Product(100007, "images.ua.prom.st", "Сапоги",
    //   ["https://img3.st.kloomba.com/img/used/2018/07/31/11/b/38535563_4.jpg"],
    //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 8249,
    //   [new Comment(4, "Вася Пупкин", "test@test.ru",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")]),
    // new Product(100008, "images.ua.prom.st", "Сапоги",
    //   ["https://images.by.prom.st/80719388_w640_h640_sapogi-rabochie-praktik.jpg"],
    //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 8249,
    //   [new Comment(4, "Вася Пупкин", "test@test.ru",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")]),
  ],
  basket: [],
}

export function productsReducer(
  state: State = initialState, action: ProductsActions.ProductsActions
) {
  switch (action.type) {
    case ProductsActions.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }

    case ProductsActions.EDIT_PRODUCT:
      const editedProduct = {
        ...state.products[action.payload.index],
        ...action.payload.newProduct,
      }
      const editedProducts = [...state.products];
      editedProducts[action.payload.index] = editedProduct;
      return {
        ...state,
        products: [...editedProducts]
      }

    case ProductsActions.SET_BASKET:
      return {
        ...state,
        basket: action.payload,
      }

    case ProductsActions.ADD_TO_BASKET:
      const newBuyer = [...state.basket, action.payload];
      return {
        ...state,
        basket: [...newBuyer]
      }

    case ProductsActions.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item, index) => {
          return index !== action.payload;
        }),
      }

    case ProductsActions.EDIT_BASKET:
      const newCount = {
        ...state.basket[action.payload.index],
        ...action.payload.newBuyer,
      }
      const editedBasket = [...state.basket];
      editedBasket[action.payload.index] = newCount;
      return {
        ...state,
        basket: [...editedBasket]
      }

    default: return state;
  }
}