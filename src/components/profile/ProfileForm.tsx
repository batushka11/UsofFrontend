import { FormControl, FormLabel, Grid, GridItem, Input } from '@chakra-ui/react'
import { useAppSelector } from '../../hooks/reduxHooks'

const ProfileForm: React.FC = () => {
	const { user } = useAppSelector((state: any) => state.auth)

	return (
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
	)
}

export default ProfileForm
