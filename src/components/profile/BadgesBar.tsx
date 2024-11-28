import { Box, Flex, Icon, SimpleGrid, Text, Tooltip } from '@chakra-ui/react'
import { useAppSelector } from '../../hooks/reduxHooks'
import {
	calculateAchievementBadges,
	calculateMembershipBadges
} from './BadgesBarHelper'

const BadgesBar: React.FC = () => {
	const { user } = useAppSelector(state => state.auth)
	const membershipBadges = calculateMembershipBadges(user)
	const achievementBadges = calculateAchievementBadges(user)

	return (
		<Box bg="brand.50" p="4" borderRadius="md" boxShadow="lg">
			<Text fontSize="xl" fontWeight="bold" mb="4">
				Badges
			</Text>
			<SimpleGrid columns={2} spacing={4}>
				<Box>
					<Text fontSize="lg" fontWeight="semibold" mb="2">
						Membership Badges
					</Text>
					<Flex wrap="wrap" gap="4">
						{membershipBadges.length > 0 ? (
							membershipBadges.map((badge, index) => (
								<Tooltip key={index} label={badge.label} hasArrow>
									<Flex
										align="center"
										justify="center"
										w="50px"
										h="50px"
										bg="green.100"
										borderRadius="full"
										boxShadow="md"
									>
										<Icon as={badge.icon} color="green.600" w={6} h={6} />
									</Flex>
								</Tooltip>
							))
						) : (
							<Text>No Membership Badges</Text>
						)}
					</Flex>
				</Box>
				<Box>
					<Text fontSize="lg" fontWeight="semibold" mb="2">
						Achievement Badges
					</Text>
					<Flex wrap="wrap" gap="4">
						{achievementBadges.length > 0 ? (
							achievementBadges.map((badge, index) => (
								<Tooltip key={index} label={badge.label} hasArrow>
									<Flex
										align="center"
										justify="center"
										w="50px"
										h="50px"
										bg="blue.100"
										borderRadius="full"
										boxShadow="md"
									>
										<Icon as={badge.icon} color="blue.600" w={6} h={6} />
									</Flex>
								</Tooltip>
							))
						) : (
							<Text>No Achievement Badges</Text>
						)}
					</Flex>
				</Box>
			</SimpleGrid>
		</Box>
	)
}

export default BadgesBar
