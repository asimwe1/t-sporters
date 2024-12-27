import HomePage from "./pages/homepage.jsx";
import Login from "./pages/logIn.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/singUp.jsx";
import AboutUs from "./pages/aboutUs.jsx";
import Contact from "./pages/contact.jsx";
import Account from "./pages/account.jsx";
import Cart from "./pages/cart.jsx";
import Checkout from "./pages/checkout.jsx";
import WishList from "./pages/wishlist.jsx";
import ProductDisplay from "./components/productDisplay.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./utils/protectedRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/account",
    element: (
      <ProtectedRoute>
        <Account/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
  },
  {
    path: "/product/:id",
    element: <ProductDisplay />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
