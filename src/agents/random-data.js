import fetch from 'node-fetch'

const defaultImpl = {fetch, uri: ' https://random-data-api.com/api/v2/'}

export const fetchUsers = async ({filter}, impl = defaultImpl) => {
    const size = filter && filter.size || 20
    const response = await impl.fetch(`${impl.uri}users?size=${size}`)
    const ready = JSON.parse(await response.text())
    return ready
}