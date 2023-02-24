import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { TodoList } from './todoList/todoList.jsx';
import { LoginPage } from './loginPage/loginPage.jsx';
import { RegisterPage } from './registerPage/registerPage.jsx';

const Router = ({ isAuth }) => {
	if (isAuth) {
		return (
			<Routes>
				<Route path='/login' element={<Navigate replace to='/' />} />
				<Route path='/register' element={<Navigate replace to='/' />} />
				<Route path='/' element={<TodoList />} />
			</Routes>
		);
	}
	return (
		<Routes>
			<Route path='/' element={<Navigate replace to='/login' />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
		</Routes>
	);
};

export default Router;
