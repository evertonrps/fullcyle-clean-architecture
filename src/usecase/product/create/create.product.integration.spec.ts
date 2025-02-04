import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import {InputCreateProductDto} from "./create.product.dto";


describe("Test find product use case", () => {
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

        it("should create a product", async () => {
            const productRepository = new ProductRepository();
            const usecase = new CreateProductUseCase(productRepository);


            const input : InputCreateProductDto = {
                type: "a",
                name: "my product",
                price: 100,
            };

            const output = {
                id: expect.any(String),
                name: "my product",
                price: 100,
            };
            const result = await usecase.execute(input);

            expect(result).toEqual(output);
        });

});