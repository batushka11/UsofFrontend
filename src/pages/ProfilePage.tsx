import { Flex } from '@chakra-ui/react'
import Footer from '../components/footer/Footer'
import SidebarWithHeader from '../components/home/SidebarWithHeader'
import ProfileBoard from '../components/profile/ProfileBoard'

const ProfilePage: React.FC = () => {
	return (
		<Flex direction="column" minH="100vh" bg="brand.50">
			<SidebarWithHeader
				content=<ProfileBoard />
				height="calc(100vh - 106px)"
			/>
			<Footer />
		</Flex>
	)
}

export default ProfilePage
