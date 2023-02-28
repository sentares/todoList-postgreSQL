import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import ModalEdit from '../../components/modalEdit/ModalEdit'
import { useHttp } from '../../hooks/useHttp'
import styles from './specialTodo.module.css'

const SpecialTodo = () => {
	const { request, loader } = useHttp()
	const [todo, setTodo] = useState([])
	const params = useParams()
	const { id_post } = params
	const [openModal, setOpenModal] = useState(false)

	const handleModal = () => {
		setOpenModal(!openModal)
	}

	const getSpecialTodo = async () => {
		const { data } = await request(`/post/special/${id_post}`)
		setTodo(data)
		return loader
	}

	useEffect(() => {
		getSpecialTodo(id_post)
	}, [id_post])

	return (
		<div>
			{todo.length &&
				todo.map(item => (
					<React.Fragment key={item.id_post}>
						{openModal && <ModalEdit item={item} setOpenModal={setOpenModal} getSpecialTodo={getSpecialTodo} />}
						<div className={styles.specialItem}>
							<div className={styles.infoBlock}>
								<div className={styles.title}>{item.title}</div>
								<button onClick={handleModal} className={styles.checkPoint}>
									<BiPencil />
								</button>
							</div>
							<div>Дата создания: {item.date}</div>
						</div>
					</React.Fragment>
				))}
		</div>
	)
}

export default SpecialTodo
