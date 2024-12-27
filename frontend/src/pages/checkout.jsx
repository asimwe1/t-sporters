import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const CheckoutProduct = ({ name, image, priceCents, productquantity, calculatesubtotal }) => {
  const subtotal = (priceCents / 100) * productquantity;
  calculatesubtotal(subtotal);
  return (
    <div className="grid grid-cols-2 my-2 gap-10 flex-1">
      <div className="flex gap-2 items-center">
        <img src={image} alt={name} className="w-9" />
        <p className="text-sm">{name}</p>
      </div>
      <p className="text-sm">${subtotal.toFixed(2)}</p>
    </div>
  );
};

const Checkoutproducts = ({ cartData, calculatesubtotal }) => {
  return (
    <>
      {cartData.map((product) => (
        <CheckoutProduct
          {...product}
          calculatesubtotal={calculatesubtotal}
          key={product._id} // Assuming each product has a unique _id
        />
      ))}
    </>
  );
};

const CheckoutPriceDetails = ({ total }) => {
  return (
    <div className="my-2">
      <div className="grid grid-cols-2 py-2">
        <p>subtotal:</p>
        <p className="pl-5">${total.toFixed(2)}</p>
      </div>
      <hr className="w-8/12" />
      <div className="grid grid-cols-2 py-2">
        <p>shipping:</p>
        <p className="pl-5">free</p>
      </div>
      <hr className="w-8/12" />
      <div className="grid grid-cols-2 py-2">
        <p className="font-semibold">Total:</p>
        <p className="pl-5">${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

const Checkout = () => {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [billingInfo, setBillingInfo] = useState({
    firstname: "",
    companyname: "",
    streetaddress: "",
    apartment: "",
    city: "",
    phonenumber: "",
    email: "",
  });

  useEffect(() => {
    // Fetch the user's cart data from the backend
    const fetchCartData = async () => {
      try {
        const response = await fetch("/api/cart", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setCartData(data); // Set cart data from backend
        } else {
          console.error("Failed to fetch cart data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  function calculateSubtotal(productSubtotal) {
    setTotal((prevTotal) => prevTotal + productSubtotal);
  }

  const handleSubmitOrder = async (event) => {
    event.preventDefault();

    // Prepare the order data
    const orderData = {
      billingInfo,
      cartItems: cartData.map((item) => ({
        productId: item._id,
        quantity: item.productquantity,
      })),
      totalAmount: total,
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Order placed successfully!");
        // Redirect or reset state here as needed
      } else {
        console.error("Failed to place order:", result.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="mx-20">
        <div className="my-10">
          <span className="opacity-50">
            Account / My account / Product / View cart / Checkout
          </span>
        </div>

        <h1 className="text-3xl">Billing Details</h1>

        <div className="flex justify-between mt-5">
          <div className="w-4/12">
            <form onSubmit={handleSubmitOrder}>
              <div className="flex flex-col mt-1">
                <label className="text-gray-500">First name</label>
                <input
                  type="text"
                  name="firstname"
                  className="bg-slate-100 outline-none rounded p-2"
                  value={billingInfo.firstname}
                  onChange={(e) => setBillingInfo({ ...billingInfo, firstname: e.target.value })}
                />
              </div>
              <div className="flex flex-col mt-1">
                <label>Company name</label>
                <input
                  type="text"
                  name="companyname"
                  className="bg-slate-100 outline-none rounded p-2"
                  value={billingInfo.companyname}
                  onChange={(e) => setBillingInfo({ ...billingInfo, companyname: e.target.value })}
                />
              </div>
              <div className="flex flex-col mt-1">
                <label>Street address</label>
                <input
                  type="text"
                  name="streetaddress"
                  className="bg-slate-100 outline-none rounded p-2"
                  value={billingInfo.streetaddress}
                  onChange={(e) => setBillingInfo({ ...billingInfo, streetaddress: e.target.value })}
                />
              </div>
              <div className="flex flex-col mt-1">
                <label>Apartament, Floor, etc (optional)</label>
                <input
                  type="text"
                  name="apartment"
                  className="bg-slate-100 outline-none rounded p-2"
                  value={billingInfo.apartment}
                  onChange={(e) => setBillingInfo({ ...billingInfo, apartment: e.target.value })}
                />
              </div>
              <div className="flex flex-col mt-1">
                <label>Town/City</label>
                <input
                  type="text"
                  name="town/city"
                  className="bg-slate-100 outline-none rounded p-2"
                  value={billingInfo.city}
                  onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                />
              </div>
              <div className="flex flex-col mt-1">
                <label>Phone number</label>
                <input
                  type="tel"
                  name="phonenumber"
                  className="bg-slate-100 outline-none rounded p-2"
                  value={billingInfo.phonenumber}
                  onChange={(e) => setBillingInfo({ ...billingInfo, phonenumber: e.target.value })}
                />
              </div>
              <div className="flex flex-col mt-1 mb-1">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="bg-slate-100 outline-none rounded p-2"
                  value={billingInfo.email}
                  onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                />
              </div>
              <input type="checkbox" name="saveinfo" />
              <label className="text-sm">Save this information for faster checkout next time</label>
            </form>
          </div>

          <div className="w-6/12 mt-4">
            <div className="flex flex-col">
              <Checkoutproducts cartData={cartData} calculatesubtotal={calculateSubtotal} />
            </div>
            <CheckoutPriceDetails total={total} />
            <div className="my-1">
              <div className="flex gap-2 items-center">
                <input type="radio" name="paymentoption" className="w-4" />
                <label>Bank</label>
              </div>
              <div className="flex gap-2 items-center">
                <input type="radio" name="paymentoption" className="w-4" />
                <label>Cash on delivery</label>
              </div>
            </div>

            <div className="flex gap-3 my-5">
              <input
                type="text"
                placeholder="Apply coupon"
                className="pl-2 py-2 pr-4 text-lg rounded border-2 border-gray-700 placeholder:text-gray-400"
              />
              <button className="bg-red-500 text-white px-10 py-3 rounded">Apply coupon</button>
            </div>
            <button type="submit" className="bg-red-500 text-white px-10 py-3 rounded">
              Place order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
