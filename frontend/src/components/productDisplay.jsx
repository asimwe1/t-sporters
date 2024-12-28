import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useParams } from "react-router-dom";

const ProductDisplay = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const headerref = React.useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setProduct(data);
        } else {
          console.error("Failed to fetch product:", data.message);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Update header cart and wishlist counts
  function updateheader(value) {
    headerref.current.setCartvalue(value);
  }

  function updateheaderwishlist(value) {
    headerref.current.setwishlistvalue(value);
  }

  if (!product) {
    return <p>Loading product details...</p>; // Loading state while product is being fetched
  }

  const handleAddToCart = async () => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        updateheader(data.cartLength); // Update the cart count in the header
        console.log("Product added to cart:", data);
      } else {
        console.error("Failed to add product to cart:", data.message);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await fetch("/api/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId: id }),
      });
      const data = await response.json();
      if (response.ok) {
        updateheaderwishlist(data.wishlistLength); // Update the wishlist count in the header
        console.log("Product added to wishlist:", data);
      } else {
        console.error("Failed to add product to wishlist:", data.message);
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  return (
    <>
      <Header ref={headerref} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:px-20 gap-2 mx-2 md:mx-14 mt-10">
        <div className="flex items-center justify-center shadow">
          <img src={product.image} alt="product image" className="w-72" />
        </div>

        {/* Product Description */}
        <div>
          <h2 className="text-2xl">{product.name}</h2>
          <div>
            <div className="mb-2">
              <img
                src={`/ratings/rating-${product.rating.stars * 10}.png`}
                alt="ratings"
                className="w-16 inline-block mr-1"
              />
              <span className="text-xs text-gray-500 mr-2">
                ({product.rating.count} reviews)
              </span>
              <span className="text-xs text-green-500">| In stock</span>
            </div>
            <span>${(product.priceCents / 100).toFixed(2)}</span>
          </div>

          {/* Product Description */}
          <div className=" ">
            <p>{product.description}</p>
            <hr className="mt-4" />
          </div>

          {/* Colors */}
          <div>
            <span>Colors:</span>
            {product.colors.map((color, index) => (
              <button
                key={index}
                className="w-4 h-4 rounded-full mx-1 my-3"
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>

          {/* Sizes */}
          <div>
            <span className="mr-2">Size:</span>
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className="rounded border-2 mx-1 py-1 px-2 text-xs border-gray-400 hover:bg-red-500 hover:text-white hover:border-none"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quantity and Cart / Wishlist Buttons */}
          <div className="mt-3 flex flex-col lg:flex-row gap-4 ">
            <div className="flex mt-1">
              <button
                className="border-2 border-gray-150 rounded py-3 text-base h-6 w-20 flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                Add
              </button>
              <span className="text-3xl flex items-center justify-center mx-4 -mt-1">{quantity}</span>
              <button
                className="border-2 border-gray-150 rounded py-3 text-base h-6 w-20 flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white"
                onClick={() => setQuantity((prev) => (prev !== 0 ? prev - 1 : 0))}
              >
                Remove
              </button>
            </div>

            {/* Add to Cart */}
            <button
              className="bg-red-500 rounded py-1 px-8 text-white"
              onClick={handleAddToCart}
            >
              Buy Now
            </button>

            {/* Add to Wishlist */}
            <button
              className="rounded border-2 mx-1 py-1 px-2 text-xs border-gray-400 self-start"
              onClick={handleAddToWishlist}
            >
              <img
                src={"/images/heart.svg"}
                alt="the heart icon"
                className="w-5"
              />
            </button>
          </div>

          {/* Delivery Options */}
          <div className="mt-4 w-7/12 border-2 rounded p-2">
            <div className="flex p-2">
              <img
                src="/images/shipping-fast.svg"
                alt="delivery icon"
                className="w-8"
              />
              <div className="ml-3">
                <h3 className="text-sm">Free delivery</h3>
                <p className="text-xs underline font-bold">
                  Enter your postal code for delivery availability
                </p>
              </div>
            </div>
            <hr />
            <div className="flex p-2">
              <img
                src="/images/rotate-right.svg"
                alt="return delivery"
                className="w-8"
              />
              <div className="ml-3">
                <h3 className="text-sm">Return Delivery</h3>
                <p className="text-xs underline font-bold">
                  Free 30-day return policy. Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDisplay;
