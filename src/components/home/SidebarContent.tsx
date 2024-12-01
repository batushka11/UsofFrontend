import { Box, Flex } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { BsFilePost } from 'react-icons/bs'
import { FaBookmark } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa6'
import { FiBell, FiHome } from 'react-icons/fi'
import { IoIosCreate } from 'react-icons/io'
import { TbCategoryFilled } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import NavItem from './NavItem'

interface LinkItemProps {
	name: string
	icon: IconType
	redirect: string
}

const LinkItems: Array<LinkItemProps> = [
	{ name: 'Home', icon: FiHome, redirect: '/home' },
	{ name: 'My posts', icon: BsFilePost, redirect: '/my-posts' },
	{ name: 'Create post', icon: IoIosCreate, redirect: '/create-post' },
	{ name: 'Bookmarks', icon: FaBookmark, redirect: '/bookmarks' },
	{ name: 'Subscribes', icon: FiBell, redirect: '/subscribes' },
	{ name: 'Categories', icon: TbCategoryFilled, redirect: '/categories' },
	{ name: 'Users', icon: FaUsers, redirect: '/users' }
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
