import { Route, Routes } from 'react-router-dom'
import BookmarkPostsBoard from './components/posts/post-boards/BookmarkPostBoard'
import PostsBoard from './components/posts/post-boards/PostBoard'
import SubscribesPostsBoard from './components/posts/post-boards/SubscribesPostBoard'
import UserPostsBoard from './components/posts/post-boards/UserPostBoars'
import CreatePost from './components/posts/post-operations/PostCreate'
import PostPageBoard from './components/posts/post-page-components/PostPageBoard'
import ProfileBoard from './components/profile/ProfileBoard'
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
				path="/home"
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
						<Page content=<ProfileBoard /> height="calc(100vh - 106px)" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/bookmarks"
				element={
					<ProtectedRoute>
						<Page content=<BookmarkPostsBoard /> height="100vh" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/subscribes"
				element={
					<ProtectedRoute>
						<Page content=<SubscribesPostsBoard /> height="100vh" />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/my-posts"
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
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	)
}

export default App
