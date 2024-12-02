import {
	Button,
	Flex,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Textarea,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import apiClient from '../../../helpers/axios'
import { useAppSelector } from '../../../hooks/reduxHooks'

const DeleteEditSectionComment: React.FC<any> = ({
	comment,
	onDelete,
	onUpdate
}) => {
	const { user } = useAppSelector(state => state.auth)
	const toast = useToast()
	const [loading, setLoading] = useState<boolean>(false)
	const [editedComment, setEditedComment] = useState(comment?.content || '')
	const {
		isOpen: isEditOpen,
		onOpen: onEditOpen,
		onClose: onEditClose
	} = useDisclosure()
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose
	} = useDisclosure()

	const handleConfirmDelete = async () => {
		setLoading(true)
		try {
			await apiClient.delete(`/comments/${comment.id}`)
			onDelete(comment.id)
			toast({
				title: 'Comment deleted successfully!',
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
		} finally {
			setLoading(false)
			onDeleteClose()
		}
	}

	const handleEdit = async () => {
		setLoading(true)
		onUpdate(comment.id, editedComment)
		setLoading(false)
		onEditClose()
	}
	return (
		<Flex>
			{user.id === comment.user.id && (
				<IconButton
					aria-label="Edit comment"
					icon={<FaEdit />}
					variant="ghost"
					color="brand.500"
					_hover={{ color: 'brand.300', bg: 'brand.100' }}
					onClick={onEditOpen}
					fontSize="20px"
				/>
			)}
			<IconButton
				aria-label="Delete comment"
				icon={<MdDelete />}
				variant="ghost"
				color="brand.500"
				_hover={{ color: 'brand.300', bg: 'brand.100' }}
				onClick={onDeleteOpen}
				fontSize="20px"
			/>

			<Modal isOpen={isEditOpen} onClose={onEditClose}>
				<ModalOverlay />
				<ModalContent bg="brand.50" borderRadius="lg">
					<ModalHeader color="brand.500">Edit Comment</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Textarea
							value={editedComment}
							onChange={e => setEditedComment(e.target.value)}
							placeholder="Edit your comment here"
							borderColor="brand.300"
							_focus={{
								borderColor: 'brand.400',
								boxShadow: '0 0 0 2px brand.400'
							}}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							isLoading={loading}
							bg="brand.300"
							color="brand.0"
							_hover={{ bg: 'brand.400' }}
							onClick={handleEdit}
						>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
				<ModalOverlay />
				<ModalContent bg="brand.50" borderRadius="lg">
					<ModalHeader color="brand.500">Delete Comment</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text color="brand.400">
							Are you sure you want to delete this comment?
						</Text>
					</ModalBody>
					<ModalFooter>
						<Button
							isLoading={loading}
							bg="brand.300"
							color="brand.0"
							_hover={{ bg: 'brand.400' }}
							onClick={handleConfirmDelete}
						>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	)
}

export default DeleteEditSectionComment
