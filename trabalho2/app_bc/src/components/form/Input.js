import styles from '@/styles/form.module.css';

export default function Input({ type, text, name, placeholder, value, eventOnChange}) {
    return (
        <div className={styles.form_group}>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                id={name}
                name={name || ''}
                value={value || ''}
                className={styles.form_input}
                placeholder={placeholder || ''}
                onChange={eventOnChange}
            />
        </div>
    )
}