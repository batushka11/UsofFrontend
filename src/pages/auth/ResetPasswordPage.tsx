import { ArrowBackIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
	Box,
	Flex,
	Heading,
	HStack,
	IconButton,
	Stack,
	Text,
	useColorMode
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import ResetPasswordForm from '../../components/auth/ResetPassword'
import Footer from '../../components/footer/Footer'

const ResetPasswordPage: React.FC = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	const navigate = useNavigate()
	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={'brand.50'}
			direction={'column'}
		>
			<Flex align="flex-end" justify="flex-end" w="full">
				<IconButton
					aria-label="Switch color mode"
					icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
					onClick={toggleColorMode}
					variant="ghost"
					size="lg"
				/>
			</Flex>
			<Flex align="center" justify="center" flex="1" w="full">
				<Stack
					spacing={4}
					w={'full'}
					maxW={'md'}
					bg={'brand.0'}
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
			<Box w="100%">
				<Footer />
			</Box>
		</Flex>
	)
}

export default ResetPasswordPage
