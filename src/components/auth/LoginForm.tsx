import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Stack,
	useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { clearState } from '../../redux/auth/authSlice'
import { loginAsyncThunk } from '../../redux/auth/authThunks'

const LoginForm: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const toast = useToast()
	const { loading, success, error } = useAppSelector(state => state.auth)

	const { register, handleSubmit } = useForm()

	const onSubmit = (data: any) => {
		dispatch(loginAsyncThunk(data))
	}

	useEffect(() => {
		if (success) {
			dispatch(clearState())
			navigate('/home')
		}
		if (error) {
			console.log(error)
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
	)
}

export default LoginForm
