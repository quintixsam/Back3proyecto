import * as chai from "chai";
import supertest from "supertest";
import app from "../app.js";

const expect = chai.expect;
const requester = supertest(app);

describe("Tests funcionales - adoption.router.js", () => {

    let adoptionId;
    const fakePet = "6711aabc8df2c41d2e534c2b";
    const fakeUser = "67117cfb5a7a2e2a405f0c1a";

  // GET all adoptions
    it("GET /api/adoptions debe retornar todas las adopciones", async () => {
    const { status, body } = await requester.get("/api/adoptions");
    expect(status).to.equal(200);
    expect(body).to.have.property("status", "success");
    });

  // POST create adoption
    it("POST /api/adoptions debe crear una adopción", async () => {
    const { status, body } = await requester.post("/api/adoptions").send({
        pet: fakePet,
        user: fakeUser,
    });
    expect(status).to.equal(201);
    expect(body.payload).to.have.property("_id");
    adoptionId = body.payload._id;
    });

  // GET by ID
    it("GET /api/adoptions/:id debe obtener una adopción específica", async () => {
    const { status, body } = await requester.get(`/api/adoptions/${adoptionId}`);
    expect(status).to.equal(200);
    expect(body.payload).to.have.property("_id", adoptionId);
    });

  // DELETE by ID
    it("DELETE /api/adoptions/:id debe eliminar una adopción", async () => {
    const { status, body } = await requester.delete(`/api/adoptions/${adoptionId}`);
    expect(status).to.equal(200);
    expect(body.message).to.equal("Adopción eliminada");
    });

  // Error: POST sin datos
    it("POST /api/adoptions sin datos debe devolver error 400", async () => {
    const { status, body } = await requester.post("/api/adoptions").send({});
    expect(status).to.equal(400);
    expect(body.message).to.equal("Faltan datos");
    });
});
