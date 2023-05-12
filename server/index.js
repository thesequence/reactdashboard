import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import overviewRoutes from "./routes/overview.js";
import stocksRoutes from "./routes/stocks.js";
import workforceRoutes from "./routes/workforce.js";
import accountingRoutes from "./routes/accounting.js";
import generalRoutes from "./routes/general.js";

// data import
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import { dataUser, dataProduct, dataProductStat } from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/overview", overviewRoutes);
app.use("/stocks", stocksRoutes);
app.use("/workforce", workforceRoutes);
app.use("/accounting", accountingRoutes);
app.use("/general", generalRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    /* Product.insertMany(dataProduct); */
    /* ProductStat.insertMany(dataProductStat); */
    /* Transaction.insertMany(dataTransaction); */
    /* User.insertMany(dataUser); */
  })
  .catch((error) => console.log(`${error} did not connect`));
