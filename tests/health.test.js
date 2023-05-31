import { doHealthCheck } from "../src/agents/health";

test("Should call doHealthCheck properly - success case", async ()=>{
    const response = await doHealthCheck();
    expect(response.status).toBe(200)
    expect(response.text).toBe("The GQL Layer is up and running!")
});