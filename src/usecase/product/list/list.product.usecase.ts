import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import Product from "../../../domain/product/entity/product";
import {OutputListProduct} from "./list.product.dto";

export default class ListProductUsecase{
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface){
        this.productRepository = productRepository;
    }

    async execute(): Promise<OutputListProduct>{
      const products = await this.productRepository.findAll() ;
      return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(product: Product[]): OutputListProduct {
        return{
            products: product.map((product) =>
                ({
                    id: product.id,
                    name: product.name,
                    price: product.price
                }))
        };
    }
}