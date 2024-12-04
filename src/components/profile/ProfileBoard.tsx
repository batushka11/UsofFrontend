import { Box, Divider, SimpleGrid } from '@chakra-ui/react'
import AchievementsBox from './Achievements'
import BadgesBar from './BadgesBar'
import ProfileFooter from './ProfileFooter'
import ProfileForm from './ProfileForm'
import ProfileHeader from './ProfileHeader'

const ProfileBoard = () => {
	return (
		<Box>
			<SimpleGrid
				columns={{ sm: 1, md: 1, lg: 3, xl: 3 }}
				spacing="6"
				maxHeight="900px"
			>
				<AchievementsBox />
				<Box
					maxW="700px"
					maxH="650px"
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
				<BadgesBar />
			</SimpleGrid>
		</Box>
	)
}

export default ProfileBoard
