import {
	Box,
	Flex,
	HStack,
	Select,
	SimpleGrid,
	Spinner,
	Text,
	useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../../../helpers/axios'
import { Category } from '../../categories/CategoryBoard'
import Pagination from '../../home/Pagination'
import fetchPostsWithDetails, { Post } from '../FetchPosts'
import PostCard from '../post-card/PostCard'

const PostByCategoryBoard: React.FC = () => {
	const toast = useToast()
	const navigate = useNavigate()
	const [category, setCategory] = useState<Category>()
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(false)
	const [totalPages, setTotalPages] = useState(1)
	const { id } = useParams<{ id: string }>()
	const { page } = useParams<{ page: string }>()
	const [size, setSize] = useState<number>(10)

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true)
			try {
				const response = await apiClient.get(
					`/categories/${id}/posts?page=${page}&size=${size}`
				)
				const detailedPosts = await fetchPostsWithDetails(
					`/categories/${id}/posts?page=${page}&size=${size}`
				)

				const responseCategory = await apiClient.get(`/categories/${id}`)
				setCategory(responseCategory.data)
				setPosts(detailedPosts)
				setTotalPages(response.data.totalPages)
				if (detailedPosts.length < 1) {
					toast({
						title: 'Don`t found any posts associated with this category',
						status: 'error',
						duration: 3000,
						isClosable: true
					})
				}
			} catch (error: any) {
			} finally {
				setLoading(false)
			}
		}
		window.scrollTo({ top: 0 })
		fetchPosts()
	}, [page, id, size])

	const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSize(Number(event.target.value))
	}

	return (
		<Box>
			<Text fontSize="3vh" fontWeight="extrabold" mb="4">
				Posts by category: {category?.title}
			</Text>
			<HStack mb="4" justifyContent="flex-end" alignItems="center">
				<Text fontWeight="bold" fontSize="lg">
					Items per page:
				</Text>
				<Select
					value={size}
					onChange={handleSizeChange}
					width="100px"
					size="sm"
					aria-label="Select number of items per page"
				>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={15}>15</option>
					<option value={20}>20</option>
					<option value={25}>25</option>
				</Select>
			</HStack>
			{loading ? (
				<Flex justify="center" align="center" minH="200px">
					<Spinner size="xl" />
				</Flex>
			) : posts.length < 1 ? (
				<Text>None of the posts are associated with this category</Text>
			) : (
				<>
					<SimpleGrid columns={1} spacing="6">
						{posts.map(post => (
							<PostCard key={post.id} post={post} />
						))}
					</SimpleGrid>
					{totalPages > 1 && (
						<Pagination
							currentPage={Number(page)}
							totalPages={totalPages}
							onPageChange={page => navigate(`/category/${id}/posts/${page}`)}
						/>
					)}
				</>
			)}
		</Box>
	)
}

export default PostByCategoryBoard
