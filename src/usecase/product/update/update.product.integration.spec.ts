import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import UpdateProductUseCase from "./update.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("Unit test for product update use case", ()=> {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


 it("should update a product", async () => {
     const productRepository = new ProductRepository();

     const product = new Product("1","my product", 100);
     await productRepository.create(product);

     const productUpdateUseCase = new UpdateProductUseCase(productRepository);

     const input = {
         id: product.id,
         name: "my product updated",
         price: 200,
     }

     const output = await productUpdateUseCase.execute(input);

     expect(output).toEqual(input)
 })
});