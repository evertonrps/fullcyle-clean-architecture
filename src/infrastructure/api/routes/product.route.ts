import express, {Request, Response} from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUsecase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/",
    async (req: Request, res: Response) => {
        const productUsecase = new CreateProductUseCase(new ProductRepository());

        try {
            const productDTO = {
                type: "a",
                name: req.body.name,
                price: req.body.price,
            };

            const output = await productUsecase.execute(productDTO);
            res.send(output);
        } catch (err) {
            res.status(500).send(err);
        }
    });

productRoute.get("/", async (req: Request, res: Response) => {
    const productUsecase = new ListProductUsecase(new ProductRepository());

    try {
        const output =  await productUsecase.execute();
        res.send(output);
    }
    catch (err) {
       res.status(500).send(err);
    }
})