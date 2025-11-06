import React, { useContext, useEffect, useState } from 'react'
import { localProducts } from './data';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const apiUrl = "http://localhost:8080/api/v1";
    const [products, setProducts] = useState(localProducts);
    const [cartItems, setCartItems] = useState({});


    //  useEffect(() => {
    //      async function fetchAllProducts() {
    //      try {
    //          const response = await fetch(`${apiUrl}/products`,
    //              { method: "GET" }
    //          );
    //          const data = await response.json();
    //          console.log("Fetched products:", data);
    //          setAllProducts(data);
    //      } catch (error) {
    //          console.log("Error fetching products:", error);
    //      }
    //  };
    //  fetchAllProducts();
    //  }, []);

    {/**Add to cart */}
    function addToCart(productId){
        setCartItems((prev)=>{
            const updatedCart = {...prev};
            if(updatedCart[productId]){
                updatedCart[productId] += 1
            }else{
                updatedCart[productId] = 1
            }
            return updatedCart;
        })
    };

    {/**Remove from cart */}
    function removeFromCart(productId){

    }

     {/**Add to Fav */}
    function addToFav(productId){
        
    }

    {/**Remove from Fav */}
    function removeFromFav(productId){

    }

    return <AppContext.Provider value={{
        apiUrl,
        products,
        addToCart,
        removeFromCart,
        addToFav,
        removeFromFav,
        cartItems
    }}>
        {children}
    </AppContext.Provider>
}

export const UseGlobalContext = () => {
    return useContext(AppContext);
}
