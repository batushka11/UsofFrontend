import { ArrowBackIcon } from '@chakra-ui/icons'
import {
	Flex,
	Heading,
	HStack,
	IconButton,
	Stack,
	Text
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import ResetPasswordForm from '../components/auth/ResetPassword'

const ResetPasswordPage: React.FC = () => {
	const navigate = useNavigate()
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
				<ResetPasswordForm></ResetPasswordForm>
			</Stack>
		</Flex>
	)
}

export default ResetPasswordPage
