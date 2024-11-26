import { Box, Flex } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { BsFilePost } from 'react-icons/bs'
import { FaBookmark } from 'react-icons/fa'
import { FiBell, FiHome } from 'react-icons/fi'
import { IoIosCreate } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import NavItem from './NavItem'

interface LinkItemProps {
	name: string
	icon: IconType
	redirect: string
}

const LinkItems: Array<LinkItemProps> = [
	{ name: 'Home', icon: FiHome, redirect: '/Home' },
	{ name: 'My posts', icon: BsFilePost, redirect: '#' },
	{ name: 'Create post', icon: IoIosCreate, redirect: '#' },
	{ name: 'Bookmarks', icon: FaBookmark, redirect: '#' },
	{ name: 'Subscribes', icon: FiBell, redirect: '#' }
]

const SidebarContent: React.FC = () => {
	const navigate = useNavigate()
	return (
		<Box
			transition="3s ease"
			bg="brand.50"
			borderRight="1px"
			borderRightColor="brand.200"
			w={60}
			pos="fixed"
			h="full"
		>
			<Flex h="20"></Flex>
			{LinkItems.map(link => (
				<NavItem
					key={link.name}
					icon={link.icon}
					onClick={() => navigate(link.redirect)}
				>
					{link.name}
				</NavItem>
			))}
		</Box>
	)
}

export default SidebarContent
