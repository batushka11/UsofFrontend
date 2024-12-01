import { Box, Flex, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiClient from '../../../helpers/axios'
import { Category } from '../../categories/CategoryBoard'
import Pagination from '../../home/Pagination'
import fetchPostsWithDetails, { Post } from '../FetchPosts'
import PostCard from '../post-card/PostCard'

const PostByCategoryBoard: React.FC = () => {
	const [category, setCategory] = useState<Category>()
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true)
			try {
				const response = await apiClient.get(
					`/categories/${id}/posts?page=${currentPage}&limit=10`
				)
				const detailedPosts = await fetchPostsWithDetails(
					currentPage,
					`/categories/${id}/posts`
				)

				const responseCategory = await apiClient.get(`/categories/${id}`)
				setCategory(responseCategory.data)
				setPosts(detailedPosts)
				setTotalPages(response.data.totalPages)
			} catch (error: any) {
			} finally {
				setLoading(false)
			}
		}

		fetchPosts()
	}, [currentPage, id])

	return (
		<Box>
			<Text fontSize="3vh" fontWeight="extrabold" mb="2">
				Posts by category: {category?.title}
			</Text>
			{loading ? (
				<Flex justify="center" align="center" minH="200px">
					<Spinner size="xl" />
				</Flex>
			) : posts.length < 1 ? (
				<Text>None one posts associated with this category </Text>
			) : (
				<>
					<SimpleGrid columns={1} spacing="6">
						{posts.map(post => (
							<PostCard key={post.id} post={post} />
						))}
					</SimpleGrid>
					{totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={page => setCurrentPage(page)}
						/>
					)}
				</>
			)}
		</Box>
	)
}

export default PostByCategoryBoard
