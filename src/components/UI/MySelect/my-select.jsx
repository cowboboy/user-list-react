import { ASC_SORT, DEFAULT_SORT, DESC_SORT } from '../../../stores/user-store'
import styles from './my-select.module.css'

export const MyFilterSelect = ({...props}) => {
    return (
        <select className={styles.mySelect} defaultValue={DEFAULT_SORT} {...props}>
            <option value={DEFAULT_SORT}>Без сортировки</option>
            <option value={ASC_SORT}>По возрастанию</option>
            <option value={DESC_SORT}>По убыванию</option>
        </select>
    )
}