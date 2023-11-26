import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
	Landing,
	Home,
	Auth,
	Shortlink,
	Profile,
	CreateShortlink,
	Error,
} from './pages';
import { SharedLayout, ProtectedRoute } from './components';
import Redirector from './components/Redirector';

function App() {
	// console.log(window.location.host);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Home />} />
					<Route path='shortlinks/:shortlinkId' element={<Shortlink />} />
					<Route path='profile' element={<Profile />} />
					<Route path='create' element={<CreateShortlink />} />
					<Route path='edit/:shortlinkId' element={<CreateShortlink />} />
				</Route>

				<Route path='/' element={<SharedLayout />}>
					<Route path='welcome' element={<Landing />} />
					<Route path='auth' element={<Auth />} />
				</Route>

				<Route path='r/:shortlink' element={<Redirector />} />

				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
