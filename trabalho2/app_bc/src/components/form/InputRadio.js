import styles from '@/styles/form.module.css'

export default function InputRadio({ titulo, name, options, eventOnChange }) {
    return (

        <div className={styles.form_group}>
            <h3>{titulo}</h3>

            {
                options.map((option, index) => {
                    return (
                        <label htmlFor={name} key={index}>
                            <span>{option.text}</span>
                            <input type='radio' name={name} value={option.value} onChange={eventOnChange} />
                        </label>
                    )
                })
            }
        </div>

    )
}