import {
	Avatar,
	Box,
	HStack,
	IconButton,
	Stack,
	Text,
	useToast
} from '@chakra-ui/react'
import { useRef } from 'react'
import { FaCamera, FaStar } from 'react-icons/fa'
import apiClient from '../../helpers/axios'
import { useAppSelector } from '../../hooks/reduxHooks'
import { updateUser } from '../../redux/auth/authSlice'
import store from '../../redux/store'

const ProfileHeader: React.FC = () => {
	const toast = useToast()
	const { user } = useAppSelector(state => state.auth)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0]

		if (!file) return

		const formData = new FormData()
		formData.append('file', file)

		try {
			const response = await apiClient.patch('/users/avatar', formData)
			toast({
				title: 'Avatar successfully uploaded!',
				description: response.data.message,
				status: 'success',
				duration: 3000,
				isClosable: true
			})

			localStorage.setItem('user', JSON.stringify(response.data))

			store.dispatch(updateUser(response.data))
		} catch (error: any) {
			toast({
				title: 'Avatar upload failed',
				description: error.response.data.error,
				status: 'error',
				duration: 3000,
				isClosable: true
			})
		}
	}

	return (
		<HStack justifyContent="space-between" alignItems="center" mb="8">
			<Box position="relative">
				<Avatar size="xl" src={user.avatarPath} />
				<input
					type="file"
					accept="image/*"
					ref={inputRef}
					style={{ display: 'none' }}
					onChange={handleFileChange}
				/>
				<IconButton
					aria-label="Update Avatar"
					icon={<FaCamera />}
					size="sm"
					bg="brand.500"
					color="brand.100"
					position="absolute"
					bottom="0"
					right="0"
					boxShadow="lg"
					_hover={{ bg: 'brand.400', color: 'bg.50' }}
					onClick={() => inputRef.current?.click()}
				/>
			</Box>
			<Stack spacing="1" textAlign="right" align="flex-end">
				<Text fontSize="2xl" fontWeight="bold">
					{user.fullname}
				</Text>
				<HStack>
					<FaStar color="#ECC94B" />
					<Text fontSize="md" color="brand.500" fontWeight="medium">
						{user.rating}
					</Text>
				</HStack>
				<Text fontSize="sm" color="gray.500">
					Member since: {new Date(user.createdAt).toLocaleDateString()}
				</Text>
			</Stack>
		</HStack>
	)
}

export default ProfileHeader
