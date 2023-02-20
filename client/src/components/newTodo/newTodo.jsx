import React, { useState } from 'react'
import styles from './newTodo.module.css'

export const NewTodo = ({addTodo}) => {
	const [title, setTitle] = useState('')

	const change = e => {
		setTitle(e.target.value)
	}
	
	const click = e => {
		e.preventDefault()
		if(title.length) {
			addTodo(title.trim())
			setTitle('')
		}
	}

 	return (
		<form className={styles.newTodo}>
				<input type="text" placeholder='напишите заметку' value={title} onChange={change} />
				<button onClick={click} className={styles.add}>
					сохранить 
				</button>
		</form>
	)
}

