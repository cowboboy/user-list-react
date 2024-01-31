import { observer } from 'mobx-react-lite'
import style from './user-list.module.css'
import { useContext, useState, useRef } from 'react'
import { LOAD_ERROR, LOAD_PENDING, LOAD_DONE } from '../../stores/user-store'
import { StoreContext } from '../../main'
import { MyFilterSelect } from '../UI/MySelect/my-select'

const columns = [
    {
        text: "ФИО",
        sortProp: "fio"
    },
    {
        text: "Возраст",
        sortProp: "age"
    },
    {
        text: "Пол",
        sortProp: "gender"
    },
    {
        text: "Номер телефона",
        sortProp: ""
    },
    {
        text: "Адрес",
        sortProp: "fullAddress"
    }
]

export const UserList = observer(({showUser}) => {
    const {users} = useContext(StoreContext)

    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef();

    const handleResize = (columnKey, width) => {
        setColumnWidths({ ...columnWidths, [columnKey]: width });
    };

    function handleMouseDown(e, column) {
        const startX = e.pageX;
        const startWidth = e.target.getBoundingClientRect().width;
        const handleMouseMove = moveEvent => {
            const newWidth =startWidth + moveEvent.pageX - startX;
            handleResize(column.text, newWidth);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);                                        
    }

    function renderSwitch(condition) {
        switch(condition) {
            case LOAD_PENDING:
                return <h1 className={style.pending}>Загрузка...</h1>
            case LOAD_DONE:
                return (
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                {
                                    columns.map(column => (
                                        <th
                                            style={{
                                                minWidth: "50px",
                                                width: columnWidths[column.text] || 'auto'
                                            }}
                                            onMouseDown={e => handleMouseDown(e, column)}
                                            key={column.text}
                                        >
                                            <span>
                                                {column.text}
                                            </span>
                                            {column.sortProp && <MyFilterSelect onChange={e => users.sortByProp(column.sortProp, e.target.value)}/>}
                                        </th>
                                    ))
                                }
                                
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
                return <div className={style.error}><h1>{users.errorMessage}</h1></div>
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