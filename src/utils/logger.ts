const _getMessage = (msg: string) => {
    let now = new Date()
    return `[${now.toISOString()}] ${msg}`
}

export default {
    logError: (msg: string) => {
        console.log(`\x1b[31m${_getMessage('ERROR ' + msg)}\x1b[0m`)
    },
    logInfo: (msg: string) => {
        console.log(`\x1b[34m${_getMessage('INFO ' + msg)}\x1b[0m`)
    },
    logWarning: (msg: string) => {
        console.log(`\x1b[33m${_getMessage('WARNING ' + msg)}\x1b[0m`)
    }
}