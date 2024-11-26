import { ReactNode } from 'react'

import { chakra, VisuallyHidden } from '@chakra-ui/react'

export const SocialButton = ({
	children,
	label,
	href
}: {
	children: ReactNode
	label: string
	href: string
}) => {
	return (
		<chakra.button
			bg="brand.300"
			rounded={'full'}
			w={12}
			h={12}
			cursor={'pointer'}
			as={'a'}
			href={href}
			display={'inline-flex'}
			alignItems={'center'}
			justifyContent={'center'}
			transition={'background 0.3s ease'}
			_hover={{
				bg: 'brand.50'
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	)
}
