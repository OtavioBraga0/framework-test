import {
  ActionReducerMapBuilder,
  createAction,
  createReducer,
  PayloadAction,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
import { EngageState } from "../DomainLayer";
import { ICart } from "../entities/Cart";
import { IProduct } from "../entities/Product";
import { finishSaleThunk } from "../thunks/cartThunk";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";

export type CartActionsType = PayloadAction<null>;

export interface CartState {
  cart: ICart[];
  total: number;
  isLoading: boolean;
}

export const CART_INITIAL_STATE: CartState = {
  cart: [],
  total: 0,
  isLoading: false,
};

export const cartSelector = (state: EngageState): CartState => state.cart;

export const changeQuantity: PayloadActionCreator<{
  id: number;
  quantity: number;
}> = createAction("duck/cart/changeQuantity");

export const addProduct: PayloadActionCreator<IProduct> = createAction(
  "duck/cart/addProduct"
);

export const clearCart: PayloadActionCreator<undefined> = createAction(
  "duck/cart/clearCart"
);

function handlePendingThunk(state: CartState): CartState {
  return {
    ...state,
    isLoading: true,
  };
}

function handleRejectedThunk(state: CartState): CartState {
  return {
    ...state,
    isLoading: false,
  };
}

function handleChangeQuantity(
  state: CartState,
  action: PayloadAction<{ id: number; quantity: number }>
): CartState {
  const cart = state.cart.slice();

  const productIndex = cart.findIndex(
    (sale) => sale.product.id === action.payload.id
  );

  const quantity = cart[productIndex].quantity + action.payload.quantity;
  const subTotal = quantity * cart[productIndex].product.price;

  if (quantity <= 0) {
    cart.splice(productIndex, 1);
  } else {
    cart.splice(productIndex, 1, {
      ...cart[productIndex],
      quantity,
      subtotal: subTotal,
    });
  }

  const total = cart.reduce((currentTotal, sale) => {
    const sum = currentTotal + sale.subtotal;
    return sum;
  }, 0);

  return {
    ...state,
    cart,
    total,
    isLoading: false,
  };
}

function handleAddProduct(
  state: CartState,
  action: PayloadAction<IProduct>
): CartState {
  const cart = state.cart.slice();

  cart.push({
    product: action.payload,
    quantity: 1,
    subtotal: action.payload.price,
  });

  const total = cart.reduce((currentTotal, sale) => {
    const sum = currentTotal + sale.subtotal;
    return sum;
  }, 0);

  return {
    ...state,
    cart,
    total,
    isLoading: false,
  };
}

function generatePDF(cart: ICart[], total: number) {
  const products = cart.map((sale, index) => [
    index + 1,
    sale.product.name,
    `R$ ${sale.product.price.toFixed(2)}`,
    sale.quantity,
    `R$ ${sale.subtotal.toFixed(2)}`,
  ]);

  pdfMake.fonts = {
    Roboto: {
      normal: "Roboto-Regular.ttf",
      bold: "Roboto-Medium.ttf",
      italics: "Roboto-Italic.ttf",
      bolditalics: "Roboto-MediumItalic.ttf",
    },
  };

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const documentDefinition: TDocumentDefinitions = {
    content: [
      { text: "Proof of Sale", style: "header" },
      "\n\n",
      {
        table: {
          headerRows: 1,
          widths: ["*", "*", "*", "*", "*"],
          body: [
            ["Item", "Name", "Unit Price", "Quantity", "Subtotal"],
            ...products,
          ],
        },
      },
      "\n\n",
      {
        text: `Total: R$ ${total.toFixed(2)}`,
        style: "total",
      },
    ],
    styles: {
      header: {
        fontSize: 18,
      },
      total: {
        fontSize: 16,
      },
    },
  };

  const pdf = pdfMake.createPdf(documentDefinition);

  const today = new Date();

  pdf.download(`${today.toLocaleDateString()}-SALE.pdf`);
}

function handleFinishSale(
  state: CartState,
  action: PayloadAction<void>
): CartState {
  generatePDF(state.cart, state.total);

  return {
    ...state,
    cart: [],
    total: 0,
    isLoading: false,
  };
}

const builderReducer = (builder: ActionReducerMapBuilder<CartState>) =>
  builder
    .addCase(changeQuantity.type, handleChangeQuantity)
    .addCase(addProduct.type, handleAddProduct)
    .addCase(clearCart.type, handleFinishSale)

    .addCase(finishSaleThunk.fulfilled.type, handleFinishSale)
    .addCase(finishSaleThunk.rejected.type, handleRejectedThunk)
    .addCase(finishSaleThunk.pending.type, handlePendingThunk);

export const cartReducer = createReducer(CART_INITIAL_STATE, builderReducer);
