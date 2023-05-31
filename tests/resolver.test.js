import { resolvers } from '../src/resolvers.js'

test("Should call doHealthCheck as expected ", async ()=>{
    const wasCalled = {};
    const r = resolvers({doHealthCheck: (params)=> {
            wasCalled.called = true
            wasCalled.params = params
        }
    })
    r.Query.healthCheck()
    expect(wasCalled.called).toBe(true)
    expect(wasCalled.params).toBeUndefined()
});

test("Should call users as expected ", async ()=>{
    const wasCalled = {};
    const r = resolvers({fetchUsers: (params)=> {
            wasCalled.called = true
            wasCalled.params = params
        }
    })
    const args = {paramsHere:"Solved via gql parser"};
    r.Query.users(null, args)
    expect(wasCalled.called).toBe(true)
    expect(wasCalled.params).toBe(args)
});