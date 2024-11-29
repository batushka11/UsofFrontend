import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	Stack,
	useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import apiClient from '../../helpers/axios'
import { useAppSelector } from '../../hooks/reduxHooks'
import { updateUser } from '../../redux/auth/authSlice'
import store from '../../redux/store'

const UpdateProfile = () => {
	const toast = useToast()
	const { user } = useAppSelector(state => state.auth)
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		login: user.login,
		fullname: user.fullname
	})
	const [isOpen, setIsOpen] = useState(false)

	const openPopover = () => setIsOpen(true)
	const closePopover = () => setIsOpen(false)

	const updateUserInfo = async () => {
		setLoading(true)
		try {
			const data = {
				fullname: formData.fullname,
				...(formData.login !== user.login && { login: formData.login })
			}

			const response = await apiClient.patch(`/users/${user.id}`, data)
			localStorage.setItem('user', JSON.stringify(response.data))
			store.dispatch(updateUser(response.data))

			toast({
				title: 'Update profile successfully',
				status: 'success',
				duration: 3000,
				isClosable: true
			})
			closePopover()
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
			{isOpen && (
				<Box
					position="fixed"
					top="0"
					left="0"
					width="100%"
					height="100%"
					bg="rgba(0, 0, 0, 0.5)"
					zIndex="overlay"
					onClick={closePopover}
				/>
			)}

			<Popover isOpen={isOpen} onClose={closePopover} placement="top" isLazy>
				<PopoverTrigger>
					<Button
						bg="brand.500"
						color="brand.100"
						_hover={{ bg: 'brand.400', color: 'brand.50' }}
						_active={{ bg: 'brand.300', color: 'brand.0' }}
						transition="background-color 0.3s ease, color 0.3s ease"
						onClick={openPopover}
					>
						Update Profile
					</Button>
				</PopoverTrigger>
				<PopoverContent
					borderRadius="md"
					boxShadow="lg"
					zIndex="popover"
					bg="brand.50"
				>
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverBody>
						<Stack
							as="form"
							spacing={4}
							padding={4}
							borderRadius="md"
							bg="brand.50"
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
							<Box display="flex" justifyContent="center" mt="4">
								<Button
									bg="brand.400"
									color="white"
									_hover={{ bg: 'brand.500' }}
									_active={{ bg: 'brand.300' }}
									type="submit"
									transition="background-color 0.3s ease, color 0.3s ease"
									isLoading={loading}
								>
									Update
								</Button>
							</Box>
						</Stack>
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</>
	)
}

export default UpdateProfile
