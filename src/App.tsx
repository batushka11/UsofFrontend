import { Route, Routes } from 'react-router-dom'
import ConfirmAccountPage from './pages/ConfirmAccountPage'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import NewPasswordPage from './pages/NewPasswordPage'
import RegisterPage from './pages/RegisterPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/password-reset" element={<ResetPasswordPage />} />
			<Route path="/confirmation/:token" element={<ConfirmAccountPage />} />
			<Route path="/password-reset/:token" element={<NewPasswordPage />} />
			<Route path="/home" element={<HomePage />} />
		</Routes>
	)
}

export default App
