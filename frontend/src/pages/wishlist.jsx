import React, { useState, useEffect } from "react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("/api/wishlist", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch wishlist");
        }

        const data = await response.json();
        setWishlist(data);
      } catch (err) {
        console.error("Error fetching wishlist:", err.message);
        setError(err.message || "Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return <div>Loading wishlist...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <ul>
          {wishlist.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your wishlist is empty!</p>
      )}
    </div>
  );
};

export default Wishlist;
