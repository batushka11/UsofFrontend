import { Box, Flex, Icon, Progress, Text } from '@chakra-ui/react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { useAppSelector } from '../../hooks/reduxHooks'
import {
	AchievementCategory,
	getAchievementCategories
} from './AchievementsHelper'

const AchievementsBox: React.FC = () => {
	const { user } = useAppSelector(state => state.auth)
	const achievementCategories = getAchievementCategories(user)
	return (
		<Box
			maxH="800px"
			overflowY="auto"
			borderRight="1px solid"
			borderColor="brand.50"
			pr="4"
		>
			<Text fontSize="xl" fontWeight="bold" mb="4">
				Achievements
			</Text>
			{achievementCategories.map((category: AchievementCategory) => (
				<Box key={category.category} mb="8">
					<Text fontSize="lg" fontWeight="semibold" mb="4">
						{category.category}
					</Text>
					<Box>
						{category.achievements.map(achievement => (
							<Flex
								key={achievement.id}
								align="center"
								justify="space-between"
								mb="2"
								p="2"
								border="1px solid"
								borderColor="brand.100"
								borderRadius="md"
								bg="brand.50"
								fontSize="sm"
								h="40px"
							>
								<Flex align="center">
									<Icon
										as={
											achievement.progress >= achievement.goal
												? FaCheckCircle
												: FaTimesCircle
										}
										color={
											achievement.progress >= achievement.goal
												? 'green.500'
												: 'red.500'
										}
										w={4}
										h={4}
										mr="2"
									/>
									<Text>{achievement.label}</Text>
								</Flex>
								<Progress
									value={(achievement.progress / achievement.goal) * 100}
									w="30%"
									colorScheme={
										achievement.progress >= achievement.goal ? 'green' : 'red'
									}
									size="xs"
									borderRadius="md"
								/>
							</Flex>
						))}
					</Box>
				</Box>
			))}
		</Box>
	)
}

export default AchievementsBox
