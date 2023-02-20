import React from 'react'
import styles from './todoItem.module.css'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {FaTrash} from 'react-icons/fa'

export const TodoItem = ({item, removeTodo, changeTodo}) => {

	return (
		<>
			<div className={styles.todoItem}>
			<div className={styles.title}>
				{item.title}
			</div>
			<div className={styles.checkPoint}>
				<button onClick={changeTodo.bind(null, item.id_post, item.completed)} className={styles}>
						<AiOutlineCheckCircle className={item.completed ? (styles.checkTrue) : (styles.checkFalse) }/>
				</button>
				<button onClick={removeTodo.bind(null, item.id_post)} >
					<FaTrash  className={styles.trash}/>
				</button>
			</div>
		</div>
		</>
	)
}


