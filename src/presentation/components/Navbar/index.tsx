import React, { useState } from "react";

import * as NavbarStyle from "./style";
import { Button } from "../Button";
import { FaShoppingCart } from "react-icons/fa";

import { IoClose } from "react-icons/io5";
import { useCart } from "../../hooks/useCart";
import { CountButton } from "../CountButton";
import { Avatar } from "../Avatar";
import { useAuth } from "../../hooks/useAuth";

export const Navbar: React.FC = () => {
  const [openCart, setOpenCart] = useState(false);
  const {
    user,
    actions: { handleSignOut },
  } = useAuth();

  const {
    cart,
    total,
    actions: { handleChangeQuantity, handleFinishSale },
  } = useCart();

  return (
    <>
      <NavbarStyle.Container>
        <img
          src="https://s3.sa-east-1.amazonaws.com/remotar-assets-prod/company-profile-pictures/clexnl3t500rm02w391ftadii.jpeg"
          alt="Framework Digital"
        />
        <NavbarStyle.Menu>
          <Button
            onClick={() => setOpenCart(true)}
            data-testid="open_cart_btn_test_id"
          >
            <FaShoppingCart />
          </Button>
          <Avatar
            onClick={handleSignOut}
            width={60}
            height={60}
            src={user?.avatar}
            alt={user?.name}
            title="Logout"
          />
        </NavbarStyle.Menu>
      </NavbarStyle.Container>

      <NavbarStyle.Cart open={openCart} data-testid="cart_test_id">
        <NavbarStyle.CartTitle>
          <h2 data-testid="cart_title_test_id">Cart</h2>
          <Button
            data-testid="close_cart_btn_test_id"
            style={{ width: 35, alignSelf: "center" }}
            onClick={() => setOpenCart(false)}
          >
            <IoClose />
          </Button>
        </NavbarStyle.CartTitle>
        <NavbarStyle.CartBody data-testid="cart_list_test_id">
          {cart.length > 0 ? (
            cart.map((sale) => (
              <NavbarStyle.CartItem
                data-testid="cart_item_test_id"
                key={sale.product.id}
              >
                <img src={sale.product.image} alt={sale.product.name} />
                <NavbarStyle.CartItemDescription>
                  <h3>{sale.product.name}</h3>
                  <span className="cart__unitValue">
                    R$ {sale.product.price.toFixed(2)}/unit.
                  </span>
                  <span
                    className="cart__subtotalValue"
                    data-testid="subtotal_cart_item_test_id"
                  >
                    Subtotal: R$ {sale.subtotal.toFixed(2)}
                  </span>
                </NavbarStyle.CartItemDescription>
                <CountButton
                  quantity={sale.quantity}
                  onChange={(quantity) =>
                    handleChangeQuantity(sale.product.id, quantity)
                  }
                />
              </NavbarStyle.CartItem>
            ))
          ) : (
            <p data-testid="empty_cart_title_test_id">
              You don't have any product on your cart yet!
            </p>
          )}
          <h2 data-testid="total_cart_test_id">Total: R$ {total.toFixed(2)}</h2>
          <Button
            data-testid="buy_btn_test_id"
            disabled={cart.length === 0}
            onClick={handleFinishSale}
          >
            Buy
          </Button>
        </NavbarStyle.CartBody>
      </NavbarStyle.Cart>
    </>
  );
};
