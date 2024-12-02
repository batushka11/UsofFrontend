import {
	Box,
	Button,
	Center,
	Divider,
	Flex,
	Heading,
	Spinner,
	Stack,
	Tag,
	Tooltip
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import apiClient from '../../../helpers/axios'
import { chakraMarkdownComponents } from '../../../helpers/MarkDownHelper'
import { useAppSelector } from '../../../hooks/reduxHooks'
import MenuActions from '../post-card/PostCardMenuAction'
import DeletePost from '../post-operations/PostDelete'
import UpdatePost from '../post-operations/PostUpdate'
import CommentsSection from './CommentsSection'
import LikeDislikePost from './LikeDislikePost'
import PostPageHeader from './PostPageHeader'

interface Category {
	category: {
		id: number
		title: string
		description: string
		createdAt: string
	}
}

const PostPageBoard: React.FC = () => {
	const navigate = useNavigate()
	const { user } = useAppSelector(state => state.auth)
	const [post, setPost] = useState<any>(null)
	const [author, setAuthor] = useState<any>(null)
	const [categories, setCategories] = useState<Category[]>([])
	const [loading, setLoading] = useState(true)
	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const postResponse = await apiClient.get(`/posts/${id}`)
				const authorResponse = await apiClient.get(
					`/users/${postResponse.data.authorId}`
				)
				const categoriesResponse = await apiClient.get(
					`/posts/${id}/categories`
				)

				setPost(postResponse.data)
				setAuthor(authorResponse.data)
				setCategories(categoriesResponse.data)
				setLoading(false)
			} catch (error) {
				setLoading(false)
			}
		}
		fetchData()
	}, [id])

	if (loading) {
		return (
			<Center height="100vh">
				<Spinner size="xl" />
			</Center>
		)
	}

	return (
		<Box maxWidth="1200px" margin="0 auto" padding={6}>
			<Button
				bg="brand.200"
				color="brand.400"
				_hover={{ bg: 'brand.300', color: 'bg.500' }}
				onClick={() => navigate(-1)}
			>
				Back
			</Button>
			<PostPageHeader author={author} post={post} />
			<Box
				width="100%"
				padding={6}
				backgroundColor="brand.50"
				borderRadius="md"
				shadow="lg"
			>
				<Flex justify="space-between" align="flex-start" marginBottom={4}>
					<Heading size="lg" textAlign="left" color="brand.400">
						{post?.title}
					</Heading>
					<Box mt="10">
						<MenuActions post={post} />
					</Box>
				</Flex>
				<Stack direction="row" spacing="2" mb="4">
					{categories.map(categoryWrapper => (
						<Tooltip
							key={categoryWrapper.category.id}
							label={categoryWrapper.category.description}
							fontSize="sm"
							bg="brand.200"
							color="brand.500"
							borderRadius="5px"
						>
							<Tag bg="brand.500" color="white" fontSize="sm" cursor="pointer">
								{categoryWrapper.category.title}
							</Tag>
						</Tooltip>
					))}
				</Stack>
				<Box ml="4" mr="4" bg="brand.50" mb="4">
					<Markdown
						remarkPlugins={[remarkGfm]}
						components={chakraMarkdownComponents}
					>
						{post?.content}
					</Markdown>
				</Box>
				<Flex justifyContent="space-between" flexDirection="row">
					<LikeDislikePost post={post} />
					{(post.authorId === user.id || user.role === 'ADMIN') && (
						<Flex direction="row">
							<UpdatePost initialSelectedCategories={categories} post={post} />
							<DeletePost id={post.id} />
						</Flex>
					)}
				</Flex>
			</Box>

			<Divider marginY={8} color="brand.200" />

			<CommentsSection post={post} />
		</Box>
	)
}

export default PostPageBoard
