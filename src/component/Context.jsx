import React, { useContext, useEffect, useState } from 'react'
import { localProducts } from './data';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const apiUrl = "http://localhost:8080/api/v1";
    const [products, setProducts] = useState(localProducts);
    const [cartItems, setCartItems] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [isloaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        const savedCart = localStorage.getItem("CartItems");
        if(savedCart){
            setCartItems(JSON.parse(savedCart));
        }
        setIsLoaded(true)
    }, []);
    
    useEffect(()=>{
        if(isloaded){
            localStorage.setItem("CartItems", JSON.stringify(cartItems));
        }
    }, [cartItems, isloaded]);

    useEffect(()=>{
        const savedFave = localStorage.getItem("FaveItems");
        if(savedFave){
            setFavorites(JSON.parse(savedFave));
        }
        setIsLoaded(true)
    }, []);
    
    useEffect(()=>{
        if(isloaded){
            localStorage.setItem("FaveItems", JSON.stringify(favorites));
        }
    }, [favorites, isloaded]);

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
        setCartItems((prev)=>{
            const updatedCart = {...prev};
            if(updatedCart[productId] > 1){
                updatedCart[productId] -= 1
            }
            else{
                delete updatedCart[productId]
            }
            return updatedCart;
        })
    }

     {/**Add to Fav */}
     function toggleFave(productId){
        setFavorites((prev) =>
            prev.includes(productId)
            ? prev.filter((id)=> id !== productId) 
            : [...prev, productId] 
        );
    }

    return <AppContext.Provider value={{
        apiUrl,
        products,
        addToCart,
        removeFromCart,
        toggleFave,
        cartItems,
        favorites
    }}>
        {children}
    </AppContext.Provider>
}

export const UseGlobalContext = () => {
    return useContext(AppContext);
}
