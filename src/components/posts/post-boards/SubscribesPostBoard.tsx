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
import { useNavigate, useParams } from 'react-router-dom'
import ReactSelect, { MultiValue } from 'react-select'
import apiClient from '../../../helpers/axios'
import Pagination from '../../home/Pagination'
import fetchPostsWithDetails, { Post } from '../FetchPosts'
import PostCard from '../post-card/PostCard'

const SubscribesPostsBoard: React.FC = () => {
	const navigate = useNavigate()
	const toast = useToast()
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(false)
	const { id } = useParams<{ id: string }>()
	const [totalPages, setTotalPages] = useState(1)
	const [categories, setCategories] = useState<
		{ label: string; value: string }[]
	>([])
	const [filters, setFilters] = useState({
		title: '',
		startDate: '',
		endDate: '',
		categories: [] as string[],
		sortBy: '',
		order: '',
		limit: ''
	})

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
					size: filters.limit,
					...(filters.title && { title: filters.title }),
					...(filters.startDate && { 'date[start]': filters.startDate }),
					...(filters.endDate && { 'date[end]': filters.endDate }),
					...(filters.sortBy && { sortBy: filters.sortBy }),
					...(filters.order && { order: filters.order })
				})

				filters.categories.forEach(category => {
					queryParams.append('category', category)
				})

				const response = await apiClient.get(
					`/users/subscribe?${queryParams.toString()}`
				)
				const detailedPosts = await fetchPostsWithDetails(
					`/users/subscribe?${queryParams.toString()}`
				)
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
		window.scrollTo({ top: 0 })
		fetchPosts()
	}, [id, filters, toast])

	const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFilters(prevFilters => ({
			...prevFilters,
			[e.target.name]: e.target.value
		}))
	}

	const handleCategoryChange = (
		selectedOptions: MultiValue<{ label: string; value: string }>
	) => {
		setFilters(prevFilters => ({
			...prevFilters,
			categories: selectedOptions.map(option => {
				const category = categories.find(c => c.value === option.value)
				return category ? category.label : ''
			})
		}))
	}

	const resetFilters = () => {
		setFilters({
			title: '',
			startDate: '',
			endDate: '',
			categories: [],
			sortBy: '',
			order: '',
			limit: ''
		})
	}

	return (
		<Box>
			<Text fontSize="3vh" fontWeight="extrabold" mb="4" textAlign="center">
				Subscribes
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
					placeholder="Search by title"
					name="title"
					value={filters.title}
					onChange={handleFilterChange}
				/>
				<Input
					type="date"
					name="startDate"
					value={filters.startDate}
					onChange={handleFilterChange}
				/>
				<Input
					type="date"
					name="endDate"
					value={filters.endDate}
					onChange={handleFilterChange}
				/>
				<Box width="400px">
					<ReactSelect
						options={categories}
						isMulti
						onChange={handleCategoryChange}
						placeholder="Select categories"
					/>
				</Box>
				<Select
					placeholder="Sort by"
					name="sortBy"
					value={filters.sortBy}
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
					value={filters.order}
					onChange={handleFilterChange}
					width="120px"
				>
					<option value="asc">Ascending</option>
					<option value="desc">Descending</option>
				</Select>
				<Select
					placeholder="Posts per page"
					name="limit"
					value={filters.limit}
					onChange={handleFilterChange}
					width="150px"
				>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="50">50</option>
				</Select>
				<Flex gap="2">
					<Button
						colorScheme="brand"
						color="white"
						onClick={() => setFilters({ ...filters })}
					>
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
			) : posts.length < 1 ? (
				<Text>You don't have any posts in subscribes</Text>
			) : (
				<>
					<SimpleGrid columns={1} spacing="6">
						{posts.map(post => (
							<PostCard key={post.id} post={post} />
						))}
					</SimpleGrid>
					{totalPages > 1 && (
						<Pagination
							currentPage={Number(id)}
							totalPages={totalPages}
							onPageChange={page => navigate(`/subscribes/${page}`)}
						/>
					)}
				</>
			)}
		</Box>
	)
}

export default SubscribesPostsBoard
