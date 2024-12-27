import React, { useState } from "react";

const NewProductForm = ({ onClose }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    priceBeforeDiscount: "",
    description: "",
    ratingStars: "",
    ratingCount: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("price", formData.price);
    data.append("priceBeforeDiscount", formData.priceBeforeDiscount || "");
    data.append("description", formData.description);
    data.append("ratingStars", formData.ratingStars);
    data.append("ratingCount", formData.ratingCount);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/post/create", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Product added successfully!");
        onClose();
      } else {
        alert("Failed to add product. Please try again.");
        console.log(response)
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed overflow-auto inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="w-full border-2 p-2 rounded-md outline-none"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full border-2 p-2 rounded-md outline-none"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="priceBeforeDiscount" className="block text-sm font-medium">
              Price Before Discount
            </label>
            <input
              type="number"
              id="priceBeforeDiscount"
              name="priceBeforeDiscount"
              value={formData.priceBeforeDiscount}
              onChange={handleInputChange}
              className="w-full border-2 p-2 rounded-md outline-none"
              placeholder="Enter price before discount (optional)"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border-2 p-2 rounded-md outline-none"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="imageUpload" className="block text-sm font-medium">
              Product Image
            </label>
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              className="w-full border-2 p-2 rounded-md outline-none"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="mt-2 max-h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="ratingStars" className="block text-sm font-medium">
              Rating (Stars)
            </label>
            <input
              type="number"
              id="ratingStars"
              name="ratingStars"
              value={formData.ratingStars}
              onChange={handleInputChange}
              className="w-full border-2 p-2 rounded-md outline-none"
              placeholder="Enter rating (1-5)"
              min="1"
              max="5"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ratingCount" className="block text-sm font-medium">
              Rating (Count)
            </label>
            <input
              type="number"
              id="ratingCount"
              name="ratingCount"
              value={formData.ratingCount}
              onChange={handleInputChange}
              className="w-full border-2 p-2 rounded-md outline-none"
              placeholder="Enter number of ratings"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 mr-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductForm;
