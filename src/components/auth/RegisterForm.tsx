import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Stack,
	Text,
	useToast
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { clearState } from '../../redux/auth/authSlice'
import { registerAsyncThunk } from '../../redux/auth/authThunks'

const registerSchema = z
	.object({
		login: z.string().min(5, 'Username must be at least 5 characters'),
		fullname: z.string().min(5, 'Full name must be at least 5 characters'),
		email: z.string().email('Invalid email address'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		password_confirm: z.string().min(1, 'Password confirmation is required')
	})
	.refine(data => data.password === data.password_confirm, {
		path: ['password_confirm'],
		message: "Passwords don't match"
	})

type RegisterFormData = z.infer<typeof registerSchema>

const RegisterForm: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const toast = useToast()
	const { loading, success, error } = useAppSelector(state => state.auth)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema)
	})

	const onSubmit = (data: RegisterFormData) => {
		dispatch(registerAsyncThunk(data))
	}

	useEffect(() => {
		if (success) {
			toast({
				title:
					'Registration successful. Please check your email to confirm registration',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
			dispatch(clearState())
			navigate('/login')
		}
		if (error) {
			toast({
				title: 'Registration failed',
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
			<Stack spacing={4}>
				<HStack align="start" spacing={4}>
					<FormControl id="username" isInvalid={!!errors.login}>
						<FormLabel color="brand.400">Username</FormLabel>
						<Input
							type="text"
							focusBorderColor="brand.400"
							{...register('login')}
						/>
						<Text color="red.500" fontSize="sm" height="1rem">
							{errors.login?.message}
						</Text>
					</FormControl>
					<FormControl id="fullName" isInvalid={!!errors.fullname}>
						<FormLabel color="brand.400">Full Name</FormLabel>
						<Input
							type="text"
							focusBorderColor="brand.400"
							{...register('fullname')}
						/>
						<Text color="red.500" fontSize="sm" height="1rem">
							{errors.fullname?.message}
						</Text>
					</FormControl>
				</HStack>

				<FormControl id="email" isInvalid={!!errors.email}>
					<FormLabel color="brand.400">Email Address</FormLabel>
					<Input
						type="email"
						focusBorderColor="brand.400"
						{...register('email')}
					/>
					{errors.email && (
						<Text color="red.500" fontSize="sm">
							{errors.email.message}
						</Text>
					)}
				</FormControl>
				<FormControl id="password" isInvalid={!!errors.password}>
					<FormLabel color="brand.400">Password</FormLabel>
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
					{errors.password && (
						<Text color="red.500" fontSize="sm">
							{errors.password.message}
						</Text>
					)}
				</FormControl>
				<FormControl
					id="password_confirm"
					isInvalid={!!errors.password_confirm}
				>
					<FormLabel color="brand.400">Confirm Password</FormLabel>
					<Input
						type="password"
						focusBorderColor="brand.400"
						{...register('password_confirm')}
					/>
					{errors.password_confirm && (
						<Text color="red.500" fontSize="sm">
							{errors.password_confirm.message}
						</Text>
					)}
				</FormControl>
				<Stack spacing={10} pt={2}>
					<Button
						isLoading={loading}
						type="submit"
						bg="brand.400"
						color="white"
						_hover={{ bg: 'brand.500' }}
					>
						Sign Up
					</Button>
				</Stack>
				<Stack pt={6}>
					<Text align="center" color="brand.400">
						Already have an account?{' '}
						<Link color="brand.400" onClick={() => navigate('/login')}>
							Login
						</Link>
					</Text>
				</Stack>
			</Stack>
		</form>
	)
}

export default RegisterForm
