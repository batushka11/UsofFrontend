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
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { clearState } from '../../redux/auth/authSlice'
import { registerAsyncThunk } from '../../redux/auth/authThunks'

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
	} = useForm()

	const onSubmit = (data: any) => {
		dispatch(registerAsyncThunk(data))
	}

	useEffect(() => {
		if (success) {
			toast({
				title:
					'Registration successful. Please check your \n email to confirm registration',
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
				<HStack>
					<FormControl id="username" isRequired>
						<FormLabel color="brand.400">Username</FormLabel>
						<Input
							type="text"
							focusBorderColor="brand.400"
							{...register('login')}
						/>
					</FormControl>
					<FormControl id="fullName" isRequired>
						<FormLabel color="brand.400">Full Name</FormLabel>
						<Input
							type="text"
							focusBorderColor="brand.400"
							{...register('fullname')}
						/>
					</FormControl>
				</HStack>
				<FormControl id="email" isRequired>
					<FormLabel color="brand.400">Email Address</FormLabel>
					<Input
						type="email"
						focusBorderColor="brand.400"
						{...register('email')}
					/>
				</FormControl>
				<FormControl id="password" isRequired>
					<FormLabel color="brand.400">Password</FormLabel>
					<InputGroup>
						<Input
							type={showPassword ? 'text' : 'password'}
							focusBorderColor="brand.400"
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 8,
									message: 'Password must be at least 8 characters'
								}
							})}
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
							{String(errors.password.message)}
						</Text>
					)}
				</FormControl>
				<FormControl id="password_confirm" isRequired>
					<FormLabel color="brand.400">Confirm Password</FormLabel>
					<Input
						type="password"
						focusBorderColor="brand.400"
						{...register('password_confirm', {
							required: 'Please confirm your password'
						})}
					/>
					{errors.password_confirm && (
						<Text color="red.500" fontSize="sm">
							{String(errors.password_confirm.message)}
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
