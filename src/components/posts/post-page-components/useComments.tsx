import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import apiClient from '../../../helpers/axios'
import { useAppSelector } from '../../../hooks/reduxHooks'

interface Comment {
	id: number
	authorId: number
	content: string
	publishAt: string
	postId: number
	user: {
		id: number
		login: string
		fullname: string
		avatarPath?: string
		lastActive: string
		[key: string]: any
	}
	[key: string]: any
}

interface UseCommentsProps {
	postId: string
}

const useComments = ({ postId }: UseCommentsProps) => {
	const toast = useToast()
	const [comments, setComments] = useState<Comment[]>([])
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [totalComments, setTotalComments] = useState(0)
	const { user } = useAppSelector(state => state.auth)

	useEffect(() => {
		const fetchComments = async () => {
			setLoading(true)
			try {
				const response = await apiClient.get(
					`/posts/${postId}/comments?page=${currentPage}`
				)
				setComments(response.data.comments || [])
				setTotalPages(response.data.totalPages || 1)
				setTotalComments(response.data.totalComments)
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
		fetchComments()
	}, [postId, currentPage, toast])

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const deleteComment = (commentId: number) => {
		setComments(prevComments =>
			prevComments.filter(comment => comment.id !== commentId)
		)
		setTotalComments(totalComments - 1)
	}

	const addComment = async (content: string) => {
		try {
			const response = await apiClient.post(`/posts/${postId}/comments`, {
				content
			})
			setCurrentPage(1)
			setTotalComments(totalComments + 1)
			const newComment: Comment = {
				...response.data,
				user: {
					id: user.id,
					login: user.login,
					fullname: user.fullname,
					avatarPath: user.avatarPath
				}
			}
			setComments(prev => [newComment, ...prev])
		} catch (error: any) {
			toast({
				title: error.response?.data?.message,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}

	const updateComment = async (commentId: number, updatedContent: string) => {
		try {
			const response = await apiClient.patch(`/comments/${commentId}`, {
				content: updatedContent
			})
			setComments(prevComments =>
				prevComments.map(comment =>
					comment.id === commentId
						? { ...comment, content: response.data.content }
						: comment
				)
			)
			toast({
				title: 'Comment updated successfully!',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
		} catch (error: any) {
			toast({
				title: error.response?.data?.message,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}

	return {
		comments,
		loading,
		currentPage,
		totalPages,
		totalComments,
		handlePageChange,
		addComment,
		deleteComment,
		updateComment
	}
}

export default useComments
