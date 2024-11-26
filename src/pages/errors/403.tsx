import { Box, Button, Center, Heading, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ForbiddenPage = () => {
	return (
		<Box
			bg="brand.50"
			h="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			flexDirection="column"
			p={4}
		>
			<Image
				src="https://speakaboutit.s3.eu-north-1.amazonaws.com/9bn72k.gif"
				alt="403 Forbidden"
				boxSize="300px"
				mb={6}
				borderRadius="lg"
				border="4px solid"
				borderColor="brand.100"
			/>
			<Heading as="h1" size="2xl" mb={4} color="brand.400">
				403 - Access Forbidden
			</Heading>
			<Text fontSize="lg" textAlign="center" color="brand.300" mb={6}>
				You don't have permission to view this page. Please check your access
				rights or contact the administrator.
			</Text>
			<Center>
				<Button
					as={Link}
					to="/"
					bg="brand.400"
					color="white"
					_hover={{ bg: 'brand.300' }}
				>
					Back to Homepage
				</Button>
			</Center>
		</Box>
	)
}

export default ForbiddenPage
