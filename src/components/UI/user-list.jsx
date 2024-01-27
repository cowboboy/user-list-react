import style from './user-list.module.css'

export const UserList = ({users, isUsersLoad}) => {
    
    return (
        <div className={style.content}>
            {
                isUsersLoad ?
                    <h1>Загрузка...</h1>
                    :
                    <table>
                        <thead>
                            <tr>
                                <td>ФИО</td>
                                <td>Возраст</td>
                                <td>Пол</td>
                                <td>Номер телефона</td>
                                <td>Адрес</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
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
}