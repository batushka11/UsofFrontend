import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
	Box,
	Flex,
	Heading,
	IconButton,
	useColorMode,
	VStack
} from '@chakra-ui/react'
import React from 'react'
import Logo from '../../components/Logo'
import NewPasswordForm from '../../components/auth/NewPassword'
import Footer from '../../components/footer/Footer'

const NewPasswordPage: React.FC = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Flex
			height="100vh"
			align="center"
			justify="center"
			bg="brand.50"
			direction="column"
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
				<Box
					rounded="lg"
					bg="brand.800"
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
					<NewPasswordForm></NewPasswordForm>
				</Box>
			</Flex>
			<Box w="100%">
				<Footer />
			</Box>
		</Flex>
	)
}

export default NewPasswordPage
