'use client'

import {
	Box,
	Container,
	Stack,
	Text,
	useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { RiTwitterXLine } from 'react-icons/ri'
import { SiGmail } from 'react-icons/si'
import { FooterLogo } from './FooterLogo'
import { SocialButton } from './SocialButton'

const Footer: React.FC = () => {
	return (
		<Box
			zIndex="1100"
			bg={useColorModeValue('brand.100', 'brand.500')}
			color={useColorModeValue('brand.400', 'brand.200')}
		>
			<Container
				as={Stack}
				maxW={'9xl'}
				py={6}
				direction={{ base: 'column', md: 'row' }}
				spacing={6}
				justify={{ base: 'center', md: 'space-between' }}
				align={{ base: 'center', md: 'center' }}
			>
				<FooterLogo />
				<Text fontSize={'lg'}>
					© {new Date().getFullYear()} Speak About It Team. All rights reserved
				</Text>
				<Stack direction={'row'} spacing={9}>
					<SocialButton label={'Twitter'} href={'#'}>
						<RiTwitterXLine size={24} />
					</SocialButton>
					<SocialButton label={'GitHub'} href={'#'}>
						<FaGithub size={24} />
					</SocialButton>
					<SocialButton label={'Instagram'} href={'#'}>
						<SiGmail size={24} />
					</SocialButton>
				</Stack>
			</Container>
		</Box>
	)
}

export default Footer
