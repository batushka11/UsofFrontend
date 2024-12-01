import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Icon,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import apiClient from '../../helpers/axios'
import { useAppSelector } from '../../hooks/reduxHooks'

const UpdateProfile = () => {
	const toast = useToast()
	const { user } = useAppSelector(state => state.auth)
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		login: user.login,
		fullname: user.fullname
	})
	const { isOpen, onOpen, onClose } = useDisclosure()

	const updateUserInfo = async () => {
		setLoading(true)
		try {
			const data = {
				fullname: formData.fullname,
				...(formData.login !== user.login && { login: formData.login })
			}

			await apiClient.patch(`/users/${user.id}`, data)
			toast({
				title: 'Profile updated successfully',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
			onClose()
		} catch (error: any) {
			toast({
				title: error.response?.data?.message || 'An error occurred',
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
					as={FaEdit}
					fontSize="32px"
					color="brand.500"
					transition="background-color 0.3s ease, color 0.3s ease"
					onClick={onOpen}
					cursor="pointer"
				/>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg="brand.50" borderRadius="md">
					<ModalHeader>Update Profile</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack
							as="form"
							spacing={4}
							onSubmit={e => {
								e.preventDefault()
								updateUserInfo()
							}}
						>
							<FormControl>
								<FormLabel>Username</FormLabel>
								<Input
									borderWidth="2px"
									borderColor="brand.100"
									_hover={{ borderColor: 'brand.500' }}
									_focus={{
										borderColor: 'brand.300',
										boxShadow: '0 0 0 2px brand.300'
									}}
									placeholder="Enter login"
									value={formData.login}
									onChange={e =>
										setFormData({ ...formData, login: e.target.value })
									}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Full Name</FormLabel>
								<Input
									borderWidth="2px"
									borderColor="brand.100"
									_hover={{ borderColor: 'brand.500' }}
									_focus={{
										borderColor: 'brand.300',
										boxShadow: '0 0 0 2px brand.300'
									}}
									placeholder="Enter full name"
									value={formData.fullname}
									onChange={e =>
										setFormData({ ...formData, fullname: e.target.value })
									}
								/>
							</FormControl>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button
							bg="brand.400"
							color="white"
							_hover={{ bg: 'brand.500' }}
							_active={{ bg: 'brand.300' }}
							onClick={updateUserInfo}
							isLoading={loading}
							mr={3}
						>
							Update
						</Button>
						<Button
							bg="gray.300"
							color="black"
							_hover={{ bg: 'gray.400' }}
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

export default UpdateProfile
