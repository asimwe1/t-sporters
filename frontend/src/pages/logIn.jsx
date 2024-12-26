import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  }
  return (
    <>
      <Header />
      <div className="flex flex-row my-16 justify-between">
        <div className="w-6/12">
          <img
            src={"/images/cart.png"}
            alt="this is the cart image"
            className="w-full"
          />
        </div>
        <form className="flex flex-col mx-auto w-2/6  my-auto " onSubmit={handleSubmit}>
          <h1 className="text-3xl mb-4">Log in to exclusive</h1>
          <p className=" text-sm mb-8 text-gray-700">Enter your details below</p>
          <div className="flex flex-col mb-1">
            <input
              name="emailOrPhone"
              type="text"
              placeholder="Email or phone number"
              className="border-b-2 w-2/4 mb-4 text-black outline-none placeholder:text-gray-400 placeholder:text-sm"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" placeholder="Password" className="border-b-2 w-2/4 mb-4 text-black outline-none placeholder:text-gray-400 placeholder:text-sm" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="flex justify-between w-6/12 items-center">
            <button className="h-10 w-24 bg-red-500 rounded-sm text-white text-sm">Log in</button>
            <span className="text-red-400">
              <Link to="/forget-password">Forgot password?</Link>
            </span>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
