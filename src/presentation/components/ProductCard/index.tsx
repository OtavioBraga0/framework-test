import React, { useMemo } from "react";

import * as ProductStyle from "./style";

import { IProduct } from "../../../domain/entities/Product";
import { CountButton } from "../CountButton";
import { useCart } from "../../hooks/useCart";
import { ICart } from "../../../domain/entities/Cart";
import { Button } from "../Button";
import { FaPlus } from "react-icons/fa";

export const ProductCard: React.FC<IProduct> = (product) => {
  const { id, name, price, image } = product;
  const {
    cart,
    actions: { handleChangeQuantity, handleAddProduct },
  } = useCart();

  const productIndex = useMemo(() => {
    return cart.findIndex((sale: ICart) => sale.product.id === id);
  }, [cart, id]);

  return (
    <ProductStyle.ProductCardWrapper data-testid="product_item_test_id">
      <ProductStyle.ContainerWrapper>
        <img src={image} alt={name} />
        <ProductStyle.Info>
          <h3>{name}</h3>
          <ProductStyle.QuantityContainer>
            <p>R$ {price.toFixed(2)}</p>

            {cart[productIndex] ? (
              <CountButton
                quantity={cart[productIndex].quantity}
                onChange={(quantity: number) =>
                  handleChangeQuantity(id, quantity)
                }
              />
            ) : (
              <Button
                style={{ width: 35 }}
                onClick={() => handleAddProduct(product)}
                data-testid="add_btn_test_id"
              >
                <FaPlus />
              </Button>
            )}
          </ProductStyle.QuantityContainer>
        </ProductStyle.Info>
      </ProductStyle.ContainerWrapper>
    </ProductStyle.ProductCardWrapper>
  );
};
