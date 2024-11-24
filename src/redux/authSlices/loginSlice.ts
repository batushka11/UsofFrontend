import { createDynamicSlice } from '../dynamicSlice'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const { slice: loginSlice, asyncThunk: loginUser } = createDynamicSlice({
	name: 'login',
	apiEndpoint: `${API_BASE_URL}/auth/login`
})

export const { clearState } = loginSlice.actions
export default loginSlice.reducer
export { loginUser }
