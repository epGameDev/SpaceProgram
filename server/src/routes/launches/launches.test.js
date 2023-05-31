const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");


describe("Launches API", () => {

    beforeAll(async () => await mongoConnect());

    // afterAll(async () => await mongoDisconnect());

    // test fixture
    describe("Test GET /launches endpoint", () => {
        // Test description. 
        test("It should respond with 200 success", async () => {
            const response = await request(app)
            .get("/launches")
            .expect('Content-Type', /json/)
            .expect(200);
        });
    });
    
    
    describe("Test POST /launches", () => {
        // Test Data
        const completeLaunchData = {
            launchDate: "May 13, 2023",
            mission: "Kepler Exploration X",
            rocket: "Explorer IS1",
            target: "Kepler-442 b",
        };
        const launchDataWithoutDate = {
            mission: "Kepler Exploration X",
            rocket: "Explorer IS1",
            target: "Kepler-442 b",
        }
        const dataInvalidDate = {
            launchDate: "Meow",
            mission: "Kepler Exploration X",
            rocket: "Explorer IS1",
            target: "Kepler-442 b",
        };
    
        // Post Test
        test("It should respond with 201 created", async () => {
            const response = await request(app)
                .post("/launches")
                .send(completeLaunchData)
                .expect("Content-Type", /json/)
                .expect(201);
    
            const requestDate =  new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
    
     
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });
    
        //Error Cases
        test("Needs to check for missing property and throw 404 error", async () => {
            const response = await request(app)
            .post("/launches")
            .send(launchDataWithoutDate)
            .expect("Content-Type", /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({error: "Missing launch property"});
        });
        
        test("It should catch any invalid dates", async () => {
            const response = await request(app)
            .post("/launches")
            .send(dataInvalidDate)
            .expect("Content-Type", /json/)
            .expect(400);
        
            expect(response.body).toStrictEqual({ error: "Date is invalid or before current. Example: November 30, 2029"});
    
        });
    });

});
