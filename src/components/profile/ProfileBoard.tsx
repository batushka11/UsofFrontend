import { Box, Divider } from '@chakra-ui/react'
import ProfileFooter from './ProfileFooter'
import ProfileForm from './ProfileForm'
import ProfileHeader from './ProfileHeader'

const ProfileBoard = () => {
	return (
		<Box
			maxW="700px"
			mx="auto"
			p="6"
			bg="brand.700"
			boxShadow="2xl"
			borderRadius="lg"
		>
			<ProfileHeader />

			<Divider borderColor="brand.100" mb="6" />

			<ProfileForm />

			<Divider borderColor="brand.100" my="6" />

			<ProfileFooter />
		</Box>
	)
}

export default ProfileBoard
