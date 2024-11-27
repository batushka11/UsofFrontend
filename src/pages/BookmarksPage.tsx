import { Flex } from '@chakra-ui/react'
import BookmarkPostsBoard from '../components/bookmarks/BookmarkPostBoard'
import Footer from '../components/footer/Footer'
import SidebarWithHeader from '../components/home/SidebarWithHeader'

const BookmarksPage: React.FC = () => {
	return (
		<Flex direction="column" minH="100vh" bg="brand.50">
			<SidebarWithHeader content=<BookmarkPostsBoard /> height="100vh" />
			<Footer />
		</Flex>
	)
}

export default BookmarksPage
