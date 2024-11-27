import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
	Box,
	Flex,
	Heading,
	IconButton,
	Link,
	Stack,
	Text,
	useColorMode,
	VStack
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo'
import LoginForm from '../../components/auth/LoginForm'
import Footer from '../../components/footer/Footer'

const LoginPage: React.FC = () => {
	const navigate = useNavigate()
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<Flex
			height="100vh"
			direction="column"
			justify="space-between"
			align="center"
			bg="brand.50"
		>
			<Flex align="flex-end" justify="flex-end" w="full">
				<IconButton
					aria-label="Switch color mode"
					icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
					onClick={toggleColorMode}
					variant="ghost"
					size="lg"
				/>
			</Flex>
			<Flex align="center" justify="center" flex="1" w="full">
				<Box
					rounded="lg"
					bg="brand.800"
					boxShadow="lg"
					p={16}
					width={{ base: 'full', md: 'lg' }}
				>
					<VStack mb={8} align="center">
						<Box mb={-2}>
							<Logo />
						</Box>
						<Heading fontSize="4xl" textAlign="center" color="brand.400">
							Log In
						</Heading>
						<Text fontSize="lg" color="brand.300">
							Access your account to continue ✌️
						</Text>
					</VStack>
					<Stack spacing={7}>
						<LoginForm />
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

			<Box w="100%">
				<Footer />
			</Box>
		</Flex>
	)
}

export default LoginPage
