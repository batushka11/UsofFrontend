import { Box, Flex, Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface NavItemProps {
	icon: IconType
	children: React.ReactNode
	onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({
	icon,
	children,
	onClick,
	...rest
}) => {
	return (
		<Box
			as="a"
			href="#"
			style={{ textDecoration: 'none' }}
			_focus={{ boxShadow: 'none' }}
			onClick={onClick}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: 'brand.300',
					color: 'white'
				}}
				color="brand.400"
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: 'white'
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Box>
	)
}

export default NavItem
