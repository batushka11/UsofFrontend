import {
	Avatar,
	AvatarBadge,
	Box,
	Flex,
	Grid,
	GridItem,
	HStack,
	Text,
	VStack
} from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'
import { check_activity, get_date } from '../posts/post-card/PostCardHelpers'
import DeleteUser from './DeleteUser'
import UpdateUser from './UpdateUser'
import { User } from './UsersBoard'

interface UserProps {
	user_: User
}

const UserCard: React.FC<UserProps> = ({ user_ }) => {
	const { user } = useAppSelector(state => state.auth)
	const navigate = useNavigate()

	return (
		<Box
			bg="brand.50"
			p="6"
			borderRadius="xl"
			shadow="lg"
			borderWidth="1px"
			borderColor="brand.200"
			_hover={{
				shadow: '2xl',
				transform: 'scale(1.03)',
				transition: 'all 0.3s ease-in-out'
			}}
			transition="transform 0.3s ease-in-out"
			display="flex"
			flexDirection="column"
			height="100%"
		>
			<Grid
				templateRows="auto 1fr auto"
				templateColumns="1fr"
				rowGap={4}
				height="100%"
			>
				<GridItem>
					<HStack spacing={4}>
						<Avatar
							size="xl"
							name={user_.fullname}
							src={user_.avatarPath}
							borderWidth="3px"
							borderColor="brand.100"
							boxShadow="lg"
						>
							<AvatarBadge
								boxSize="20px"
								bg={check_activity(user_.lastActive) ? 'green.400' : 'gray.400'}
								borderColor={
									check_activity(user_.lastActive) ? 'green.400' : 'gray.400'
								}
							/>
						</Avatar>
						<VStack align="start" spacing={0}>
							<Text fontSize="2xl" fontWeight="bold" color="brand.400">
								{user_.fullname}
							</Text>
							<Text fontSize="md" fontWeight="medium" color="brand.400">
								@{user_.login}
							</Text>
						</VStack>
					</HStack>
				</GridItem>

				<GridItem>
					<VStack align="start" spacing={2}>
						<Text fontSize="md" fontWeight="medium" color="brand.500">
							Rating:{' '}
							<Text as="span" fontWeight="bold">
								{user_.rating}
							</Text>
						</Text>
						<Text fontSize="md" fontWeight="medium" color="brand.500">
							Joined: {get_date(user_.createdAt)}
						</Text>
					</VStack>
				</GridItem>

				<GridItem>
					<Flex justify="space-between" align="center">
						<Text
							fontSize="md"
							fontWeight="medium"
							color="brand.300"
							_hover={{
								color: 'brand.500'
							}}
							onClick={() => navigate(`/user/${user_.id}/posts/1`)}
						>
							View Profile
						</Text>
						{user.role === 'ADMIN' && user.id !== user_.id && (
							<HStack spacing={2}>
								<UpdateUser user_={user_} />
								<DeleteUser id={user_.id} />
							</HStack>
						)}
					</Flex>
				</GridItem>
			</Grid>
		</Box>
	)
}

export default UserCard
