import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import listRoutes from "./routes/list.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.send("BC Market API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
