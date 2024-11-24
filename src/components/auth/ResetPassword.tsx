import { ArrowBackIcon } from '@chakra-ui/icons'
import {
	Button,
	Flex,
	FormControl,
	Heading,
	HStack,
	IconButton,
	Input,
	Stack,
	Text,
	useToast
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
	clearState,
	resetPassword
} from '../../redux/authSlices/resetPasswordSlice'

const ResetPassword: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const toast = useToast()
	const { loading, success, error } = useAppSelector(
		state => state.passwordReset
	)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const onSubmit = (data: any) => {
		dispatch(resetPassword(data))
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
		<Flex minH={'100vh'} align={'center'} justify={'center'} bg={'brand.50'}>
			<Stack
				spacing={4}
				w={'full'}
				maxW={'md'}
				bg={'white'}
				rounded={'xl'}
				boxShadow={'lg'}
				p={6}
				my={12}
			>
				<IconButton
					icon={<ArrowBackIcon />}
					aria-label="Go back"
					onClick={() => navigate('/login')}
					variant="ghost"
					size="md"
					color="brand.400"
					_hover={{ bg: 'brand.100' }}
					width="15px"
				/>
				<HStack>
					<Heading
						lineHeight={1.1}
						fontSize={{ base: '2xl', md: '3xl' }}
						color={'brand.400'}
					>
						Forgot your password?
					</Heading>
				</HStack>
				<Text fontSize={{ base: 'sm', sm: 'md' }} color={'brand.300'}>
					You&apos;ll get an email with a reset link
				</Text>
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
			</Stack>
		</Flex>
	)
}

export default ResetPassword
