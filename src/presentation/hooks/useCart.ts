import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../domain/DomainLayer";
import { ICart } from "../../domain/entities/Cart";
import {
  addProduct,
  cartSelector,
  changeQuantity,
} from "../../domain/ducks/cartReducer";
import { IProduct } from "../../domain/entities/Product";
import { finishSaleThunk } from "../../domain/thunks/cartThunk";

type UseCartProps = {
  cart: ICart[];
  total: number;
  actions: {
    handleChangeQuantity: (id: number, quantity: number) => void;
    handleAddProduct: (product: IProduct) => void;
    handleFinishSale: () => void;
  };
};

export const useCart = (): UseCartProps => {
  const { cart, total } = useSelector(cartSelector);

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeQuantity = useCallback(
    (id: number, quantity: number) => {
      dispatch(changeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const handleAddProduct = useCallback(
    (product: IProduct) => {
      dispatch(addProduct(product));
    },
    [dispatch]
  );

  const handleFinishSale = useCallback(() => {
    dispatch(finishSaleThunk());
  }, [dispatch]);

  return {
    cart,
    total,
    actions: {
      handleChangeQuantity,
      handleAddProduct,
      handleFinishSale,
    },
  };
};
