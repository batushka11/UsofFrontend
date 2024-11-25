import {
	Box,
	Button,
	Flex,
	Heading,
	Stack,
	Text,
	useToast
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { confirmAccountAsyncThunk } from '../../redux/auth/authThunks'

const ConfirmAccountForm: React.FC = () => {
	const { token } = useParams<{ token: string }>()
	const navigate = useNavigate()
	const toast = useToast()
	const { loading, success, error } = useAppSelector(state => state.auth)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(confirmAccountAsyncThunk(token as string))
	}, [token, dispatch])

	useEffect(() => {
		if (success) {
			toast({
				title: 'Confirm account successful.',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
		}
		if (error) {
			toast({
				title: 'Confirm failed',
				description: error,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}, [success, error, dispatch, toast, navigate])

	return (
		<Flex minH="100vh" align="center" justify="center" bg="brand.50" px={4}>
			<Box
				bg="white"
				boxShadow="lg"
				rounded="lg"
				p={8}
				textAlign="center"
				width={{ base: 'full', md: 'lg' }}
			>
				<Stack spacing={4}>
					<Heading as="h2" size="lg" color="brand.400">
						Account Created Successfully!
					</Heading>
					<Text color="brand.300" fontSize="md">
						Your account has been successfully created. You can now log in to
						start using the platform.
					</Text>
					<Stack direction="row" justify="center" spacing={6} pt={4}>
						<Button
							colorScheme="brand"
							bg="brand.400"
							color="white"
							_hover={{ bg: 'brand.500' }}
							onClick={() => navigate('/login')}
						>
							Go to Login
						</Button>
						<Button
							variant="outline"
							color="brand.400"
							borderColor="brand.400"
							_hover={{ bg: 'brand.100', borderColor: 'brand.500' }}
							onClick={() => navigate('/')}
						>
							Back to Home
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Flex>
	)
}

export default ConfirmAccountForm
