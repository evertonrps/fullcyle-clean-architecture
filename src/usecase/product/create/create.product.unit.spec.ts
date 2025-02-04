import CreateProductUseCase from "./create.product.usecase";
import Product from "../../../domain/product/entity/product";

const input ={
    type: "a",
    name: "name",
    price: 100,
};

const mockRepository = ()=> {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe('Unit test create product use case', () =>
{
    it('Should create a product', async () => {
        const productRepository = mockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: 100,
        })
    })

    it("should thrown an error when name is missing", async () => {
        const productRepository = mockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });


    it("should throw error when price is less than zero", async () => {
        const productRepository = mockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "teste";
        input.price = -300;

        await expect(productCreateUseCase.execute(input)).rejects.toThrowError(
            "Price must be greater than zero"
        );
    });
})