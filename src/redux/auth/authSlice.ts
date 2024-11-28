import { createSlice } from '@reduxjs/toolkit'
import {
	confirmAccountAsyncThunk,
	loginAsyncThunk,
	newPasswordAsyncThunk,
	registerAsyncThunk,
	resetPasswordAsyncThunk
} from './authThunks'

const loadStateFromStorage = () => {
	const token = localStorage.getItem('token')
	const user = localStorage.getItem('user')

	return {
		token: token || null,
		user: user ? JSON.parse(user) : null
	}
}

const { token, user } = loadStateFromStorage()

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		loading: false,
		success: false,
		error: null as string | null,
		token,
		user
	},
	reducers: {
		logout: state => {
			state.token = null
			state.user = null
			state.success = false

			localStorage.removeItem('token')
			localStorage.removeItem('user')
		},
		clearState: state => {
			state.loading = false
			state.success = false
			state.error = null
		},
		updateToken: (state, action) => {
			state.token = action.payload
		},
		updateUser: (state, action) => {
			state.user = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(loginAsyncThunk.pending, state => {
				state.loading = true
				state.success = false
				state.error = null
			})
			.addCase(loginAsyncThunk.fulfilled, (state, action) => {
				state.loading = false
				state.success = true
				state.token = action.payload.accessToken
				state.user = action.payload.user

				localStorage.setItem('token', action.payload.accessToken)
				localStorage.setItem('user', JSON.stringify(action.payload.user))
			})
			.addCase(loginAsyncThunk.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload as string
			})

			.addCase(registerAsyncThunk.pending, state => {
				state.loading = true
				state.success = false
				state.error = null
			})
			.addCase(registerAsyncThunk.fulfilled, state => {
				state.loading = false
				state.success = true
			})
			.addCase(registerAsyncThunk.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload as string
			})

			.addCase(resetPasswordAsyncThunk.pending, state => {
				state.loading = true
				state.success = false
				state.error = null
			})
			.addCase(resetPasswordAsyncThunk.fulfilled, state => {
				state.loading = false
				state.success = true
			})
			.addCase(resetPasswordAsyncThunk.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload as string
			})

			.addCase(newPasswordAsyncThunk.pending, state => {
				state.loading = true
				state.success = false
				state.error = null
			})
			.addCase(newPasswordAsyncThunk.fulfilled, state => {
				state.loading = false
				state.success = true
			})
			.addCase(newPasswordAsyncThunk.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload as string
			})

			.addCase(confirmAccountAsyncThunk.pending, state => {
				state.loading = true
				state.success = false
				state.error = null
			})
			.addCase(confirmAccountAsyncThunk.fulfilled, state => {
				state.loading = false
				state.success = true
			})
			.addCase(confirmAccountAsyncThunk.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = action.payload as string
			})
	}
})

export const { logout, clearState, updateToken, updateUser } = authSlice.actions
export default authSlice.reducer
