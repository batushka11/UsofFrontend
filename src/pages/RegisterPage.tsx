import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Logo from '../components/Logo'
import RegisterForm from '../components/auth/RegisterForm'

const RegisterPage: React.FC = () => {
	return (
		<Flex height="100vh" align="center" justify="center" bg="brand.50" px={4}>
			<Box
				rounded="lg"
				bg="white"
				boxShadow="lg"
				p={8}
				width={{ base: 'full', md: 'lg' }}
			>
				<VStack mb={8} align="center">
					<Box mb={-2}>
						<Logo />
					</Box>
					<Heading fontSize="4xl" textAlign="center" color="brand.400">
						Sign Up
					</Heading>
					<Text fontSize="lg" color="brand.300">
						to enjoy all of our cool features ✌️
					</Text>
				</VStack>
				<RegisterForm />
			</Box>
		</Flex>
	)
}

export default RegisterPage
