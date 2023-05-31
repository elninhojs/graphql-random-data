import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import config from './config.js'

import { typeDefs } from './schema.js'
import { resolvers } from './resolvers.js'
import { logError, logInfo } from './log.js'
import { startServer } from './server.js'

(async()=>{
    startServer({
        nodeEnv: config.NODE_ENV,
        logError,
        logInfo,
        process: process,
        startServerFn:async () => {
            const { url } = await startStandaloneServer(
                new ApolloServer({
                    typeDefs,
                    resolvers: resolvers(),
                }), {
                    listen: { port: config.PORT },
                })
            return {url}
        }
    })
})()