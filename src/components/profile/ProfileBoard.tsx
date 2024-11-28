import {
	Box,
	Divider,
	Flex,
	SimpleGrid,
	Spinner,
	useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import apiClient from '../../helpers/axios'
import { useAppSelector } from '../../hooks/reduxHooks'
import { updateUser } from '../../redux/auth/authSlice'
import store from '../../redux/store'
import AchievementsBox from './Achievements'
import BadgesBar from './BadgesBar'
import ProfileFooter from './ProfileFooter'
import ProfileForm from './ProfileForm'
import ProfileHeader from './ProfileHeader'

const ProfileBoard = () => {
	const toast = useToast()
	const { user } = useAppSelector(state => state.auth)
	const [loading, setLoading] = useState(false)
	const id = user.id

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true)
			try {
				const response = await apiClient(`/users/${id}`)
				localStorage.setItem('user', JSON.stringify(response.data))

				store.dispatch(updateUser(response.data))
			} catch (error: any) {
				toast({
					title: error.response?.data?.message,
					status: 'error',
					duration: 3000,
					isClosable: true
				})
			} finally {
				setLoading(false)
			}
		}

		fetchUser()
	}, [toast, id])

	return loading ? (
		<Flex justify="center" align="center" minH="200px">
			<Spinner size="xl" />
		</Flex>
	) : (
		<Box>
			<SimpleGrid columns={3} spacing="6" maxHeight="900px">
				<AchievementsBox />
				<Box
					maxW="700px"
					maxH="650px"
					mx="auto"
					p="6"
					bg="brand.700"
					boxShadow="2xl"
					borderRadius="lg"
				>
					<ProfileHeader />

					<Divider borderColor="brand.100" mb="6" />

					<ProfileForm />

					<Divider borderColor="brand.100" my="6" />

					<ProfileFooter />
				</Box>
				<BadgesBar />
			</SimpleGrid>
		</Box>
	)
}

export default ProfileBoard
