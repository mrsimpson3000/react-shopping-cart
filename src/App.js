import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    // add the given item to the cart
    setCart([...cart, item]);
  };

  const removeItem = (itemId) => {
    console.log(itemId); // Looks to see what's returned
    console.log(cart); // Looks to see what's in the cart currently
    const newCart = cart.filter((item) => item.id !== itemId); // filter through the current cart and return all that do not match the id that's returned
    console.log(newCart); //Check to make sure it all looks right
    setCart(newCart); // Set our new state
  };

  return (
    <ProductContext.Provider value={{ products, addItem, removeItem }}>
      <CartContext.Provider value={{ cart }}>
        <div className='App'>
          <Navigation cart={cart} />

          {/* Routes */}
          <Route exact path='/'>
            <Products />
          </Route>

          <Route path='/cart'>
            <ShoppingCart cart={cart} />
          </Route>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
