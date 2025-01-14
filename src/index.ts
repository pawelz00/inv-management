import express from 'express';
import bodyParser from 'body-parser';
import {productRouter} from "./routes/productRoutes";
import {ordersRoutes} from "./routes/ordersRoutes";

const app = express();
const PORT = 3000;

app.use(bodyParser.json())
app.use("/products", productRouter)
app.use("/orders", ordersRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})