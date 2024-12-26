const NewProductForm = ({ onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <form>
            {/* Product Name */}
            <div className="mb-4">
              <label htmlFor="productName" className="block text-sm font-medium">Product Name</label>
              <input
                type="text"
                id="productName"
                name="productName"
                className="w-full border-2 p-2 rounded-md outline-none"
                placeholder="Enter product name"
              />
            </div>
  
            {/* Price */}
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                className="w-full border-2 p-2 rounded-md outline-none"
                placeholder="Enter price"
              />
            </div>
  
            {/* Price Before Discount */}
            <div className="mb-4">
              <label htmlFor="priceBeforeDiscount" className="block text-sm font-medium">Price Before Discount</label>
              <input
                type="number"
                id="priceBeforeDiscount"
                name="priceBeforeDiscount"
                className="w-full border-2 p-2 rounded-md outline-none"
                placeholder="Enter price before discount (optional)"
              />
            </div>
  
            {/* Product Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                className="w-full border-2 p-2 rounded-md outline-none"
                placeholder="Enter product description"
              ></textarea>
            </div>
  
            {/* Product Image URL */}
            <div className="mb-4">
              <label htmlFor="imageUrl" className="block text-sm font-medium">Image URL</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                className="w-full border-2 p-2 rounded-md outline-none"
                placeholder="Enter image URL"
              />
            </div>
  
            {/* Product Rating */}
            <div className="mb-4">
              <label htmlFor="ratingStars" className="block text-sm font-medium">Rating (Stars)</label>
              <input
                type="number"
                id="ratingStars"
                name="ratingStars"
                className="w-full border-2 p-2 rounded-md outline-none"
                placeholder="Enter rating (1-5)"
                min="1"
                max="5"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ratingCount" className="block text-sm font-medium">Rating (Count)</label>
              <input
                type="number"
                id="ratingCount"
                name="ratingCount"
                className="w-full border-2 p-2 rounded-md outline-none"
                placeholder="Enter number of ratings"
              />
            </div>
  
            {/* Form Buttons */}
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
  