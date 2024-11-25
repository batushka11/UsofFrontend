import { Flex, Heading } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'

const HomePage = () => {
	const { user, token } = useAppSelector((state: any) => state.auth)
	const navigate = useNavigate()
	useEffect(() => {
		if (!token) {
			navigate('/login')
		}
	}, [navigate, token])

	return (
		<Flex minH="100vh" align="center" justify="center" bg="brand.50" px={4}>
			<Heading as="h2" size="lg" color="brand.400">
				Welcome to forum, {user.login}!
			</Heading>
		</Flex>
	)
}

export default HomePage
