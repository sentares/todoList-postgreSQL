import React, { useEffect, useState } from 'react'
import { NewTodo } from '../../components/newTodo/newTodo'
import { TodoItem } from '../../components/todoItem.jsx/todoItem'
import { useHttp } from '../../hooks/useHttp'
import styles from './todolist.module.css'
import { Loader } from '../../loader/Loader'
import { AppContext } from '../../hooks/Contex.jsx'

export const TodoList = () => {
	const { logout } = React.useContext(AppContext)
	const { request, loader } = useHttp()
	const [todos, setTodos] = useState([])

	const getTodo = async () => {
		// const res = await fetch('http://localhost:4000/api/post')
		// const {data} = await res.json()
		const { data } = await request('/post')
		setTodos(data)
		return loader
	}

	const changeTodo = async (id_post, completed) => {
		// await fetch('http://localhost:4000/api/post', {
		// 	method: 'PUT',
		// 	body: JSON.stringify({id_post, completed}),
		// 	headers: {'Content-Type' : 'application/json'}
		// })
		await request('/post', 'PUT', { id_post, completed })
		setTodos(todos.map(todo => (todo.id_post == id_post ? { ...todo, completed: !todo.completed } : todo)))
	}

	const removeTodo = async id => {
		await request(`/post/${id}`, 'DELETE')
		setTodos(todos.filter(todo => todo.id_post !== id))
	}

	const addTodo = async title => {
		// await fetch('http://localhost:4000/api/post', {
		// 	method: 'POST',
		// 	body: JSON.stringify({title}),
		// 	headers: {'Content-Type' : 'application/json'}
		// })
		await request('/post', 'POST', { title })
		setTodos(prev => [
			{
				id_post: Date(),
				title: title,
				completed: false
			},
			...prev
		])
	}

	useEffect(() => {
		getTodo()
	}, [])

	return (
		<>
			<div className={styles.todoList}>
				<div className={styles.sighInBlock}>
					<button onClick={logout} className={styles.buttonSignIn}>
						Выйти
					</button>
				</div>
				<div className={styles.info}>
					<h1 className={styles.text}>ToDo List</h1>
				</div>
				<div className={styles.inputBlock}>
					<NewTodo key={todos.id} addTodo={addTodo} />
				</div>
				<h2>Ваши заметки</h2>
				{loader ? (
					<div className={styles.loader}>
						<Loader />
					</div>
				) : (
					<div className={styles.todos}>
						{todos.length > 0 ? (
							<div className={styles.todoIt}>
								{todos.map(item => (
									<TodoItem key={item.id_post} item={item} removeTodo={removeTodo} changeTodo={changeTodo} />
								))}
							</div>
						) : (
							<div className={styles.emptyPosts}>Пока нет заметок 😕</div>
						)}
					</div>
				)}
			</div>
		</>
	)
}
