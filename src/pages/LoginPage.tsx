import { Box, Flex, Heading, Link, Stack, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import LoginForm from '../components/auth/LoginForm'

const LoginPage: React.FC = () => {
	const navigate = useNavigate()

	return (
		<Flex height="100vh" align="center" justify="center" bg="brand.50" px={4}>
			<Box
				rounded="lg"
				bg="white"
				boxShadow="lg"
				p={16}
				width={{ base: 'full', md: 'lg' }}
			>
				<VStack mb={8} align="center">
					<Box mb={-2}>
						<Logo></Logo>
					</Box>
					<Heading fontSize="4xl" textAlign="center" color="brand.400">
						Log In
					</Heading>
					<Text fontSize="lg" color="brand.300">
						Access your account to continue ✌️
					</Text>
				</VStack>
				<Stack spacing={7}>
					<LoginForm></LoginForm>
					<Stack pt={6}>
						<Text align="center" color="brand.400">
							Don't have an account?{' '}
							<Link color="brand.400" onClick={() => navigate('/register')}>
								Register
							</Link>
						</Text>
					</Stack>
				</Stack>
			</Box>
		</Flex>
	)
}

export default LoginPage
