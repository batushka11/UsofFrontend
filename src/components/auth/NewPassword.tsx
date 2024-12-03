import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useToast
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { clearState } from '../../redux/auth/authSlice'
import { newPasswordAsyncThunk } from '../../redux/auth/authThunks'

const passwordSchema = z
	.object({
		password: z.string().min(8, 'Password must be at least 8 characters long'),
		password_confirm: z.string()
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.password_confirm) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['password_confirm']
			})
		}
	})

type PasswordFormInputs = z.infer<typeof passwordSchema>

const NewPasswordForm: React.FC = () => {
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const toast = useToast()
	const { loading, success, error } = useAppSelector(state => state.auth)
	const { token } = useParams<{ token: string }>()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<PasswordFormInputs>({
		resolver: zodResolver(passwordSchema)
	})

	const onSubmit = (data: PasswordFormInputs) => {
		dispatch(
			newPasswordAsyncThunk({ token: token as string, password: data.password })
		)
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
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl id="password" isRequired>
				<FormLabel color="brand.400">Password</FormLabel>
				<InputGroup>
					<Input
						type={showPassword ? 'text' : 'password'}
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

			<FormControl id="password_confirm" isRequired mt={4}>
				<FormLabel color="brand.400">Confirm Password</FormLabel>
				<InputGroup>
					<Input
						type={showConfirmPassword ? 'text' : 'password'}
						{...register('password_confirm')}
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
						{errors.password_confirm.message}
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
				isLoading={loading}
			>
				Reset Password
			</Button>
		</form>
	)
}

export default NewPasswordForm
