import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import NewPassword from './components/auth/NewPassword'
import Register from './components/auth/Register'
import ResetPassword from './components/auth/ResetPassword'
import ConfirmAccount from './pages/ConfrimAccountPage'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route path="/password-reset" element={<ResetPassword />} />
			<Route path="/confirmation/:token" element={<ConfirmAccount />} />
			<Route path="/password-reset/:token" element={<NewPassword />} />
			<Route path="/home" element={<HomePage />} />
		</Routes>
	)
}

export default App
