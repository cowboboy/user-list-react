import { observer } from 'mobx-react-lite'
import style from './user-list.module.css'
import { useEffect } from 'react'
import { ASC_SORT, DEFAULT_SORT, DESC_SORT, LOAD_ERROR, LOAD_PENDING, LOAD_DONE } from '../../stores/userStore'

export const UserList = observer(({userStore}) => {

    function renderSwitch(condition) {
        switch(condition) {
            case LOAD_PENDING:
                return <h1>Загрузка...</h1>
            case LOAD_DONE:
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <span>
                                        ФИО
                                    </span>
                                    <select defaultValue={DEFAULT_SORT} onChange={e => userStore.sortByProp("fio", e.target.value)}>
                                        <option value={DEFAULT_SORT}>Без сортировки</option>
                                        <option value={ASC_SORT}>По возрастанию</option>
                                        <option value={DESC_SORT}>По убыванию</option>
                                    </select>
                                </th>
                                <th>
                                    <span>
                                        Возраст
                                    </span>
                                    <select defaultValue={DEFAULT_SORT} onChange={e => userStore.sortByProp("age", e.target.value)}>
                                        <option value={DEFAULT_SORT}>Без сортировки</option>
                                        <option value={ASC_SORT}>По возрастанию</option>
                                        <option value={DESC_SORT}>По убыванию</option>
                                    </select>
                                </th>
                                <th>
                                    <span>
                                        Пол
                                    </span>
                                    <select defaultValue={DEFAULT_SORT} onChange={e => userStore.sortByProp("gender", e.target.value)}>
                                        <option value={DEFAULT_SORT}>Без сортировки</option>
                                        <option value={ASC_SORT}>По возрастанию</option>
                                        <option value={DESC_SORT}>По убыванию</option>
                                    </select>
                                </th>
                                <th>Номер телефона</th>
                                <th>
                                    <span>
                                        Адрес
                                    </span>
                                    <select defaultValue={DEFAULT_SORT} onChange={e => userStore.sortByProp("fullAddress", e.target.value)}>
                                        <option value={DEFAULT_SORT}>Без сортировки</option>
                                        <option value={ASC_SORT}>По возрастанию</option>
                                        <option value={DESC_SORT}>По убыванию</option>
                                    </select>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userStore.getUsers.map(user => (
                                    <tr key={user.id}>
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
                return <h1>userStore.error</h1>
        }
    }
    
    return (
        <div className={style.content}>
            {
                renderSwitch(userStore.loadStatus)
            }
        </div>
    )
})