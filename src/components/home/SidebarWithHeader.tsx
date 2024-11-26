import { Box, Flex } from '@chakra-ui/react'
import Header from './Header'
import SidebarContent from './SidebarContent'

interface SidebarWithHeaderProps {
	content: React.ReactNode
	height?: string | number
}

const SidebarWithHeader: React.FC<SidebarWithHeaderProps> = ({
	content,
	height
}) => {
	return (
		<Box minH={height} bg="brand.200">
			<Header />

			<SidebarContent />
			<Flex h="20"></Flex>
			<Box ml={60} pt="20" p="4">
				{content}
			</Box>
		</Box>
	)
}

export default SidebarWithHeader
