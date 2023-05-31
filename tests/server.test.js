import { startServer } from '../src/server.js'

const resetMock = (startServerFnFragment) =>{
    const wasCalled = [];
    let sigintMock = {};
    const startServerArgs = {
        logError:(msg, e)=>wasCalled.push({logError: [msg, e.toString()]}),
        logInfo: (args)=>wasCalled.push({logInfo: args}),
        nodeEnv: "test",
        startServerFn:async () => {
            wasCalled.push({startServerFn: 'no-args'})
            startServerFnFragment()
            return {url:"http://yummydummy.fake.mock:8080"}
        },
        process: {
            on:(eventName, fn)=>{
                sigintMock[eventName] = ()=> fn();
            },
            exit: (args) => {
                wasCalled.push({exit: args})
            }
        }
    }
    return {
        startServerArgs, wasCalled, consoleCtrlC: () => sigintMock['SIGINT']()
    }
}

test("Should start server properly ", async ()=>{

    const {startServerArgs, wasCalled, consoleCtrlC} = resetMock(()=>{})
    await startServer(startServerArgs)
    consoleCtrlC()

    expect(wasCalled[0]).toStrictEqual({"startServerFn": "no-args"})
    expect(wasCalled[1]).toStrictEqual({"logInfo": "🚀  Server ready at: http://yummydummy.fake.mock:8080 [test]"})
    expect(wasCalled[2]).toStrictEqual({"logInfo": "👋 The server was shut down gracefully..."})
    expect(wasCalled[3]).toStrictEqual({"exit": 0})
    
});

test("Should catch errors properly ", async ()=>{
    const {startServerArgs, wasCalled, consoleCtrlC} = resetMock(()=>{throw Error("Mocked error")})
    await startServer(startServerArgs)
    expect(wasCalled[0]).toStrictEqual({"startServerFn": "no-args"})
    expect(wasCalled[1]).toStrictEqual({logError: ["Unexpected error received", "Error: Mocked error"]})
});