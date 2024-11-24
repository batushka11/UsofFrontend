import { Flex, Heading } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
	const user = localStorage.getItem('username')
	const navigate = useNavigate()
	useEffect(() => {
		const token = localStorage.getItem('accessToken')
		if (!token) {
			navigate('/login')
		}
	}, [navigate])

	return (
		<Flex minH="100vh" align="center" justify="center" bg="brand.50" px={4}>
			<Heading as="h2" size="lg" color="brand.400">
				Welcome to forum, {user}!
			</Heading>
		</Flex>
	)
}

export default HomePage
