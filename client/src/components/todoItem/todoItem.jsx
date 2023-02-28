import React from 'react'
import styles from './todoItem.module.css'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const TodoItem = ({ item, removeTodo, changeTodo }) => {
	const { id_post } = item

	return (
		<>
			<Link to={`/post/${id_post}`}>
				<div className={styles.todoItem}>
					<div className={styles.title}>{item.title}</div>
					<div className={styles.checkPoint}>
						<button
							onClick={e => {
								e.preventDefault()
								changeTodo(item.id_post, item.completed)
							}}
							className={styles}
						>
							<AiOutlineCheckCircle className={item.completed ? styles.checkTrue : styles.checkFalse} />
						</button>
						<button
							onClick={e => {
								e.preventDefault()
								removeTodo(item.id_post)
							}}
						>
							<FaTrash className={styles.trash} />
						</button>
					</div>
				</div>
			</Link>
		</>
	)
}
