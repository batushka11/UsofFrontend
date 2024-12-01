import { Flex } from '@chakra-ui/react'
import Footer from '../components/footer/Footer'
import SidebarWithHeader from '../components/home/SidebarWithHeader'
interface PageType {
	content: React.ReactNode
	height: string | number
}

const Page: React.FC<PageType> = ({ content, height }) => {
	window.scrollTo({ top: 0 })
	return (
		<Flex direction="column" minH="100vh" bg="brand.50">
			<SidebarWithHeader content={content} height={height} />
			<Footer />
		</Flex>
	)
}

export default Page
