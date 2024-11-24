import { createDynamicSlice } from '../dynamicSlice'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const { slice: registerSlice, asyncThunk: registerUser } = createDynamicSlice({
	name: 'register',
	apiEndpoint: `${API_BASE_URL}/auth/register`
})

export const { clearState } = registerSlice.actions
export default registerSlice.reducer
export { registerUser }
