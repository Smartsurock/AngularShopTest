import { Comment } from "../comment.model";
import { Product } from "../product.model";
import * as ProductsActions from "./products.actions";

export interface State {
  products: Product[];
  basket: Product[];
}

const initialState = {
  products: [],
  basket: [
    new Product(100001, "images.ua.prom.st", "phone",
      ["https://avatars.mds.yandex.net/get-zen_doc/96748/pub_5b6920497f5fa100a9a9a58a_5b69715db3263300a9c78a59/scale_1200"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 8249,
      [new Comment(4, "test@test.ru", "Вася Пупкин",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")], []),
    new Product(100001, "images.ua.prom.st", "phone",
      ["https://avatars.mds.yandex.net/get-zen_doc/96748/pub_5b6920497f5fa100a9a9a58a_5b69715db3263300a9c78a59/scale_1200"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 8249,
      [new Comment(4, "test@test.ru", "Вася Пупкин",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")], []),
    new Product(100001, "images.ua.prom.st", "phone",
      ["https://avatars.mds.yandex.net/get-zen_doc/96748/pub_5b6920497f5fa100a9a9a58a_5b69715db3263300a9c78a59/scale_1200"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 8249,
      [new Comment(4, "test@test.ru", "Вася Пупкин",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")], []),
    new Product(100001, "images.ua.prom.st", "phone",
      ["https://avatars.mds.yandex.net/get-zen_doc/96748/pub_5b6920497f5fa100a9a9a58a_5b69715db3263300a9c78a59/scale_1200"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 8249,
      [new Comment(4, "test@test.ru", "Вася Пупкин",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")], []),
    new Product(100001, "images.ua.prom.st", "phone",
      ["https://avatars.mds.yandex.net/get-zen_doc/96748/pub_5b6920497f5fa100a9a9a58a_5b69715db3263300a9c78a59/scale_1200"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 8249,
      [new Comment(4, "test@test.ru", "Вася Пупкин",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")], []),
    new Product(100001, "images.ua.prom.st", "phone",
      ["https://avatars.mds.yandex.net/get-zen_doc/96748/pub_5b6920497f5fa100a9a9a58a_5b69715db3263300a9c78a59/scale_1200"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 8249,
      [new Comment(4, "test@test.ru", "Вася Пупкин",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")], []),
    new Product(100001, "images.ua.prom.st", "phone",
      ["https://avatars.mds.yandex.net/get-zen_doc/96748/pub_5b6920497f5fa100a9a9a58a_5b69715db3263300a9c78a59/scale_1200"],
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ut dolore sunt consequatur id tempora inventore similique eum quis odio, atque, animi perferendis dignissimos vitae at corrupti necessitatibus. Ipsum, repudiandae.", [4, 5, 3, 1, 1, 5], 8249,
      [new Comment(4, "test@test.ru", "Вася Пупкин",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cumque officiis animi dignissimos ipsam aut omnis quod, earum reprehenderit et beatae culpa asperiores. Quo nam dolor ducimus fugiat magnam quia?")], []),
  ],
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
        ...action.payload.newProduct
      }
      const editedProducts = [...state.products];
      editedProducts[action.payload.index] = editedProduct;
      return {
        ...state,
        products: [...editedProducts]
      }

    case ProductsActions.ADD_TO_BASKET:
      const addBasket = [...state.basket, state.products[action.payload]];
      return {
        ...state,
        basket: [...addBasket]
      }

    case ProductsActions.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item, index) => {
          return index !== action.payload;
        }),
      }

    default: return state;
  }
}