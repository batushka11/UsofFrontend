import { FaCrown, FaGem, FaMedal, FaStar, FaTrophy } from 'react-icons/fa'
import { getAchievementCategories } from './AchievementsHelper'

export const calculateMembershipBadges = (user: any) => {
	const membershipBadges = []
	const now = new Date()
	const createdAt = new Date(user.createdAt)
	const diffInDays = Math.floor(
		(now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
	)

	if (diffInDays >= 1)
		membershipBadges.push({ label: '1 Day With Us', icon: FaMedal })
	if (diffInDays >= 30)
		membershipBadges.push({ label: '1 Month With Us', icon: FaMedal })
	if (diffInDays >= 180)
		membershipBadges.push({ label: '6 Months With Us', icon: FaMedal })
	if (diffInDays >= 365)
		membershipBadges.push({ label: '1 Year With Us', icon: FaCrown })

	if (diffInDays >= 730)
		membershipBadges.push({ label: '2 Years With Us', icon: FaCrown })
	if (diffInDays >= 1095)
		membershipBadges.push({ label: '3 Years With Us', icon: FaCrown })

	return membershipBadges
}

export const calculateAchievementBadges = (user: any) => {
	const achievementBadges = []
	const achievementCategories = getAchievementCategories(user)

	achievementCategories.forEach(category => {
		category.achievements.forEach(achievement => {
			if (
				[1, 10, 50, 100].includes(achievement.goal) &&
				achievement.progress >= achievement.goal
			) {
				achievementBadges.push({
					label: `${category.category}: ${achievement.label} Completed`,
					icon: FaTrophy
				})
			}
		})
	})

	if (user.postsCount >= 500) {
		achievementBadges.push({ label: 'Master Poster', icon: FaCrown })
	}

	if (user.reactionsCount >= 1000) {
		achievementBadges.push({ label: 'Reaction King', icon: FaCrown })
	}

	if (user.commentsCount >= 500) {
		achievementBadges.push({ label: 'Comment Legend', icon: FaCrown })
	}

	if (
		user.postsCount >= 1000 &&
		user.reactionsCount >= 2000 &&
		user.commentsCount >= 1000
	) {
		achievementBadges.push({ label: 'Ultimate Contributor', icon: FaStar })
	}

	let completedCategories = 0

	if (user.postsCount >= 2000) completedCategories++
	if (user.reactionsCount >= 5000) completedCategories++
	if (user.commentsCount >= 2000) completedCategories++

	if (completedCategories === 3) {
		achievementBadges.push({
			label: 'Diamond Contributor. All Achievements Completed',
			icon: FaGem
		})
	}

	return achievementBadges
}
