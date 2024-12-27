import React, { useEffect, useState } from "react";

function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    // Fetch new arrival products from the API
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setNewArrivals(data))
      .catch(error => {
        console.error('Error fetching new arrivals:', error);
      });
  }, []);

  return (
    <>
      <div className="flex flex-row  w-11/12 justify-between ">
        <div className="w-6/12">
          <div className="flex">
            <button className="bg-red-500 w-3 h-6 rounded-sm"></button>
            <p className="text-red-600 ml-2">Featured</p>
          </div>
          <h1 className="text-4xl font-semibold my-4">New arrival</h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-8 mt-8">
        {/* First product */}
        {newArrivals[0] && (
          <div className="h-full bg-black rounded-md relative">
            <img
              src={newArrivals[0].imageUrl || "/products/playstation.jpg"} // Fallback image
              alt={newArrivals[0].name || "PlayStation 5"}
              className="h-[450px] w-full mt-20 rounded-md"
            />
            <div className="absolute bottom-10 left-8 text-white">
              <h3 className="text-xl font-semibold mb-3">{newArrivals[0].name}</h3>
              <p className="text-sm opacity-90">{newArrivals[0].description}</p>
              <br />
              <span className="text-lg underline underline-offset-3">Shop now</span>
            </div>
          </div>
        )}

        {/* Second product grid */}
        <div className="grid grid-rows-2 gap-4 h-full rounded-md">
          {/* Second product */}
          {newArrivals[1] && (
            <div className="border-2 bg-zinc-950 h-[243px] rounded-md relative">
              <img
                src={newArrivals[1].imageUrl || "/products/jpg.jpg"}
                alt={newArrivals[1].name || "Women's collection"}
                className="h-60 ml-auto brightness-50"
              />
              <div className="absolute text-white bottom-6 left-8">
                <h3 className="text-xl font-semibold mb-3">{newArrivals[1].name}</h3>
                <p className="text-sm opacity-90">{newArrivals[1].description}</p>
                <br />
                <span className="text-lg underline underline-offset-3">Shop now</span>
              </div>
            </div>
          )}

          {/* Third and fourth products */}
          <div className="grid grid-cols-2 gap-8 h-full rounded-md">
            {newArrivals[2] && (
              <div className="bg-black rounded-md relative">
                <img
                  src={newArrivals[2].imageUrl || "/products/jbl.webp"}
                  alt={newArrivals[2].name || "Speakers"}
                  className="h-56 ml-auto mt-[29px] rounded-md"
                />
                <div className="absolute text-white bottom-4 left-8">
                  <h3 className="text-xl font-semibold -mb-4">{newArrivals[2].name}</h3>
                  <p className="text-sm opacity-90">{newArrivals[2].description}</p>
                  <span className="text-lg underline underline-offset-3">Shop now</span>
                </div>
              </div>
            )}
            {newArrivals[3] && (
              <div className="bg-black rounded-md relative">
                <img
                  src={newArrivals[3].imageUrl || "/products/gucci pefumejpg.jpg"}
                  alt={newArrivals[3].name || "Gucci Perfume"}
                  className="h-60 ml-auto mt-[13px] rounded-md"
                />
                <div className="absolute text-white bottom-12 left-8">
                  <h3 className="text-xl font-semibold -mb-4">{newArrivals[3].name}</h3>
                  <p className="text-xs opacity-90">{newArrivals[3].description}</p>
                  <span className="text-lg underline underline-offset-3">Shop now</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewArrivals;
