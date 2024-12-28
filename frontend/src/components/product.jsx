import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Notification from "./notifications.jsx";

const API_BASE_URL = "/api";

function Product(props) {
  const [addedtocart, setAddToCart] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(false);
  const [type, setType] = useState();
  const [location, setLocation] = useState();
  const [rating, setRating] = useState({ stars: 0, count: 0 });
  const [price, setPrice] = useState();
  const [priceBeforeDiscount, setState] = useState();
  const [ratingCount, setRatingCount] = useState();
  const [image, setImage] = useState();


  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/wishlist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setWishlist(data);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    const fetchCart = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cart`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setCart(data);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    const fetchRating = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/products/${props.id}/rating`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setRating(data);
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    const fetchPrice = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${props.id}`, {
          method: "GET",
        });
        const data = await response.json();
        if (response.ok) {
          setPrice(data.price); // Update the price state here
        }
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };

    fetchWishlist();
    fetchCart();
    fetchRating();
    fetchPrice();
  }, [props.id]);

  async function addToWishlist(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (response.ok) {
        setWishlist(data);
        handleNotification("add", "wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  }

  async function removeFromWishlist(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setWishlist(data);
        handleNotification("remove", "wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  }

  async function addToCart(productId, quantity) {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      if (response.ok) {
        setCart(data);
        setAddToCart(true);
        handleNotification("add", "cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  function isFoundInCart(productId) {
    return cart.some((item) => item.productId === productId);
  }

  function handleNotification(type, location) {
    setNotification(true);
    setType(type);
    setLocation(location);
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  }

  return (
    <>
      <div className="inline-block relative my-2 md:w-auto">
        <div>
          <div className="md:h-56 md:w-56 w-[165px] h-[165px] flex justify-center border-2 rounded-lg shadow-sm hover:shadow-lg transition relative">
            <img
              src={props.image}
              alt={props.name}
              className="md:w-36 md:h-36 w-24 h-24 my-auto"
            />
            <div
              className="absolute bottom-0 bg-black text-white w-full h-8 font-3xl flex justify-center rounded-sm invisible"
              onClick={() => {
                addToCart(props.id, 1);
              }}
            >
              <p className="my-auto">
                {isFoundInCart(props.id) ? "Added to cart" : "Add to cart"}
              </p>
            </div>
          </div>
          <div className="h-18 flex flex-col justify-center items-start">
            <h1 className="font-semibold md:w-56 w-42">{props.name}</h1>
            {price !== null ? (
              <div>
                <span className="text-sm mr-2">Rf {props.price}</span>
                <span className="text-sm text-gray-500 line-through">
                  {`${props.priceBeforeDiscount}` > 0 ? `Rf ${props.priceBeforeDiscount}` : "" }
                </span>
              </div>
            ) : (
              <div className="text-sm text-gray-500">Loading price...</div>
            )}

            <div>
              <img
                src={`/ratings/rating-${props.rating * 10}.png`}
                alt="ratings"
                className="w-14 inline-block"
              />
              <span className="text-sm">({props.ratingCount})</span>
            </div>
          </div>
        </div>

        {props.wishlist ? (
          <ProductIconDiv2
            data={props.id}
            removeFromWishlist={removeFromWishlist}
            updateheaderwishlist={props.updateheaderwishlist}
            handlenotifications={handleNotification}
          />
        ) : (
          <ProductIconDiv1
            data={props.id}
            addToWishlist={addToWishlist}
            updateheaderwishlist={props.updateheaderwishlist}
            handlenotifications={handleNotification}
          />
        )}

        {notification && <Notification type={type} location={location} />}
      </div>
    </>
  );
}

const ProductIconDiv1 = ({
  data,
  addToWishlist,
  updateheaderwishlist,
  handlenotifications,
}) => (
  <div className="absolute top-2 right-2">
    <div
      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mb-1 hover:bg-gray-400"
      onClick={() => {
        addToWishlist(data);
        updateheaderwishlist((prev) => prev + 1);
        handlenotifications("add", "wishlist");
      }}
    >
      <img src={"/images/heart.svg"} alt="heart" className="w-5" />
    </div>
    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
      <Link to={`/product/${data}`}>
        <img src={"/images/eye.svg"} alt="view" className="w-5" />
      </Link>
    </div>
  </div>
);

const ProductIconDiv2 = ({
  data,
  removeFromWishlist,
  updateheaderwishlist,
  handlenotifications,
}) => (
  <div className="absolute top-2 right-2">
    <div
      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-red-500 rounded-full mb-2"
      onClick={() => {
        removeFromWishlist(data);
        updateheaderwishlist((prev) => prev - 1);
        handlenotifications("remove", "wishlist");
      }}
    >
      <img src={"/images/trash.svg"} alt="remove" className="w-5" />
    </div>
  </div>
);

export default Product;
