import  { useState, useEffect } from "react";
// import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://vishalvsk.github.io/json-deployed/product.json"
      );
      const jsonData = await response.json();
      setProducts(
        jsonData.products.map((product) => ({ ...product, quantity: 0 }))
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const updateQuantity = (index, quantity) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = parseInt(quantity);
    setProducts(updatedProducts);
  };

  const calculateTotal = () => {
    const totalQuantity = products.reduce(
      (total, product) => total + product.quantity,
      0
    );
    const totalAmount = products.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
    return { totalQuantity, totalAmount };
  };

  const { totalQuantity, totalAmount } = calculateTotal();

  return (
    <div className="App">
      <h3>Shopping Cards</h3>
      <div className="card-container">
        {products?.map((product, index) => (
          <div className="card" key={index}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <img
              src={product.images[0]}
              alt={product.title}
              className="thumbnail"
            />
            <h4>Enter the Quantity needed</h4>
            <input
              type="number"
              min="0"
              value={product.quantity}
              onChange={(e) => updateQuantity(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="totals">
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Amount: ${totalAmount}</p>
      </div>
    </div>
  );
}

export default App;
