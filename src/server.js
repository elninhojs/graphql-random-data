export const startServer = async ({nodeEnv, logError, logInfo, process, startServerFn}) => {
    try{
        const { url } = await startServerFn()
        console.log('\n\n')
        logInfo(`🚀  Server ready at: ${url} [${nodeEnv}]`)
        console.log('\n\n')
    }catch(e){
        logError('Unexpected error received', e)
    }
    process.on('SIGINT', () => {
        logInfo('👋 The server was shut down gracefully...')
        process.exit(0)
    })
}