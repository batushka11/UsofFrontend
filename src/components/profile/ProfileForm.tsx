import { FormControl, FormLabel, Grid, GridItem, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'

const ProfileForm: React.FC = () => {
	const { user } = useAppSelector((state: any) => state.auth)
	const [formData, setFormData] = useState({
		login: user.login,
		fullname: user.fullname,
		email: user.email,
		password: ''
	})

	return (
		<Grid templateColumns="repeat(2, 1fr)" gap="4">
			<GridItem colSpan={2}>
				<FormControl>
					<FormLabel>Username</FormLabel>
					<Input
						borderWidth="2px"
						borderColor="brand.100"
						placeholder="Enter login"
						value={formData.login}
						_hover={{ borderColor: 'brand.500' }}
						onChange={e => setFormData({ ...formData, login: e.target.value })}
					/>
				</FormControl>
			</GridItem>

			<GridItem colSpan={2}>
				<FormControl>
					<FormLabel>Full Name</FormLabel>
					<Input
						borderWidth="2px"
						borderColor="brand.100"
						placeholder="Enter full name"
						value={formData.fullname}
						_hover={{ borderColor: 'brand.500' }}
						onChange={e =>
							setFormData({ ...formData, fullname: e.target.value })
						}
					/>
				</FormControl>
			</GridItem>

			<GridItem colSpan={2}>
				<FormControl>
					<FormLabel>Email</FormLabel>
					<Input
						borderWidth="2px"
						borderColor="brand.100"
						placeholder="Enter email"
						value={formData.email}
						_hover={{ borderColor: 'brand.500' }}
						onChange={e => setFormData({ ...formData, email: e.target.value })}
					/>
				</FormControl>
			</GridItem>

			<GridItem colSpan={2}>
				<FormControl>
					<FormLabel>New Password</FormLabel>
					<Input
						borderWidth="2px"
						borderColor="brand.100"
						type="password"
						placeholder="Enter new password"
						value={formData.password}
						_hover={{ borderColor: 'brand.500' }}
						onChange={e =>
							setFormData({ ...formData, password: e.target.value })
						}
					/>
				</FormControl>
			</GridItem>
		</Grid>
	)
}

export default ProfileForm
