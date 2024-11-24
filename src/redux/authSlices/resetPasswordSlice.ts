import { createDynamicSlice } from '../dynamicSlice'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const { slice: resetPasswordSlice, asyncThunk: resetPassword } =
	createDynamicSlice({
		name: 'passwordReset',
		apiEndpoint: `${API_BASE_URL}/auth/password-reset`
	})

export const { clearState } = resetPasswordSlice.actions
export default resetPasswordSlice.reducer
export { resetPassword }
