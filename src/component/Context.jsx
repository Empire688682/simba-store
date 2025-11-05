import React, { useContext, useEffect, useState } from 'react'

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const apiUrl = "http://localhost:8080/api";
    const [allProducts, setAllProducts] = useState([]);
    async function fetchAllProducts() {
        try {
            const response = await fetch(`${apiUrl}/products`,
                { method: "GET" }
            );
            const data = await response.json();
            console.log("Fetched products:", data);
            setAllProducts(data);
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    return <AppContext.Provider value={{
        apiUrl,
        fetchAllProducts,
        allProducts
    }}>
        {children}
    </AppContext.Provider>
}

export const UseGlobalContext = () => {
    return useContext(AppContext);
}
