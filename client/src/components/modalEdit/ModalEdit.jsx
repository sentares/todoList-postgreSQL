import React, { useEffect, useState } from 'react'
import styles from './modalEdit.module.css'
import { MdOutlineClose } from 'react-icons/md'
import { useHttp } from '../../hooks/useHttp'

const ModalEdit = ({ item, setOpenModal, getSpecialTodo }) => {
	const [title, setTitle] = useState(item.title)
	const { id_post } = item
	const { request } = useHttp()

	const changeTitle = e => {
		e.preventDefault()
		setTitle(e.target.value)
	}

	const clickCloseModal = e => {
		e.preventDefault()
		setOpenModal(false)
	}

	const changeTodoTitle = async (id_post, title) => {
		await request(`/post/special/${id_post}`, 'PUT', { title })
		setOpenModal(false)
		await getSpecialTodo()
	}

	return (
		<div className={styles.modal}>
			<div className={styles.content}>
				<div className={styles.close}>
					<button className={styles.closeIcon} onClick={clickCloseModal}>
						<MdOutlineClose />
					</button>
				</div>
				<div className={styles.text}>
					<div className={styles.inputBlock}>
						<input className={styles.input} type='text' placeholder={title} onChange={changeTitle} />
					</div>
					<div className={styles.buttonBlock}>
						<button
							className={styles.save}
							onClick={() => {
								changeTodoTitle(id_post, title)
							}}
						>
							Сохранить
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ModalEdit
