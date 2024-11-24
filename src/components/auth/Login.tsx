import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Stack,
	Text,
	useToast,
	VStack
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { clearState, loginUser } from '../../redux/authSlices/loginSlice'
import Logo from '../Logo'

const Login: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const toast = useToast()
	const { loading, success, error } = useAppSelector(state => state.login)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const onSubmit = (data: any) => {
		dispatch(loginUser(data))
	}

	useEffect(() => {
		if (success) {
			dispatch(clearState())
			navigate('/home')
		}
		if (error) {
			toast({
				title: 'Login failed',
				description: error,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
			dispatch(clearState())
		}
	}, [success, error, dispatch, toast, navigate])

	return (
		<Flex height="100vh" align="center" justify="center" bg="brand.100" px={4}>
			<Box
				rounded="lg"
				bg="white"
				boxShadow="lg"
				p={16}
				width={{ base: 'full', md: 'lg' }}
			>
				<VStack mb={8} align="center">
					<Box mb={4}>
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
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormControl id="login" isRequired>
							<FormLabel color="brand.400" pt={5}>
								Username
							</FormLabel>
							<Input
								type="text"
								focusBorderColor="brand.400"
								{...register('login')}
							/>
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel color="brand.400" pt={5}>
								Password
							</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? 'text' : 'password'}
									focusBorderColor="brand.400"
									{...register('password')}
								/>
								<InputRightElement>
									<Button
										variant="ghost"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={12} pt={2}>
							<Link
								color="brand.400"
								textAlign="right"
								onClick={() => navigate('/password-reset')}
								pt={5}
							>
								Forgot Password?
							</Link>
							<Button
								bg="brand.400"
								color="white"
								_hover={{ bg: 'brand.500' }}
								type="submit"
								isLoading={loading}
							>
								Log In
							</Button>
						</Stack>
					</form>
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

export default Login
