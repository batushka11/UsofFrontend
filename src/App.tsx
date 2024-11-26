import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './helpers/ProtectedRoute'
import ConfirmAccountPage from './pages/auth/ConfirmAccountPage'
import LoginPage from './pages/auth/LoginPage'
import NewPasswordPage from './pages/auth/NewPasswordPage'
import RegisterPage from './pages/auth/RegisterPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import NotFoundPage from './pages/errors/404'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/password-reset" element={<ResetPasswordPage />} />
			<Route path="/confirmation/:token" element={<ConfirmAccountPage />} />
			<Route path="/password-reset/:token" element={<NewPasswordPage />} />
			<Route
				path="/home"
				element={
					<ProtectedRoute>
						<HomePage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/my-profile"
				element={
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				}
			/>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	)
}

export default App
