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
	Text,
	useToast,
	VStack
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { newPassword } from '../../redux/authSlices/newPasswordSlice'
import { clearState } from '../../redux/authSlices/registerSlice'
import Logo from '../Logo'

const NewPassword: React.FC = () => {
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const toast = useToast()
	const { loading, success, error } = useAppSelector(state => state.newPassword)

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const password = watch('password', '')

	const onSubmit = (data: any) => {
		dispatch(newPassword(data))
	}

	useEffect(() => {
		if (success) {
			toast({
				title: 'Password reset success.',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
			dispatch(clearState())
			navigate('/login')
		}
		if (error) {
			toast({
				title: 'Password reset failed',
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
				p={8}
				width={{ base: 'full', md: 'lg' }}
			>
				<VStack mb={8} align="center">
					<Box mb={4}>
						<Logo />
					</Box>
					<Heading fontSize="4xl" textAlign="center" color="brand.400">
						Reset Password
					</Heading>
				</VStack>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl id="password" isRequired>
						<FormLabel color="brand.400">Password</FormLabel>
						<InputGroup>
							<Input
								type={showPassword ? 'text' : 'password'}
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

					<FormControl id="password_confirm" isRequired mt={4}>
						<FormLabel color="brand.400">Confirm Password</FormLabel>
						<InputGroup>
							<Input
								type={showConfirmPassword ? 'text' : 'password'}
								{...register('password_confirm', {
									required: 'Please confirm your password',
									validate: value =>
										value === password || 'Passwords do not match'
								})}
							/>
							<InputRightElement>
								<Button
									variant="ghost"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								>
									{showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>
						{errors.password_confirm && (
							<Text color="red.500" fontSize="sm">
								{String(errors.password_confirm.message)}
							</Text>
						)}
					</FormControl>

					<Button
						mt={6}
						bg={'brand.400'}
						width="full"
						type="submit"
						color="white"
						_hover={{ bg: 'brand.500' }}
					>
						Reset Password
					</Button>
				</form>
			</Box>
		</Flex>
	)
}

export default NewPassword
