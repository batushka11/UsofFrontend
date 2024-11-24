'use client'

import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const ConfirmAccount: React.FC = () => {
	const navigate = useNavigate()

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

export default ConfirmAccount
