import Header from "../components/header";
import Footer from "../components/footer";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="grid grid-cols-6 mt-16 mb-36 mr-16 gap-4">
        {/* Breadcrumb */}
        <div className="ml-4">
          <span className="opacity-50">Home</span> /about
        </div>

        {/* Contact Information */}
        <div className="col-span-2 flex flex-col justify-evenly border-2 pl-3 border-slate-50 rounded">
          {/* Call Status Section */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 flex justify-center rounded-full">
                <img
                  src="/images/phone-flip.svg"
                  alt="Phone icon"
                  className="rotate-180 w-5"
                />
              </div>
              <p className="text-sm font-semibold opacity-90">Call Status</p>
            </div>
            <p className="text-sm mt-4 mb-2">
              We are available 24/7, 7 days a week
            </p>
            <p className="text-sm mb-4">Phone: +250788888888</p>
            <hr className="border-black w-3/5" />
          </div>

          {/* Write to Us Section */}
          <div className="my-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 flex justify-center rounded-full">
                <img
                  src="/images/envelope.svg"
                  alt="Message icon"
                  className="w-5"
                />
              </div>
              <p className="text-sm font-semibold opacity-90">Write to Us</p>
            </div>
            <p className="text-sm mt-4">
              Fill out our form and we will contact <br />
              you within 24 hours
            </p>
            <p className="text-sm mt-4">Email: gura@gmail.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-span-3">
          <form className="grid grid-cols-3 gap-3">
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className="h-10 p-2 rounded-sm placeholder:text-slate-500 bg-slate-100"
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              className="rounded-sm bg-slate-100 p-2 placeholder:text-slate-500"
            />
            <input
              name="tel"
              type="text"
              placeholder="Your phone (optional)"
              className="rounded-sm bg-slate-100 p-2 placeholder:text-slate-500"
            />
            <textarea
              name="message"
              placeholder="Your message"
              className="col-span-3 h-56 rounded bg-slate-100 p-2"
            />
            <button
              type="submit"
              className="col-span-3 ml-auto py-3 px-4 mt-5 rounded-md bg-red-500 text-white"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
