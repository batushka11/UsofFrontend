import {
	Avatar,
	AvatarBadge,
	Badge,
	Box,
	Button,
	Divider,
	Flex,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Text,
	Textarea,
	VStack,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/reduxHooks'
import Pagination from '../../home/Pagination'
import { check_activity, get_date } from '../post-card/PostCardHelpers'
import DeleteEditSectionComment from './DeleteEditSectionComment'
import LikeDislikeComment from './LikeDislikeComment'
import useComments from './useComments'

const CommentsSection: React.FC<{ post: { status: string; id: string } }> = ({
	post
}) => {
	const { user } = useAppSelector(state => state.auth)
	const [isLoading, setLoading] = useState(false)
	const { id } = useParams<{ id: string }>()
	const toast = useToast()
	const {
		comments,
		loading,
		currentPage,
		totalPages,
		totalComments,
		handlePageChange,
		addComment,
		deleteComment,
		updateComment
	} = useComments({
		postId: id || ''
	})
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [newComment, setNewComment] = useState('')

	const handleAddComment = async () => {
		if (newComment.trim()) {
			setLoading(true)
			try {
				await addComment(newComment)
				setNewComment('')
			} catch (error: any) {
				toast({
					title: error.response.data.message,
					status: 'error',
					duration: 3000,
					isClosable: true
				})
			} finally {
				setLoading(false)
				onClose()
			}
		}
	}

	if (loading) {
		return (
			<Flex justify="center" align="center" height="200px">
				<Spinner size="xl" color="brand.500" />
			</Flex>
		)
	}

	return (
		<Box>
			<HStack justifyContent="space-between" marginBottom={4}>
				<Text fontWeight="bold" fontSize="2xl" color="brand.500">
					Comments ({totalComments})
				</Text>
				<Button
					isDisabled={post.status === 'INACTIVE'}
					onClick={onOpen}
					bg="brand.500"
					color="brand.0"
					_hover={{ bg: 'brand.400' }}
				>
					Add Comment
				</Button>
			</HStack>

			<VStack spacing={4} align="stretch">
				{comments.map(comment => (
					<Box
						key={comment.id}
						padding={4}
						borderWidth="1px"
						borderRadius="lg"
						backgroundColor="brand.100"
						boxShadow="md"
					>
						<HStack marginBottom={3}>
							<Avatar src={comment.user?.avatarPath} size="md">
								{check_activity(comment.user?.lastActive) ? (
									<AvatarBadge
										boxSize="4"
										bg="green.500"
										borderWidth="2px"
										borderColor="brand.400"
									/>
								) : (
									<AvatarBadge
										boxSize="18"
										bg="gray.500"
										borderWidth="2px"
										borderColor="brand.400"
									/>
								)}
							</Avatar>
							<VStack align="start" spacing={0}>
								<Flex alignItems="center">
									<Text fontWeight="bold" color="brand.500">
										{comment.user?.fullname}
									</Text>
									<Badge ml={2} bg="brand.500" color="brand.100">
										@{comment.user?.login || 'unknown'}
									</Badge>
								</Flex>
								<Text fontSize="sm" color="brand.400">
									{get_date(comment.publishAt)}
								</Text>
							</VStack>
						</HStack>
						<Text mt={2} color="brand.500">
							{comment.content}
						</Text>
						<Divider mt={3} />
						<Flex justifyContent="space-between" mt={3}>
							<LikeDislikeComment comment={comment} post={post} />
							{(comment.authorId === user.id || user.role === 'ADMIN') &&
								post.status === 'ACTIVE' && (
									<DeleteEditSectionComment
										comment={comment}
										onDelete={deleteComment}
										onUpdate={updateComment}
									/>
								)}
						</Flex>
					</Box>
				))}
			</VStack>
			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="brand.200">
					<ModalHeader color="brand.500">Add a New Comment</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Textarea
							value={newComment}
							onChange={e => setNewComment(e.target.value)}
							placeholder="Write your comment..."
							rows={5}
							borderColor="brand.500"
							_focus={{ borderColor: 'brand.600' }}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							bg="brand.500"
							color="white"
							onClick={handleAddComment}
							isLoading={isLoading}
							isDisabled={!newComment.trim()}
							_hover={{ bg: 'brand.600' }}
						>
							Submit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	)
}

export default CommentsSection
