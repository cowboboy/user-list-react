import { observer } from 'mobx-react-lite'
import style from './user-list.module.css'
import { useEffect } from 'react'
import { ASC_SORT, DEFAULT_SORT, DESC_SORT } from '../../stores/userStore'

export const UserList = observer(({userStore}) => {
    
    return (
        <div className={style.content}>
            {
                userStore.isLoading ?
                     <h1>Загрузка...</h1>
                     :
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <span>
                                        ФИО
                                    </span>
                                    <select defaultValue={DEFAULT_SORT} onChange={e => userStore.sortByProp("lastName", e.target.value)}>
                                        <option value={DEFAULT_SORT}>Без сортировки</option>
                                        <option value={ASC_SORT}>По возрастанию</option>
                                        <option value={DESC_SORT}>По убыванию</option>
                                    </select>
                                </th>
                                <th>Возраст</th>
                                <th>Пол</th>
                                <th>Номер телефона</th>
                                <th>Адрес</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userStore.users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.lastName + " " + user.firstName + " " + user.maidenName}</td>
                                        <td>{user.age}</td>
                                        <td>{user.gender}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.address.city + " " + user.address.address}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
})