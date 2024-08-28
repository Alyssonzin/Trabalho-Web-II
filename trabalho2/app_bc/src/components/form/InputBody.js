import styles from '@/styles/form.module.css';

export default function Input({ text, name, placeholder, eventOnChange, value }) {
    return (
        <div className={styles.form_group}>
            <label htmlFor={name} className={styles.form_label}>{text}</label>
            <textarea
                id={name}
                name={name}
                className={styles.form_input_body}
                value={value || ''}
                placeholder={placeholder}
                onChange={eventOnChange}
            ></textarea>
        </div>
    )
}