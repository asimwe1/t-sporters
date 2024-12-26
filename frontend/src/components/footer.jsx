import React from "react";
import send from "/images/angle-square-right.svg";
import qrCode from "/images/QR_Code.png";
import twitter from "/images/twitter.svg";
import instagram from "/images/instagram.svg";
import facebook from "/images/facebook.svg";

const whatsapp = "https://www.whatsapp.com/favicon.ico";

function Footer() {
  return (
    <>
      <div className="bg-black">
        <div className="mt-10 grid lg:grid-cols-5 md:w-11/12 m-auto bg-black text-white opacity-90 pt-7 lg:items-left md-items-center md:px-10 md:grid-cols-2 justify-center md:justify-start">
          <div>
            <h1 className="text-xl font-semibold mb-5">Exclusive</h1>
            <h2 className="text-lg">Subscribe</h2>
            <p className="mt-3">Get 10% off your first order</p>
            <label className="flex flex-row w-56 items-center border-2 border-white mt-4 rounded-md justify-between p-1">
              <input
                type="text"
                placeholder="Enter your email"
                className="outline-none bg-black text-white p-1"
              />
              <img
                src={send}
                alt="Send icon"
                className="h-8 -ml-6 bg-white rounded-md"
              />
            </label>
          </div>
          <div>
            <h1 className="text-lg mb-3">Support</h1>
            <p className="py-1">
              KK 623 St,
              <br /> Kigali, Rwanda
            </p>
            <p className="py-1">exclusive@gmail.com</p>
            <p className="py-1">+250-788-888-888</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg mb-3">Account</h1>
            <a href="#" className="py-1">
              My Account
            </a>
            <a href="#" className="py-1">
              Login / Register
            </a>
            <a href="#" className="py-1">
              Cart
            </a>
            <a href="#" className="py-1">
              Wishlist
            </a>
            <a href="#" className="py-1">
              Shop
            </a>
          </div>
          <div className="flex-col">
            <h1 className="text-lg mb-3">Quick Links</h1>
            <p className="py-1">Privacy Policy</p>
            <p className="py-1">Terms of Use</p>
            <p className="py-1">FAQ</p>
            <p className="py-1">Contact</p>
          </div>
          <div className="flex-col">
            <h1 className="text-lg mb-3">Download App</h1>
            <p className="text-xs">Save $3 with App (New Users Only)</p>
            <div>
              <img src={qrCode} alt="QR Code" className="w-16 bg-white" />
            </div>
            <div className="flex flex-row justify-between w-40 mt-4">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={instagram}
                  alt="Instagram icon"
                  className="w-5 bg-white rounded-full"
                />
              </a>
              <a
                href="https://www.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={whatsapp}
                  alt="WhatsApp icon"
                  className="w-5 h-5 bg-white"
                />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={facebook}
                  alt="Facebook icon"
                  className="w-5 bg-white rounded-full"
                />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={twitter}
                  alt="Twitter icon"
                  className="w-5 bg-white rounded-full"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center">
          <hr className="w-full opacity-15" />
          <p className="text-gray-300 opacity-30 m-2 text-sm">
            &copy; Copyright Landry 2024. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
