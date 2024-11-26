import { Avatar, Box, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { FaCamera, FaStar } from 'react-icons/fa' // Иконка для рейтинга
import { useAppSelector } from '../../hooks/reduxHooks'

const ProfileHeader: React.FC = () => {
	const { user } = useAppSelector((state: any) => state.auth)
	return (
		<HStack justifyContent="space-between" alignItems="center" mb="8">
			<Box position="relative">
				<Avatar size="xl" src={user.avatarPath} />
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
