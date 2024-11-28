import { Box, Flex, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import apiClient from '../../../helpers/axios'
import Pagination from '../../home/Pagination'
import fetchPostsWithDetails, { Post } from '../FetchPosts'
import PostCard from '../post-card/PostCard'

const SubscribesPostsBoard: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true)
			try {
				const response = await apiClient.get(
					`/users/subscribe?page=${currentPage}&limit=10`
				)
				const detailedPosts = await fetchPostsWithDetails(
					currentPage,
					'/users/subscribe'
				)
				setPosts(detailedPosts)
				setTotalPages(response.data.totalPages)
			} catch (error: any) {
			} finally {
				setLoading(false)
			}
		}

		fetchPosts()
	}, [currentPage])

	return (
		<Box>
			<Text fontSize="3vh" fontWeight="extrabold" mb="2">
				Subscribes
			</Text>
			{loading ? (
				<Flex justify="center" align="center" minH="200px">
					<Spinner size="xl" />
				</Flex>
			) : posts.length < 1 ? (
				<Text>You don't have any posts in a subscribes</Text>
			) : (
				<>
					<SimpleGrid columns={1} spacing="6">
						{posts.map(post => (
							<PostCard key={post.id} post={post} />
						))}
					</SimpleGrid>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={page => setCurrentPage(page)}
					/>
				</>
			)}
		</Box>
	)
}

export default SubscribesPostsBoard
