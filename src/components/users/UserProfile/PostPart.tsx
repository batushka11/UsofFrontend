import {
	Box,
	Flex,
	SimpleGrid,
	Spinner,
	Text,
	useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../../../helpers/axios'
import Pagination from '../../home/Pagination'
import fetchPostsWithDetails, { Post } from '../../posts/FetchPosts'
import PostCard from '../../posts/post-card/PostCard'

const PostsPart: React.FC = () => {
	const navigate = useNavigate()
	const toast = useToast()
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(false)
	const { id } = useParams<{ id: string }>()
	const { pageN } = useParams<{ pageN: string }>()
	const [totalPages, setTotalPages] = useState(1)

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true)
			try {
				const response = await apiClient.get(
					`/users/${id}/posts?page=${pageN}&size=5`
				)
				const detailedPosts = await fetchPostsWithDetails(
					`/users/${id}/posts?page=${pageN}&size=5`
				)
				setPosts(detailedPosts)
				setTotalPages(response.data.totalPages)
			} catch (error: any) {
			} finally {
				setLoading(false)
			}
		}

		fetchPosts()
	}, [id, toast, pageN])

	return (
		<Box>
			<Text fontSize="3vh" fontWeight="extrabold" mb="4" mt="4">
				User posts
			</Text>
			{loading ? (
				<Flex justify="center" align="center" minH="200px">
					<Spinner size="xl" />
				</Flex>
			) : posts.length < 1 ? (
				<Text fontSize="2vh" fontWeight="normal" mb="4" mt="4">
					User don't have any posts
				</Text>
			) : (
				<>
					<SimpleGrid columns={1} spacing="6">
						{posts.map(post => (
							<PostCard key={post.id} post={post} />
						))}
					</SimpleGrid>
					{totalPages > 1 && (
						<Pagination
							currentPage={Number(pageN)}
							totalPages={totalPages}
							onPageChange={page => navigate(`/user/${id}/posts/${page}`)}
						/>
					)}
				</>
			)}
		</Box>
	)
}

export default PostsPart
