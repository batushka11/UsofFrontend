import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const loginAsyncThunk = createAsyncThunk(
	'auth/login',
	async (data: { login: string; password: string }, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${API_BASE_URL}/auth/login`, data)
			const { accessToken, user } = response.data
			return { accessToken, user }
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Login failed')
		}
	}
)

export const registerAsyncThunk = createAsyncThunk(
	'auth/register',
	async (
		data: {
			login: string
			email: string
			password: string
			fullname: string
			password_confirm: string
		},
		{ rejectWithValue }
	) => {
		try {
			const response = await axios.post(`${API_BASE_URL}/auth/register`, data)
			return response.data
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Registration failed'
			)
		}
	}
)

export const resetPasswordAsyncThunk = createAsyncThunk(
	'auth/resetPassword',
	async (data: { email: string }, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${API_BASE_URL}/auth/password-reset`,
				data
			)
			return response.data
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Reset password failed'
			)
		}
	}
)

export const newPasswordAsyncThunk = createAsyncThunk(
	'auth/newPassword',
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

export const confirmAccountAsyncThunk = createAsyncThunk(
	'auth/confirmAccount',
	async (token: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${API_BASE_URL}/auth/register?token=${token}`
			)
			return response.data
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Account confirmation failed'
			)
		}
	}
)
