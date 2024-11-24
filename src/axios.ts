import axios from 'axios'

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
		const token = localStorage.getItem('accessToken')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

apiClient.interceptors.response.use(
	response => response,
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

				const newAccessToken = response.data.accessToken
				localStorage.setItem('accessToken', newAccessToken)

				processQueue(null, newAccessToken)

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
				return axios(originalRequest)
			} catch (err) {
				processQueue(err, null)
				localStorage.removeItem('accessToken')
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
