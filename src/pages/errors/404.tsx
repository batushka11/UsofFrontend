import { Box, Button, Center, Heading, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
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
				src="https://speakaboutit.s3.eu-north-1.amazonaws.com/404.jpg"
				alt="Lost in Space"
				boxSize="300px"
				mb={6}
				borderRadius="lg"
			/>
			<Heading as="h1" size="2xl" mb={4} color="brand.400">
				404 - Page Not Found
			</Heading>
			<Text fontSize="lg" textAlign="center" color="brand.300" mb={6}>
				Oops! The page you are looking for does not exist. It might have been
				moved or removed.
			</Text>
			<Center>
				<Button
					as={Link}
					to="/"
					bg="brand.400"
					color="white"
					_hover={{ bg: 'brand.300' }}
				>
					Go Back Home
				</Button>
			</Center>
		</Box>
	)
}

export default NotFoundPage
