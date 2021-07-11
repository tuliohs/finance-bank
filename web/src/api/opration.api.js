
import { URL } from 'utils/constants'
import api from '.'

export const newOperation = async (values) => {
    return await api.post(URL.OPERATION, values)
}
export const getOperations = async (values) => {
    return await api.get(URL.OPERATION, values)
}
export const revertOperations = async (id) => {
    return await api.delete(URL.OPERATION_V2 + '/' + id)
}
export const editOperations = async (id, values) => {
    return await api.put(URL.OPERATION_V2 + '/' + id, values)
}