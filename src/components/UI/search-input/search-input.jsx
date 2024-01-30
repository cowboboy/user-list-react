import styles from './search-input.module.css'

export const SearchInput = ({...props}) => {
    
    return (
        <input {...props} className={styles.searchInput} placeholder="Поиск..."></input>
    )
}