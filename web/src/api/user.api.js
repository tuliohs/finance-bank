
import { URL } from 'utils/constants'
import api from '.'

export const register = async (values) => {
    return await api.post(URL.REGISTER, values)
}
export const sigIn = async (values) => {
    return await api.post(URL.LOGIN, values)
}
export const loginGoogle = async (values) => {
    return await api.post(URL.LOGIN_GOOGLE, values)
}
export const getUser = async () => {
    return await api.get(URL.USER)
}
export const changeUser = async (values) => {
    return await api.put(URL.USER, values)
}