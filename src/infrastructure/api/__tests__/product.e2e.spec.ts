import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
     const response =  await request(app).post("/product")
            .send({
                type:"a",
                name:"product1",
                price:200,
            });

        expect(response.status).toBe(200);
        expect.any(response.body.id)
        expect(response.body.name).toBe("product1");
        expect(response.body.price).toBe(200);
    })

    it("should not create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "product1",
        });
        expect(response.status).toBe(500);
    });

    it("should list all product", async () => {

        const response =  await request(app).post("/product")
            .send({
                type:"a",
                name:"product1",
                price:200,
            });

        const response2 =  await request(app).post("/product")
            .send({
                type:"a",
                name:"product2",
                price:150,
            });

        expect(response.status).toBe(200);
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const product1 = listResponse.body.products[0];
        const product2 = listResponse.body.products[1];
        expect(product1.name).toBe("product1");
        expect(product2.name).toBe("product2");
        expect(product1.price).toBe(200);
        expect(product2.price).toBe(150);
    })
})