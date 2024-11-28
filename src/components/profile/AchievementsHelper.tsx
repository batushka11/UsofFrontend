interface Achievement {
	id: number
	label: string
	progress: number
	goal: number
}

export interface AchievementCategory {
	category: string
	achievements: Achievement[]
}

export const getAchievementCategories = (user: {
	postsCount: number
	reactionsCount: number
	commentsCount: number
}): AchievementCategory[] => [
	{
		category: 'Posts',
		achievements: [
			{ id: 1, label: 'Create 1 post', progress: user.postsCount, goal: 1 },
			{ id: 2, label: 'Create 5 posts', progress: user.postsCount, goal: 5 },
			{ id: 3, label: 'Create 10 posts', progress: user.postsCount, goal: 10 },
			{ id: 4, label: 'Create 25 posts', progress: user.postsCount, goal: 25 },
			{ id: 5, label: 'Create 50 posts', progress: user.postsCount, goal: 50 }
		]
	},
	{
		category: 'Reactions',
		achievements: [
			{
				id: 6,
				label: 'Add 1 reaction',
				progress: user.reactionsCount,
				goal: 1
			},
			{
				id: 7,
				label: 'Add 10 reactions',
				progress: user.reactionsCount,
				goal: 10
			},
			{
				id: 8,
				label: 'Add 25 reactions',
				progress: user.reactionsCount,
				goal: 25
			},
			{
				id: 9,
				label: 'Add 50 reactions',
				progress: user.reactionsCount,
				goal: 50
			},
			{
				id: 10,
				label: 'Add 100 reactions',
				progress: user.reactionsCount,
				goal: 100
			}
		]
	},
	{
		category: 'Comments',
		achievements: [
			{
				id: 11,
				label: 'Leave 1 comment',
				progress: user.commentsCount,
				goal: 1
			},
			{
				id: 12,
				label: 'Leave 5 comments',
				progress: user.commentsCount,
				goal: 5
			},
			{
				id: 13,
				label: 'Leave 10 comments',
				progress: user.commentsCount,
				goal: 10
			},
			{
				id: 14,
				label: 'Leave 20 comments',
				progress: user.commentsCount,
				goal: 20
			},
			{
				id: 15,
				label: 'Leave 50 comments',
				progress: user.commentsCount,
				goal: 50
			}
		]
	}
]
