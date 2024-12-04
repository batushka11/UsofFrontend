import { Route, Routes } from 'react-router-dom'
import CategoryBoard from './components/categories/CategoryBoard'
import BookmarkPostsBoard from './components/posts/post-boards/BookmarkPostBoard'
import PostsBoard from './components/posts/post-boards/PostBoard'
import PostByCategoryBoard from './components/posts/post-boards/PostByCategory'
import SubscribesPostsBoard from './components/posts/post-boards/SubscribesPostBoard'
import UserPostsBoard from './components/posts/post-boards/UserPostBoars'
import CreatePost from './components/posts/post-operations/PostCreate'
import PostPageBoard from './components/posts/post-page-components/PostPageBoard'
import ProfileBoard from './components/profile/ProfileBoard'
import UserProfileBoard from './components/users/UserProfile/UserProfileBorder'
import UsersBoard from './components/users/UsersBoard'
import ProtectedRoute from './helpers/ProtectedRoute'
import ConfirmAccountPage from './pages/auth/ConfirmAccountPage'
import LoginPage from './pages/auth/LoginPage'
import NewPasswordPage from './pages/auth/NewPasswordPage'
import RegisterPage from './pages/auth/RegisterPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import NotFoundPage from './pages/errors/404'
import LandingPage from './pages/LandingPage'
import Page from './pages/Pages'

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/password-reset" element={<ResetPasswordPage />} />
			<Route path="/confirmation/:token" element={<ConfirmAccountPage />} />
			<Route path="/password-reset/:token" element={<NewPasswordPage />} />
			<Route
				path="/home/:id"
				element={
					<ProtectedRoute>
						<Page content=<PostsBoard /> height="100vh" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/my-profile"
				element={
					<ProtectedRoute>
						<Page content=<ProfileBoard /> height="200vh" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/bookmarks/:id"
				element={
					<ProtectedRoute>
						<Page content=<BookmarkPostsBoard /> height="100vh" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/subscribes/:id"
				element={
					<ProtectedRoute>
						<Page content=<SubscribesPostsBoard /> height="100vh" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/my-posts/:id"
				element={
					<ProtectedRoute>
						<Page content=<UserPostsBoard /> height="100vh" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/post/:id"
				element={
					<ProtectedRoute>
						<Page content=<PostPageBoard /> height="100vh" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/create-post"
				element={
					<ProtectedRoute>
						<Page content=<CreatePost /> height="100vh" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/categories"
				element={
					<ProtectedRoute>
						<Page content=<CategoryBoard /> height="100vh" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/category/:id/posts/:page"
				element={
					<ProtectedRoute>
						<Page content=<PostByCategoryBoard /> height="100vh" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/users/:id"
				element={
					<ProtectedRoute>
						<Page content=<UsersBoard /> height="100vh" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/user/:id/posts/:pageN"
				element={
					<ProtectedRoute>
						<Page content=<UserProfileBoard /> height="100vh" />
					</ProtectedRoute>
				}
			/>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	)
}

export default App
