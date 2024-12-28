import express from 'express';
import { connectToDatabase } from './config/db.config.js';
import router from './routes/app.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path'

const app = express();

const PORT  = 5000;

const __dirname = path.resolve()

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use('/api/', router);

app.use(express.static(path.join(__dirname, '/frontend/')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDatabase();
})

app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Convert image buffer to Base64
    const imageBase64 = product.image ? product.image.toString('base64') : null;

    res.json({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      priceBeforeDiscount: product.priceBeforeDiscount,
      rating: product.rating,
      ratingCount: product.ratingCount,
      discount: product.discount,
      image: imageBase64
        ? `data:${product.imageContentType};base64,${imageBase64}`
        : null, // Include image only if it exists
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
