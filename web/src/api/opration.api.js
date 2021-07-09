
import { URL } from 'utils/constants'
import api from '.'

export const newOperation = async (values) => {
    return await api.post(URL.OPERATION, values)
}
export const getOperations = async (values) => {
    return await api.get(URL.OPERATION, values)
}