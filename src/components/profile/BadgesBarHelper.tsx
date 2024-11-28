import { FaMedal, FaTrophy } from 'react-icons/fa'

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
		membershipBadges.push({ label: '1 Year With Us', icon: FaMedal })

	return membershipBadges
}

export const calculateAchievementBadges = (user: any) => {
	const achievementBadges = []
	let completedCategories = 0

	if (user.postsCount >= 50) {
		achievementBadges.push({ label: 'Posts Achiever', icon: FaTrophy })
		completedCategories++
	}

	if (user.reactionsCount >= 100) {
		achievementBadges.push({ label: 'Reactions Achiever', icon: FaTrophy })
		completedCategories++
	}

	if (user.commentsCount >= 50) {
		achievementBadges.push({ label: 'Comments Achiever', icon: FaTrophy })
		completedCategories++
	}

	if (completedCategories === 3) {
		achievementBadges.push({
			label: 'All Achievements Completed',
			icon: FaTrophy
		})
	}

	return achievementBadges
}
