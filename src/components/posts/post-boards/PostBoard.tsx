import {
	Box,
	Button,
	Flex,
	Input,
	Select,
	SimpleGrid,
	Spinner,
	Text,
	useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ReactSelect, { MultiValue } from 'react-select'
import apiClient from '../../../helpers/axios'
import { useAppSelector } from '../../../hooks/reduxHooks'
import Pagination from '../../home/Pagination'
import fetchPostsWithDetails, { Post } from '../FetchPosts'
import PostCard from '../post-card/PostCard'

const PostsBoard: React.FC = () => {
	const { user } = useAppSelector(state => state.auth)
	const navigate = useNavigate()
	const toast = useToast()
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(false)
	const { id } = useParams<{ id: string }>()
	const [totalPages, setTotalPages] = useState(1)
	const [categories, setCategories] = useState<
		{ label: string; value: string }[]
	>([])
	const [searchParams] = useSearchParams()
	const titleParam = searchParams.get('title') || ''
	const defaultFilters = {
		title: '',
		status: '',
		startDate: '',
		endDate: '',
		categories: [] as string[],
		sortBy: 'publishAt',
		order: 'desc',
		limit: ''
	}
	const [filters, setFilters] = useState(defaultFilters)
	const [draftFilters, setDraftFilters] = useState(defaultFilters)

	useEffect(() => {
		if (titleParam) {
			setFilters(prevFilters => ({ ...prevFilters, title: titleParam }))
		}
	}, [titleParam])

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await apiClient.get('/categories')
				setCategories(
					response.data.map((category: { id: string; title: string }) => ({
						label: category.title,
						value: category.id
					}))
				)
			} catch (error: any) {
				toast({
					title: error?.response?.data?.message || 'Failed to load categories',
					status: 'error',
					duration: 3000,
					isClosable: true
				})
			}
		}
		fetchCategories()
	}, [toast])

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true)
			try {
				const queryParams = new URLSearchParams({
					page: id || '1',
					size: filters.limit || '10',
					...(filters.title && { title: filters.title.trim() }),
					...(filters.status && { status: filters.status }),
					...(filters.startDate && { 'date[start]': filters.startDate }),
					...(filters.endDate && { 'date[end]': filters.endDate }),
					...(filters.sortBy && { sortBy: filters.sortBy }),
					...(filters.order && { order: filters.order })
				})

				filters.categories.forEach(category => {
					queryParams.append('category', category)
				})

				const response = await apiClient.get(`/posts?${queryParams.toString()}`)
				const detailedPosts = await fetchPostsWithDetails(
					`/posts?${queryParams.toString()}`
				)
				setPosts(detailedPosts)
				setTotalPages(response.data.totalPages)
				if (detailedPosts.length < 1) {
					toast({
						title: 'Don`t found anyone posts',
						status: 'error',
						duration: 3000,
						isClosable: true
					})
				}
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
		window.scrollTo({ top: 0 })
		fetchPosts()
	}, [id, filters, toast])

	const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setDraftFilters(prevDraftFilters => ({
			...prevDraftFilters,
			[e.target.name]: e.target.value
		}))
	}

	const handleCategoryChange = (
		selectedOptions: MultiValue<{ label: string; value: string }>
	) => {
		setDraftFilters(prevDraftFilters => ({
			...prevDraftFilters,
			categories: selectedOptions.map(option => {
				const category = categories.find(c => c.value === option.value)
				return category ? category.label : ''
			})
		}))
	}

	const applyFilters = () => {
		setFilters(draftFilters)
	}

	const resetFilters = () => {
		setDraftFilters(defaultFilters)
		setFilters(defaultFilters)
		window.history.replaceState(null, '', '/home/1')
	}

	return (
		<Box>
			<Text fontSize="3vh" fontWeight="extrabold" mb="4" textAlign="center">
				Welcome to the Speak About It
			</Text>

			<Flex
				flexWrap="wrap"
				gap="4"
				p="4"
				bg="brand.0"
				borderRadius="md"
				justifyContent="center"
				alignItems="center"
				mb="6"
			>
				<Input
					placeholder={filters.title !== '' ? filters.title : 'Search by title'}
					name="title"
					value={draftFilters.title}
					onChange={handleFilterChange}
				/>
				<Flex direction="row" align="center" width="100%" gap="10px">
					<Text width="auto" flexShrink={0}>
						Start date
					</Text>
					<Input
						placeholder="Start date"
						type="date"
						name="startDate"
						value={draftFilters.startDate}
						onChange={handleFilterChange}
						flex="1"
					/>
				</Flex>
				<Flex direction="row" align="center" width="100%" gap="10px">
					<Text width="auto" flexShrink={0} mr="2">
						End date
					</Text>
					<Input
						placeholder="End date"
						type="date"
						name="endDate"
						value={draftFilters.endDate}
						onChange={handleFilterChange}
						flex="1"
					/>
				</Flex>
				<Box width="400px">
					<ReactSelect
						options={categories}
						isMulti
						onChange={handleCategoryChange}
						placeholder="Select categories"
					/>
				</Box>
				{user.role === 'ADMIN' && (
					<Select
						placeholder="Status"
						name="status"
						value={draftFilters.status}
						onChange={handleFilterChange}
						width="150px"
					>
						<option value="ACTIVE">Active</option>
						<option value="INACTIVE">Inactive</option>
					</Select>
				)}
				<Select
					placeholder="Sort by"
					name="sortBy"
					value={draftFilters.sortBy}
					onChange={handleFilterChange}
					width="150px"
				>
					<option value="publishAt">Publish Date</option>
					<option value="rating">Rating</option>
					<option value="title">Title</option>
				</Select>
				<Select
					placeholder="Order"
					name="order"
					value={draftFilters.order}
					onChange={handleFilterChange}
					width="120px"
				>
					<option value="asc">Ascending</option>
					<option value="desc">Descending</option>
				</Select>
				<Select
					placeholder="Posts per page"
					name="limit"
					value={draftFilters.limit}
					onChange={handleFilterChange}
					width="150px"
				>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="50">50</option>
				</Select>
				<Flex gap="2">
					<Button colorScheme="brand" color="white" onClick={applyFilters}>
						Apply Filters
					</Button>
					<Button colorScheme="gray" onClick={resetFilters}>
						Reset Filters
					</Button>
				</Flex>
			</Flex>

			{loading ? (
				<Flex justify="center" align="center" minH="200px">
					<Spinner size="xl" />
				</Flex>
			) : (
				<>
					<SimpleGrid columns={[1]} spacing="6">
						{posts.map(post => (
							<PostCard key={post.id} post={post} />
						))}
					</SimpleGrid>
					{totalPages > 1 && (
						<Pagination
							currentPage={Number(id)}
							totalPages={totalPages}
							onPageChange={page => navigate(`/home/${page}`)}
						/>
					)}
				</>
			)}
		</Box>
	)
}

export default PostsBoard
