import { observer } from 'mobx-react-lite'
import style from './user-list.module.css'
import { useContext } from 'react'
import { LOAD_ERROR, LOAD_PENDING, LOAD_DONE } from '../../stores/user-store'
import { StoreContext } from '../../main'
import { MyFilterSelect } from '../UI/MySelect/my-select'

export const UserList = observer(({showUser}) => {
    const {users} = useContext(StoreContext)

    function renderSwitch(condition) {
        switch(condition) {
            case LOAD_PENDING:
                return <h1 className={style.pending}>Загрузка...</h1>
            case LOAD_DONE:
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <span>
                                        ФИО
                                    </span>
                                    <MyFilterSelect onChange={e => users.sortByProp("fio", e.target.value)}/>
                                </th>
                                <th>
                                    <span>
                                        Возраст
                                    </span>
                                    <MyFilterSelect onChange={e => users.sortByProp("age", e.target.value)}/>
                                </th>
                                <th>
                                    <span>
                                        Пол
                                    </span>
                                    <MyFilterSelect onChange={e => users.sortByProp("gender", e.target.value)}/>
                                </th>
                                <th>Номер телефона</th>
                                <th>
                                    <span>
                                        Адрес
                                    </span>
                                    <MyFilterSelect onChange={e => users.sortByProp("fullAddress", e.target.value)}/>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.getUsers.map(user => (
                                    <tr key={user.id} onClick={(e) => showUser(user.id)}>
                                        <td>{user.fio}</td>
                                        <td>{user.age}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.fullAddress}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            case LOAD_ERROR:
                return <h1 className={style.error}>{users.errorMessage}</h1>
        }
    }
    
    return (
        <div className={style.content}>
            {
                renderSwitch(users.loadStatus)
            }
        </div>
    )
})