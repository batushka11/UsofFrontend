import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { token } = useAppSelector((state: any) => state.auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (!token) {
			navigate('/login')
		}
	}, [token, navigate])

	if (!token) {
		return null
	}

	return <>{children}</>
}

export default ProtectedRoute
