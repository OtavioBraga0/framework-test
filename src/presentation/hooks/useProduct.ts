import { useDispatch, useSelector } from "react-redux";
import { productSelector } from "../../domain/ducks/productReducer";
import { IProduct } from "../../domain/entities/Product";
import { useCallback } from "react";
import { getAllProductsThunk } from "../../domain/thunks/productThunk";
import { AppDispatch } from "../../domain/DomainLayer";

type UseProductType = {
  products: IProduct[];
  loading: boolean;
  actions: {
    handleGetAllProducts: () => void;
  };
};

export const useProduct = (): UseProductType => {
  const { products, isLoading } = useSelector(productSelector);

  const dispatch = useDispatch<AppDispatch>();

  const handleGetAllProducts = useCallback(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  return {
    products,
    loading: isLoading,
    actions: {
      handleGetAllProducts,
    },
  };
};
