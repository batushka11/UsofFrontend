import {
	Button,
	FormControl,
	FormLabel,
	HStack,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Stack,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import apiClient from '../../helpers/axios'
import { User } from './UsersBoard'
interface UserUpdateProps {
	user_: User
}

const UpdateUser: React.FC<UserUpdateProps> = ({ user_ }) => {
	const toast = useToast()
	const [loading, setLoading] = useState<boolean>(false)
	const { register, handleSubmit, reset } = useForm()
	const {
		isOpen: isCreateOpen,
		onOpen: onCreateOpen,
		onClose: onCreateClose
	} = useDisclosure()

	const onSubmit = async (data: any) => {
		setLoading(true)
		try {
			const dataForm = {
				...(data.login !== user_.login && { login: data.login }),
				...(data.fullname !== user_.fullname && { fullname: data.fullname }),
				...(data.role !== user_.role && { role: data.role }),
				...(data.email !== user_.email && { email: data.email })
			}
			await apiClient.patch(`/users/${user_.id}`, dataForm)
			onCreateClose()
			reset()
			window.location.reload()
		} catch (error: any) {
			toast({
				title: error.response.data.message,
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
			<IconButton
				aria-label="Update user"
				icon={<FaEdit fontSize="18" />}
				variant="ghost"
				color="brand.500"
				_hover={{ color: 'brand.300', bg: 'brand.100' }}
				onClick={onCreateOpen}
				fontSize="20px"
				mr="-2"
			/>
			<Modal isOpen={isCreateOpen} onClose={onCreateClose}>
				<ModalOverlay />
				<ModalContent bg="brand.50" borderRadius="lg">
					<ModalHeader color="brand.500">Update User</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody>
							<Stack spacing={4}>
								<HStack>
									<FormControl id="login">
										<FormLabel color="brand.400">Username</FormLabel>
										<Input
											defaultValue={user_.login}
											type="text"
											focusBorderColor="brand.400"
											{...register('login')}
											color="brand.900"
											bg="brand.0"
										/>
									</FormControl>
									<FormControl id="fullname">
										<FormLabel color="brand.400">Full Name</FormLabel>
										<Input
											defaultValue={user_.fullname}
											type="text"
											focusBorderColor="brand.400"
											{...register('fullname')}
											color="brand.900"
											bg="brand.0"
										/>
									</FormControl>
								</HStack>
								<FormControl id="email">
									<FormLabel color="brand.400">Email Address</FormLabel>
									<Input
										defaultValue={user_.email}
										type="email"
										focusBorderColor="brand.400"
										{...register('email')}
										color="brand.900"
										bg="brand.0"
									/>
								</FormControl>
								<FormControl id="role">
									<FormLabel color="brand.400">Role</FormLabel>
									<Select
										{...register('role', { required: true })}
										color="brand.900"
										bg="brand.0"
										defaultValue={user_.role}
									>
										<option value="USER">User</option>
										<option value="ADMIN">Admin</option>
									</Select>
								</FormControl>
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Button
								isLoading={loading}
								type="submit"
								bg="brand.400"
								color="white"
								_hover={{ bg: 'brand.500' }}
							>
								Update User
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

export default UpdateUser
