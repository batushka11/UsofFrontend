import { Flex, IconButton, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TiArrowDownOutline, TiArrowUpOutline } from 'react-icons/ti'
import apiClient from '../../../helpers/axios'
import { useAppSelector } from '../../../hooks/reduxHooks'

const LikeDislikeComment: React.FC<any> = ({ comment, post }) => {
	const { user } = useAppSelector(state => state.auth)
	const [rating, setRating] = useState(comment?.rating)
	const [typeReaction, setTypeReaction] = useState<string | null>(null)

	const toast = useToast()

	useEffect(() => {
		const fetchUserReaction = async () => {
			try {
				const response = await apiClient.get(`/comments/${comment.id}/like`)
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
	}, [comment.id, user.id])

	const handleClick = async (type: string) => {
		try {
			const responseLikes = await apiClient.get(`/comments/${comment.id}/like`)
			const userReaction = responseLikes.data.find(
				(data: { authorId: any; type: string }) => data.authorId === user.id
			)

			if (!userReaction) {
				await apiClient.post(`/comments/${comment.id}/like`, { type })
				setTypeReaction(type)
			} else if (userReaction.type !== type) {
				await apiClient.delete(`/comments/${comment.id}/like`)
				await apiClient.post(`/comments/${comment.id}/like`, { type })
				setTypeReaction(type)
			} else {
				await apiClient.delete(`/comments/${comment.id}/like`)
				setTypeReaction(null)
			}

			const responseRating = await apiClient.get(
				`/comments/${comment.id}/rating`
			)
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
				isDisabled={post.status === 'INACTIVE'}
				aria-label="Upvote"
				icon={<TiArrowUpOutline />}
				color={typeReaction === 'LIKE' ? 'green.500' : 'brand.400'}
				variant="ghost"
				fontSize="24px"
				onClick={() => handleClick('LIKE')}
			/>
			<Text fontWeight="bold" fontSize="md">
				{rating}
			</Text>
			<IconButton
				isDisabled={post.status === 'INACTIVE'}
				aria-label="Downvote"
				icon={<TiArrowDownOutline />}
				color={typeReaction === 'DISLIKE' ? 'red.500' : 'brand.400'}
				variant="ghost"
				fontSize="24px"
				onClick={() => handleClick('DISLIKE')}
			/>
		</Flex>
	)
}

export default LikeDislikeComment
