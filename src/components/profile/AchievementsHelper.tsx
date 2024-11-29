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
			{ id: 5, label: 'Create 50 posts', progress: user.postsCount, goal: 50 },
			{
				id: 6,
				label: 'Create 100 posts',
				progress: user.postsCount,
				goal: 100
			},
			{
				id: 7,
				label: 'Create 200 posts',
				progress: user.postsCount,
				goal: 200
			},
			{
				id: 8,
				label: 'Create 500 posts',
				progress: user.postsCount,
				goal: 500
			},
			{
				id: 9,
				label: 'Create 1000 posts',
				progress: user.postsCount,
				goal: 1000
			},
			{
				id: 10,
				label: 'Create 2000 posts',
				progress: user.postsCount,
				goal: 2000
			}
		]
	},
	{
		category: 'Reactions',
		achievements: [
			{
				id: 11,
				label: 'Add 1 reaction',
				progress: user.reactionsCount,
				goal: 1
			},
			{
				id: 12,
				label: 'Add 10 reactions',
				progress: user.reactionsCount,
				goal: 10
			},
			{
				id: 13,
				label: 'Add 25 reactions',
				progress: user.reactionsCount,
				goal: 25
			},
			{
				id: 14,
				label: 'Add 50 reactions',
				progress: user.reactionsCount,
				goal: 50
			},
			{
				id: 15,
				label: 'Add 100 reactions',
				progress: user.reactionsCount,
				goal: 100
			},
			{
				id: 16,
				label: 'Add 250 reactions',
				progress: user.reactionsCount,
				goal: 250
			},
			{
				id: 17,
				label: 'Add 500 reactions',
				progress: user.reactionsCount,
				goal: 500
			},
			{
				id: 18,
				label: 'Add 1000 reactions',
				progress: user.reactionsCount,
				goal: 1000
			},
			{
				id: 19,
				label: 'Add 2000 reactions',
				progress: user.reactionsCount,
				goal: 2000
			},
			{
				id: 20,
				label: 'Add 5000 reactions',
				progress: user.reactionsCount,
				goal: 5000
			}
		]
	},
	{
		category: 'Comments',
		achievements: [
			{
				id: 21,
				label: 'Leave 1 comment',
				progress: user.commentsCount,
				goal: 1
			},
			{
				id: 22,
				label: 'Leave 5 comments',
				progress: user.commentsCount,
				goal: 5
			},
			{
				id: 23,
				label: 'Leave 10 comments',
				progress: user.commentsCount,
				goal: 10
			},
			{
				id: 24,
				label: 'Leave 20 comments',
				progress: user.commentsCount,
				goal: 20
			},
			{
				id: 25,
				label: 'Leave 50 comments',
				progress: user.commentsCount,
				goal: 50
			},
			{
				id: 26,
				label: 'Leave 100 comments',
				progress: user.commentsCount,
				goal: 100
			},
			{
				id: 27,
				label: 'Leave 250 comments',
				progress: user.commentsCount,
				goal: 250
			},
			{
				id: 28,
				label: 'Leave 500 comments',
				progress: user.commentsCount,
				goal: 500
			},
			{
				id: 29,
				label: 'Leave 1000 comments',
				progress: user.commentsCount,
				goal: 1000
			},
			{
				id: 30,
				label: 'Leave 2000 comments',
				progress: user.commentsCount,
				goal: 2000
			}
		]
	}
]
