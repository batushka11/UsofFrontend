import {
	Avatar,
	Box,
	Divider,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	HStack,
	Input,
	SimpleGrid,
	Stack,
	Text
} from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { User } from '../UsersBoard'
import ProfilePartAchievements from './UserAchievemnets'
import UserBages from './UserBadges'

export type ProfilePartProps = {
	user: User
}

const ProfilePart: React.FC<ProfilePartProps> = ({ user }) => {
	return (
		<SimpleGrid columns={3} spacing="6" maxHeight="900px">
			<ProfilePartAchievements user={user} />
			<Box
				maxW="700px"
				maxH="650px"
				mx="auto"
				p="6"
				bg="brand.700"
				boxShadow="2xl"
				borderRadius="lg"
			>
				<HStack justifyContent="space-between" alignItems="center" mb="8">
					<Box position="relative">
						<Avatar
							size="xl"
							name={user.fullname}
							src={user.avatarPath}
							borderWidth="3px"
							borderColor="brand.100"
							boxShadow="lg"
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
				<Divider borderColor="brand.100" mb="6" />

				<Grid templateColumns="repeat(2, 1fr)" gap="4">
					<GridItem colSpan={2}>
						<FormControl>
							<FormLabel>Username</FormLabel>
							<Input
								isReadOnly
								borderWidth="2px"
								borderColor="brand.100"
								placeholder="Enter login"
								value={user.login}
								_hover={{ borderColor: 'brand.500' }}
							/>
						</FormControl>
					</GridItem>

					<GridItem colSpan={2}>
						<FormControl>
							<FormLabel>Full Name</FormLabel>
							<Input
								isReadOnly
								borderWidth="2px"
								borderColor="brand.100"
								placeholder="Enter full name"
								value={user.fullname}
								_hover={{ borderColor: 'brand.500' }}
							/>
						</FormControl>
					</GridItem>

					<GridItem colSpan={2}>
						<FormControl>
							<FormLabel>Email</FormLabel>
							<Input
								isReadOnly
								borderWidth="2px"
								borderColor="brand.100"
								placeholder="Enter email"
								value={user.email}
								_hover={{ borderColor: 'brand.500' }}
							/>
						</FormControl>
					</GridItem>
				</Grid>

				<Divider borderColor="brand.100" my="6" />

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
			</Box>
			<UserBages user={user} />
		</SimpleGrid>
	)
}

export default ProfilePart
