import { observer } from "mobx-react-lite"
import style from "./modal.module.css"
import { useContext, useEffect } from "react"
import { StoreContext } from "../../../main"

export const Modal = observer(({isVisible, userId, hide}) => {
    const {users} = useContext(StoreContext)

    let aUser

    const styles = [style.modal]
    if (isVisible) {
        styles.push(style.active)
        aUser = users.getUser(userId)
    }
    

    return (
        <div className={styles.join(" ")} onClick={()=>hide()}>
            {
                aUser &&
                <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                        <p className={style.modalFields}>ФИО</p>
                        <p>{aUser.fio}</p>
                        <p className={style.modalFields}>Возраст</p>
                        <p>{aUser.age}</p>
                        <p className={style.modalFields}>Пол</p>
                        <p>{aUser.gender}</p>
                        <p className={style.modalFields}>Номер телефона</p>
                        <p>{aUser.phone}</p>
                        <p className={style.modalFields}>Адрес</p>
                        <p>{aUser.fullAddress}</p>
                </div>
            }
        </div>
    )
})