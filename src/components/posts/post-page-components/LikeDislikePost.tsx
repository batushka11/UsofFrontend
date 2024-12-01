import { Flex, IconButton, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TiArrowDownOutline, TiArrowUpOutline } from 'react-icons/ti'
import apiClient from '../../../helpers/axios'
import { useAppSelector } from '../../../hooks/reduxHooks'

interface LikeDislikePostProps {
	post: {
		id: string
		rating: number
		status: string
	}
}

const LikeDislikePost: React.FC<LikeDislikePostProps> = ({ post }) => {
	const { user } = useAppSelector(state => state.auth)
	const [rating, setRating] = useState(post.rating)
	const [typeReaction, setTypeReaction] = useState<string | null>(null)
	const toast = useToast()

	useEffect(() => {
		const fetchUserReaction = async () => {
			try {
				const response = await apiClient.get(`/posts/${post.id}/like`)
				const userReaction = response.data.find(
					(data: { authorId: string; type: string }) =>
						data.authorId === user.id
				)
				setTypeReaction(userReaction ? userReaction.type : null)
			} catch (error: any) {
				console.error(error)
			}
		}

		fetchUserReaction()
	}, [post.id, user.id])

	const handleClick = async (type: string) => {
		try {
			const responseLikes = await apiClient.get(`/posts/${post.id}/like`)
			const userReaction = responseLikes.data.find(
				(data: { authorId: string; type: string }) => data.authorId === user.id
			)

			if (!userReaction) {
				await apiClient.post(`/posts/${post.id}/like`, { type })
				setTypeReaction(type)
			} else if (userReaction.type !== type) {
				await apiClient.delete(`/posts/${post.id}/like`)
				await apiClient.post(`/posts/${post.id}/like`, { type })
				setTypeReaction(type)
			} else {
				setTypeReaction(null)
				await apiClient.delete(`/posts/${post.id}/like`)
			}

			const responseRating = await apiClient.get(`/posts/${post.id}/rating`)
			setRating(responseRating.data)
		} catch (error: any) {
			toast({
				title: error.response?.data?.message,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}

	return (
		<Flex flexDirection="row" alignItems="center" marginRight={4}>
			<IconButton
				isDisabled={post.status !== 'ACTIVE'}
				aria-label="Upvote"
				icon={<TiArrowUpOutline />}
				fontSize="24px"
				variant="ghost"
				color={typeReaction === 'LIKE' ? 'green.500' : 'brand.400'}
				onClick={() => handleClick('LIKE')}
			/>
			<Text fontWeight="bold" fontSize="lg" color="brand.400">
				{rating}
			</Text>
			<IconButton
				isDisabled={post.status !== 'ACTIVE'}
				aria-label="Downvote"
				icon={<TiArrowDownOutline />}
				fontSize="24px"
				variant="ghost"
				color={typeReaction === 'DISLIKE' ? 'red.500' : 'brand.400'}
				onClick={() => handleClick('DISLIKE')}
			/>
		</Flex>
	)
}

export default LikeDislikePost
