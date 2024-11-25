import { Button, FormControl, Input, Stack, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { clearState } from '../../redux/auth/authSlice'
import { resetPasswordAsyncThunk } from '../../redux/auth/authThunks'

const ResetPasswordForm: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const toast = useToast()
	const { loading, success, error } = useAppSelector(state => state.auth)

	const { register, handleSubmit } = useForm()

	const onSubmit = (data: any) => {
		dispatch(resetPasswordAsyncThunk(data))
	}

	useEffect(() => {
		if (success) {
			toast({
				title:
					'Password reset send successfully. Please check\n your email to continue',
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
			<FormControl id="email">
				<Input
					placeholder="your-email@example.com"
					_placeholder={{ color: 'brand.200' }}
					type="email"
					focusBorderColor="brand.400"
					{...register('email')}
				/>
			</FormControl>
			<Stack spacing={6} pt={6}>
				<Button
					isLoading={loading}
					type="submit"
					bg={'brand.400'}
					color={'white'}
					_hover={{
						bg: 'brand.500'
					}}
				>
					Request Reset
				</Button>
			</Stack>
		</form>
	)
}

export default ResetPasswordForm
