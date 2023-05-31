import { doHealthCheck } from './agents/health.js'
import { fetchUsers } from './agents/random-data.js'

const defaultImpl = { doHealthCheck, fetchUsers}

export const resolvers = (impl = defaultImpl) =>({
    Query: {
        healthCheck: () => impl.doHealthCheck(),
        users: async (parent, args) => await impl.fetchUsers(args)
    }
})