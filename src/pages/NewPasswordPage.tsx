import { Box, Flex, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import Logo from '../components/Logo'
import NewPasswordForm from '../components/auth/NewPassword'

const NewPasswordPage: React.FC = () => {
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
				<NewPasswordForm></NewPasswordForm>
			</Box>
		</Flex>
	)
}

export default NewPasswordPage
