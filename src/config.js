const { NODE_ENV, PORT} = process.env

export const configValues = ({ NODE_ENV, PORT }) => {
    switch (NODE_ENV) {
    case 'production': return prod({ NODE_ENV, PORT })
    case 'test': return test({ NODE_ENV, PORT })
    default: return dev({ NODE_ENV, PORT })
    }
}

const prod = ({ NODE_ENV, PORT }) => ({
    PORT: PORT || 8090,
    NODE_ENV
})

const test = ({ NODE_ENV, PORT }) => ({
    PORT: PORT || 4001,
    NODE_ENV
})

const dev = ({ NODE_ENV, PORT }) => ({
    PORT: PORT || 4001,
    NODE_ENV
})

export default configValues({ NODE_ENV, PORT })
