import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const newPassword = createAsyncThunk(
	'newPassword/action',
	async (
		{ token, password }: { token: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await axios.post(
				`${API_BASE_URL}/auth/password-reset/${token}`,
				{ password }
			)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.response.data.message)
		}
	}
)

const newPasswordSlice = createSlice({
	name: 'newPassword',
	initialState: {
		loading: false,
		success: false,
		error: null as string | null
	},
	reducers: {
		clearState: state => {
			state.loading = false
			state.success = false
			state.error = null
		}
	},
	extraReducers: builder => {
		builder
			.addCase(newPassword.pending, state => {
				state.loading = true
				state.success = false
				state.error = null
			})
			.addCase(newPassword.fulfilled, state => {
				state.loading = false
				state.success = true
				state.error = null
			})
			.addCase(newPassword.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload as string
			})
	}
})

export const { clearState } = newPasswordSlice.actions
export default newPasswordSlice.reducer
