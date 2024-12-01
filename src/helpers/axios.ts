import axios from 'axios'
import { updateToken, updateUser } from '../redux/auth/authSlice'
import store from '../redux/store'

const apiClient = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
	withCredentials: true
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error)
		} else {
			prom.resolve(token)
		}
	})
	failedQueue = []
}

apiClient.interceptors.request.use(
	config => {
		const token = store.getState().auth.token
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

apiClient.interceptors.response.use(
	async response => {
		const user = store.getState().auth.user

		try {
			const token = store.getState().auth.token

			const responseUser = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/users/${user.id}`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)

			localStorage.setItem('user', JSON.stringify(responseUser.data))
			store.dispatch(updateUser(responseUser.data))
		} catch (err) {
			console.error(err)
		}
		return response
	},
	async error => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then(token => {
						originalRequest.headers.Authorization = `Bearer ${token}`
						return axios(originalRequest)
					})
					.catch(err => Promise.reject(err))
			}

			originalRequest._retry = true
			isRefreshing = true

			try {
				const response = await axios.post(
					`${process.env.REACT_APP_API_BASE_URL}/auth/refresh`,
					{},
					{ withCredentials: true }
				)

				const newUserInfo = response.data.user
				const newAccessToken = response.data.accessToken

				localStorage.setItem('token', newAccessToken)
				localStorage.setItem('user', JSON.stringify(newUserInfo))

				store.dispatch(updateToken(newAccessToken))
				store.dispatch(updateUser(newUserInfo))

				processQueue(null, newAccessToken)

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
				return axios(originalRequest)
			} catch (err) {
				processQueue(err, null)
				localStorage.removeItem('token')
				store.dispatch(updateToken(null))
				window.location.href = '/login'
				return Promise.reject(err)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)

export default apiClient
