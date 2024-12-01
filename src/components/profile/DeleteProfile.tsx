import {
	Box,
	Button,
	FormLabel,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import apiClient from '../../helpers/axios'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { logout } from '../../redux/auth/authSlice'

const DeleteProfile = () => {
	const dispatch = useAppDispatch()
	const toast = useToast()
	const { user } = useAppSelector(state => state.auth)
	const [loading, setLoading] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()

	const deleteUser = async () => {
		setLoading(true)
		try {
			await apiClient.delete(`/users/${user.id}`)
			toast({
				title: 'Profile deleted successfully',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
			dispatch(logout())
			onClose()
		} catch (error: any) {
			toast({
				title: error.response?.data?.message || 'Error deleting profile',
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Box>
				<Icon
					as={MdDeleteForever}
					fontSize="34px"
					color="brand.500"
					transition="background-color 0.3s ease, color 0.3s ease"
					onClick={onOpen}
					cursor="pointer"
				/>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="brand.50" borderRadius="md">
					<ModalHeader>Delete Profile</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormLabel textAlign="center">
							Are you sure you want to delete your profile?
						</FormLabel>
					</ModalBody>
					<ModalFooter>
						<Button
							bg="red.500"
							color="white"
							_hover={{ bg: 'red.600' }}
							_active={{ bg: 'red.700' }}
							isLoading={loading}
							onClick={deleteUser}
							mr={3}
						>
							Delete
						</Button>
						<Button
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

export default DeleteProfile
