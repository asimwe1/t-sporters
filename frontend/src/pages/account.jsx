import React, { useState, useEffect, useContext } from "react";
import Footer from "../components/footer.jsx";
import Header from "../components/header.jsx";
import NewProductForm from "../components/newProductForm.jsx";
import AuthContext from "../context/AuthContext.jsx";

const Top = () => {
  const { user } = useContext(AuthContext); // Get user data from context
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    names : "",
    email: "",
    address: "",
    whatsappNumber: "",
  });

  useEffect(() => {
    if (!user?.authToken) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData({
          names: data.names || "",
          email: data.email || "",
          address: data.address || "",
          whatsappNumber: data.whatsappNumber || "",
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className="flex justify-between mb-8 px-4 lg:px-0">
      <div className="lg:ml-20 mt-10">
        <span className="opacity-50">Home</span> / account
      </div>
      <div className="lg:mr-20 mt-10">
        <p>
          Welcome! <span className="text-red-600">{userData.names}</span>
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
  const { user } = useContext(AuthContext); // Get user data from context
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    names : "",
    email: "",
    address: "",
    whatsappNumber: "",
  });

  useEffect(() => {
    if (!user?.authToken) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData({
          names: data.names || "",
          email: data.email || "",
          address: data.address || "",
          whatsappNumber: data.whatsappNumber || "",
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
              categorytwo={`Whatsapp Number: ${userData.whatsappNumber}`}
            />
            <AccountDetailsCategories
              header="Products"
              categoryone={`Total number: 10`}
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
                    value={userData.names}
                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                  />
                </div>
                <div className="flex flex-col md:mr-6">
                  <label htmlFor="email">Email</label>
                  <input
                    className="border-2 bg-gray-100 p-2 rounded-md outline-none placeholder:text-gray-500 mt-1"
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </div>
                <div className="flex flex-col md:mr-6">
                  <label htmlFor="address">Address</label>
                  <input
                    className="border-2 bg-gray-100 p-2 rounded-md outline-none placeholder:text-gray-500 mt-1"
                    type="text"
                    id="address"
                    name="address"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  />
                </div>
                <div className="flex flex-col md:mr-6">
                  <label htmlFor="address">Whatsapp Number</label>
                  <input
                    className="border-2 bg-gray-100 p-2 rounded-md outline-none placeholder:text-gray-500 mt-1"
                    type="text"
                    id="address"
                    name="address"
                    value={userData.whatsappNumber}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  />
                </div>

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
