export const logInfo = (message, date = new Date(), log = console.log) => log(`${timeStamp(date)} INFO: ${message}`)

export const logError = (message, error, date = new Date(), log = console.error) => log(`${timeStamp(date)} ERROR: ${message} TRACE: ${error}`)

export const logWarn = (message, date = new Date(), log = console.warn) => log(`${timeStamp(date)} WARN: ${message}`)

const timeStamp = (date = new Date()) => `[${date.toISOString().replace('T', ' ').replace('Z', '').split('.')[0]}]`