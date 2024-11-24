import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './authSlices/loginSlice'
import newPasswordReducer from './authSlices/newPasswordSlice'
import registerReducer from './authSlices/registerSlice'
import resetPasswordReducer from './authSlices/resetPasswordSlice'

const store = configureStore({
	reducer: {
		register: registerReducer,
		passwordReset: resetPasswordReducer,
		login: loginReducer,
		newPassword: newPasswordReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
