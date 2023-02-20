import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/loginPage/loginPage';
import { RegisterPage } from './pages/registerPage/registerPage';
import { TodoList } from './pages/todoList/todoList';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<TodoList />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Routes>
		</div>
	);
}
export default App;
