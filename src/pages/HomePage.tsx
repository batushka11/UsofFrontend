import { Flex } from '@chakra-ui/react'
import Footer from '../components/footer/Footer'
import SidebarWithHeader from '../components/home/SidebarWithHeader'
import PostsBoard from '../components/posts/PostBoard'

const HomePage: React.FC = () => {
	return (
		<Flex direction="column" minH="100vh" bg="brand.50">
			<SidebarWithHeader content=<PostsBoard /> height="100vh" />
			<Footer />
		</Flex>
	)
}

export default HomePage
