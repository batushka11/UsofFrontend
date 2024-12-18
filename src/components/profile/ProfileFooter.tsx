import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	Stack
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import DeleteProfile from './DeleteProfile'
import UpdateProfile from './UpdateProfile'

const ProfileFooter: React.FC = () => {
	const navigate = useNavigate()
	const { user } = useAppSelector((state: any) => state.auth)

	return (
		<Box>
			<HStack justifyContent="space-between">
				<FormControl maxW="45%">
					<FormLabel>Role</FormLabel>
					<Input
						value={user.role}
						isReadOnly
						borderWidth="2px"
						borderColor="brand.100"
						_hover={{ borderColor: 'brand.500' }}
					/>
				</FormControl>
				<FormControl maxW="45%">
					<FormLabel>Rating</FormLabel>
					<Input
						value={user.rating}
						isReadOnly
						borderWidth="2px"
						borderColor="brand.100"
						_hover={{ borderColor: 'brand.500' }}
					/>
				</FormControl>
			</HStack>

			<Stack direction="row" justifyContent="space-between" mt="8">
				<Button
					bg="brand.200"
					color="brand.400"
					_hover={{ bg: 'brand.300', color: 'bg.500' }}
					onClick={() => navigate(-1)}
				>
					Back
				</Button>
				<Flex direction="row">
					<UpdateProfile />
					<DeleteProfile />
				</Flex>
			</Stack>
		</Box>
	)
}

export default ProfileFooter
