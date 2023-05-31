import {version} from '../version.js'
 
export const doHealthCheck = () => {
    return {
        status: 200, text: 'The GQL Layer is up and running!', version
    }
}