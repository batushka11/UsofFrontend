import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface SliceParams {
	name: string
	apiEndpoint: string
}

export const createDynamicSlice = ({ name, apiEndpoint }: SliceParams) => {
	const asyncThunk = createAsyncThunk(
		`${name}/action`,
		async (data: any, { rejectWithValue }) => {
			try {
				const response = await axios.post(apiEndpoint, data)
				if (response.data.accessToken) {
					localStorage.setItem('accessToken', response.data.accessToken)
					localStorage.setItem('username', response.data.user.login)
				}
				return response.data
			} catch (error: any) {
				return rejectWithValue(error.response.data.message)
			}
		}
	)

	const slice = createSlice({
		name,
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
				.addCase(asyncThunk.pending, state => {
					state.loading = true
					state.success = false
					state.error = null
				})
				.addCase(asyncThunk.fulfilled, state => {
					state.loading = false
					state.success = true
					state.error = null
				})
				.addCase(asyncThunk.rejected, (state, action) => {
					state.loading = false
					state.success = false
					state.error = action.payload as string
				})
		}
	})

	return {
		slice,
		asyncThunk
	}
}
