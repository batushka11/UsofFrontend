import { Box, Flex, SimpleGrid, Spinner, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import apiClient from '../../helpers/axios'
import Pagination from '../home/Pagination'
import PostCard from '../post-card/PostCard'
import fetchPostsWithDetails, { Post } from './FetchPosts'

const PostsBoard: React.FC = () => {
	const toast = useToast()
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true)
			try {
				const response = await apiClient.get(
					`/posts?page=${currentPage}&limit=10`
				)
				const detailedPosts = await fetchPostsWithDetails(currentPage, '/posts')
				setPosts(detailedPosts)
				setTotalPages(response.data.totalPages)
			} catch (error: any) {
				toast({
					title: error.response?.data?.message,
					status: 'error',
					duration: 3000,
					isClosable: true
				})
			} finally {
				setLoading(false)
			}
		}

		fetchPosts()
	}, [currentPage])

	return (
		<Box>
			{loading ? (
				<Flex justify="center" align="center" minH="200px">
					<Spinner size="xl" />
				</Flex>
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

export default PostsBoard
