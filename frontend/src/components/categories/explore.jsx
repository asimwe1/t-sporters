import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import Product from "../product";

const Ourproduts = forwardRef((props, ref) => {
  const [products, setProducts] = useState([]);
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data); // Store the fetched products
    } catch (err) {
      setError(`Error fetching products: ${err.message}`);
      console.error(err); // Log the error to the console
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Toggle the "show more" functionality
  const handleClick = () => {
    setMore((prev) => !prev);
  };

  useImperativeHandle(ref, () => ({
    handleClick,
  }));

  const ProductsToDisplay = [];
  let displayedProducts = products.slice(10, 20); // Default display (first 10-20 products)

  if (more) {
    displayedProducts = displayedProducts.concat(products.slice(30, 40)); // Add more products when "more" is true
  }

  displayedProducts.forEach((element) => {
    ProductsToDisplay.push(
      <Product
        {...element}
        key={element.id}
        updateheader={props.updateheader}
        updateheaderwishlist={props.updateheaderwishlist}
      />
    );
  });

  return (
    <>
      <div className="grid grid-cols-2 md:flex md:justify-start gap-2 md:gap-4 lg:gap-0 justify-center lg:justify-evenly lg:mr-28 flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          ProductsToDisplay
        )}
      </div>
    </>
  );
});

function Explore(props) {
  const productsRef = React.useRef(null);
  const [buttonClicked, setButtonClicked] = React.useState(false);

  const handleClick = () => {
    productsRef.current.handleClick();
    setButtonClicked((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-row w-11/12 justify-between">
        <div className="w-full md:w-6/12">
          <div className="flex">
            <button className="bg-red-500 w-3 h-6 rounded-sm"></button>
            <p className="text-red-600 ml-2">Our products</p>
          </div>
          <h1 className="text-4xl font-semibold my-4">Explore our products</h1>
        </div>
        <div className="flex flex-row items-center">
          <button className="w-8 h-8 rounded-full bg-gray-100 mx-1">
            <img src={"/images/arrow-small-left.svg"} alt="the left arrow" className="w-8" />
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-100">
            <img src={"/images/arrow-small-right.svg"} alt="the right arrow" className="w-8" />
          </button>
        </div>
      </div>
      <Ourproduts
        ref={productsRef}
        updateheader={props.updateheader}
        updateheaderwishlist={props.updateheaderwishlist}
      />
      <button
        className="py-2 px-8 bg-red-500 rounded text-white ml-[45%] mt-4 hidden md:block"
        onClick={handleClick}
      >
        {buttonClicked ? "show less" : "view all products"}
      </button>
    </>
  );
}

export default Explore;
