import React, { useState, useEffect } from "react";
import Product from "../product";

const ProductList = ({ products, updateheader, updateheaderwishlist, gridClass }) => (
  <div className={gridClass}>
    {products.map((product) => (
      <Product
        {...product}
        key={product.id}
        updateheader={updateheader}
        updateheaderwishlist={updateheaderwishlist}
      />
    ))}
  </div>
);

function BestSelling({ updateheader, updateheaderwishlist }) {
  const [products, setProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [moreProducts, setMoreProducts] = useState([]);
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();

        // Sort products by sales in descending order
        const sortedProducts = data.sort((a, b) => b.sales - a.sales);

        // Set best-selling products (first 5)
        const topSelling = sortedProducts.slice(0, 5);
        setBestSellingProducts(topSelling.length > 0 ? topSelling : sortedProducts.slice(0, 5)); // Fallback to all products if no best-selling
        setMoreProducts(sortedProducts.slice(5, 10)); // Next 5 products
        setProducts(sortedProducts); // Save sorted products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading best-selling products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-row w-11/12 justify-between flex-wrap md:flex-nowrap">
        <div className="w-full md:w-6/12">
          <div className="flex">
            <button className="bg-red-500 w-3 h-6 rounded-sm"></button>
            <p className="text-red-600 ml-2">This month</p>
          </div>
          <h1 className="text-4xl font-semibold my-4">Best Selling Products</h1>
        </div>
        <div>
          <button
            className="bg-red-500 h-12 w-40 rounded-md text-white mt-8 hidden md:block"
            onClick={() => setMore((prev) => !prev)}
          >
            {more ? "Show Less" : "View All"}
          </button>
        </div>
      </div>
      <ProductList
        products={bestSellingProducts}
        updateheader={updateheader}
        updateheaderwishlist={updateheaderwishlist}
        gridClass="grid grid-cols-2 md:flex justify-center lg:justify-evenly lg:mr-28 flex-wrap mt-4 md:mt-0 gap-2 md:gap-4 md:justify-start md:items-start"
      />
      {more && (
        <ProductList
          products={moreProducts}
          updateheader={updateheader}
          updateheaderwishlist={updateheaderwishlist}
          gridClass="flex items-center justify-center lg:justify-evenly lg:mr-28 flex-wrap mt-4 md:mt-0 gap-0 md:gap-4 md:justify-start md:items-start"
        />
      )}
    </>
  );
}

export default BestSelling;
