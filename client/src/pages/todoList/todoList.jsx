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
	const { user } = React.useContext(AppContext)
	const id_user = user.id_user

	const getTodo = async id_user => {
		const { data } = await request(`/post?id_user=${id_user}`)
		setTodos(data)
		return loader
	}

	const changeTodo = async (id_post, completed) => {
		await request('/post', 'PUT', { id_post, completed })
		setTodos(todos.map(todo => (todo.id_post == id_post ? { ...todo, completed: !todo.completed } : todo)))
	}

	const removeTodo = async id => {
		await request(`/post/${id}`, 'DELETE')
		setTodos(todos.filter(todo => todo.id_post !== id))
	}

	const addTodo = async title => {
		await request('/post', 'POST', { title, id_user })
		setTodos(prev => [
			{
				id_post: Date(),
				title: title,
				completed: false,
				id_user
			},
			...prev
		])
		console.log(id_user)
	}

	useEffect(() => {
		getTodo(id_user)
	}, [])

	const nameOfUser = user.name.toUpperCase()

	return (
		<>
			<div className={styles.todoList}>
				<div className={styles.sighInBlock}>
					<button onClick={logout} className={styles.buttonSignIn}>
						Выйти
					</button>
				</div>
				<div className={styles.info}>
					<h1 className={styles.text}>{nameOfUser}</h1>
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
