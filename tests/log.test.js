import {logInfo, logError, logWarn} from "../src/log.js"

test("Should log info properly", async ()=>{
    const expectations = [];
    const date = new Date();
    const message = "Info message";
    logInfo(message, date, (args)=>expectations.push(args))
    expect(expectations[0]).toStrictEqual(`[${date.toISOString().replace("T", " ").replace("Z", "").split(".")[0]}] INFO: ${message}`)
});

test("Should log warn properly", async ()=>{
    const expectations = [];
    const date = new Date();
    const message = "Warn message";
    logWarn(message, date, (args)=>expectations.push(args))
    expect(expectations[0]).toStrictEqual(`[${date.toISOString().replace("T", " ").replace("Z", "").split(".")[0]}] WARN: ${message}`)
});

test("Should log error properly", async ()=>{
    const expectations = [];
    const date = new Date();
    const message = "Error message";
    const error = new Error("error message here")
    logError(message, error, date, (args)=>expectations.push(args))
    expect(expectations[0]).toStrictEqual(`[${date.toISOString().replace("T", " ").replace("Z", "").split(".")[0]}] ERROR: ${message} TRACE: ${error}`)
});