import React from "react";
import { number } from "prop-types";
import Footer from "../components/footer";
import Header from "../components/header";
import { products } from "../data/products";
import NewProductForm from "../components/newProductForm";

products.forEach((product) => {
  product.priceBeforeDiscount = product.priceBeforeDiscount || null;
  product.rating = product.rating || {
    stars: Math.floor(Math.random() * 5) + 1,
    count: Math.floor(Math.random() * 200) + 1,
  };
  product.image = product.image || "/images/default-product.png";
});

const Top = () => {
  return (
    <div className="flex justify-between mb-8 px-4 lg:px-0">
      <div className="lg:ml-20 mt-10">
        <span className="opacity-50">Home</span> / account
      </div>
      <div className="lg:mr-20 mt-10">
        <p>
          Welcome! <span className="text-red-600">Beni Sporters</span>
        </p>
      </div>
    </div>
  );
};

const AccountDetailsCategories = ({ header, categoryone, categorytwo, categorythree }) => {
  return (
    <div className="lg:ml-20 mb-4 ml-4">
      <h2 className="font-semibold">{header}</h2>
      <div className="ml-6 mt-2">
        {categoryone && <p className="text-base text-gray-500">{categoryone}</p>}
        {categorytwo && <p className="text-base text-gray-500">{categorytwo}</p>}
        {categorythree}
      </div>
    </div>
  );
};

const Account = () => {
  const productNumber = products.length; // Total number of products
  const number = "+250788888888";
  const [showForm, setShowForm] = React.useState(false);

  return (
    <>
      <Header profiledivclicked={true} />
      <div className="mt-8">
        <Top />

        <div className="grid md:grid-cols-4 grid-cols-1">
          <div className="hidden md:block">
            <AccountDetailsCategories
              header="Manage My Account"
              categoryone="My Profile"
              categorytwo={`Whatsapp Number: ${number}`}
            />
            <AccountDetailsCategories
              header="Products"
              categoryone={`Total number: ${productNumber}`}
              categorythree={
                <button
                  className="text-blue-500"
                  onClick={() => setShowForm(true)}
                >
                  Add Product
                </button>
              }
            />
          </div>

          <div className="col-span-3 lg:border-2 lg:px-10 py-8 lg:mr-20 border-gray-50 rounded-md px-4">
            <h1 className="font-xl mb-2 text-red-500 font-semibold">
              Edit Your Profile
            </h1>
            <form className="lg:mr-20">
              <div className="grid grid-cols-2 mb-3 gap-2 md:gap-4">
                <div className="flex flex-col md:mr-6">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    className="border-2 bg-gray-100 p-2 rounded-md outline-none placeholder:text-gray-500 mt-1 mb-2"
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Sewase"
                  />
                </div>
                <div className="flex flex-col md:mr-6">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    className="border-2 bg-gray-100 p-2 rounded-md outline-none placeholder:text-gray-500 mt-1 mb-2"
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Angel"
                  />
                </div>
                <div className="flex flex-col md:mr-6">
                  <label htmlFor="email">Email</label>
                  <input
                    className="border-2 bg-gray-100 p-2 rounded-md outline-none placeholder:text-gray-500 mt-1"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="flex flex-col md:mr-6">
                  <label htmlFor="address">Address</label>
                  <input
                    className="border-2 bg-gray-100 p-2 rounded-md outline-none placeholder:text-gray-500 mt-1"
                    type="text"
                    id="address"
                    name="address"
                    placeholder="User address"
                  />
                </div>
              </div>

              <div className="flex flex-col md:mr-6">
                <h4>Password Changes</h4>
                <input
                  className="border-2 my-1.5 rounded-md p-2 bg-gray-100 outline-none"
                  type="password"
                  name="currentpassword"
                  placeholder="Current Password"
                />
                <input
                  className="border-2 my-1.5 rounded-md p-2 bg-gray-100 outline-none"
                  type="password"
                  name="newpassword"
                  placeholder="New Password"
                />
                <input
                  className="border-2 my-1.5 rounded-md p-2 bg-gray-100 outline-none"
                  type="password"
                  name="confirmedpassword"
                  placeholder="Confirm New Password"
                />
              </div>

              <div className="md:mr-6 flex justify-end mt-4">
                <button
                  type="button"
                  className="py-3 px-8 hover:bg-gray-100 rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 py-3 px-10 text-sm ml-7 rounded-sm text-gray-100"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      {showForm && <NewProductForm onClose={() => setShowForm(false)} />}
    </>
  );
};

export default Account;
