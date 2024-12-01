import {
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../../helpers/axios'

const DeletePost: React.FC<{ id: string }> = ({ id }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const toast = useToast()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const handleDelete = async () => {
		setLoading(true)
		try {
			await apiClient.delete(`/posts/${id}`)
			toast({
				title: 'Post deleted successfully',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
			navigate('/home')
		} catch (error: any) {
			toast({
				title: error.response?.data?.message || 'Failed to delete post',
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		} finally {
			setLoading(false)
			onClose()
		}
	}

	return (
		<>
			<IconButton
				aria-label="Delete post"
				icon={<MdDeleteForever />}
				variant="ghost"
				color="brand.500"
				_hover={{ color: 'brand.300', bg: 'brand.100' }}
				onClick={onOpen}
				fontSize="28px"
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="brand.50" borderRadius="lg">
					<ModalHeader color="brand.500">Delete Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text color="brand.400">
							Are you sure you want to delete this post?
						</Text>
					</ModalBody>
					<ModalFooter>
						<Button
							isLoading={loading}
							bg="red.500"
							color="white"
							_hover={{ bg: 'red.600' }}
							_active={{ bg: 'red.700' }}
							onClick={handleDelete}
						>
							Delete
						</Button>
						<Button
							ml={3}
							bg="brand.400"
							color="white"
							_hover={{ bg: 'brand.500' }}
							_active={{ bg: 'brand.300' }}
							onClick={onClose}
						>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default DeletePost