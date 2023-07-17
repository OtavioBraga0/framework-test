import React, { useEffect } from "react";
import { ProductCard } from "../../components/ProductCard";
import * as HomeStyle from "./style";

import { useProduct } from "../../hooks/useProduct";
import SkeletonLoading from "../../components/SkeletonLoading";

export const Home: React.FC = () => {
  const {
    loading,
    products,
    actions: { handleGetAllProducts },
  } = useProduct();

  useEffect(() => {
    handleGetAllProducts();
  }, [handleGetAllProducts]);

  return (
    <HomeStyle.Wrapper>
      <h2 data-testid="products_title_test_id">Products</h2>
      <HomeStyle.ProductsContainer data-testid="products_list_test_id">
        {loading ? (
          <SkeletonLoading
            style={{ gap: 20 }}
            data-testid="skeleton_loading_test_id"
            elementProps={{
              style: { width: 250, height: 300, borderRadius: 5 },
            }}
          />
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
      </HomeStyle.ProductsContainer>
    </HomeStyle.Wrapper>
  );
};
