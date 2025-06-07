import style from './select.module.css';

interface SelectProps {
    value: number;
    onChange: (value: number) => void;
}

const Select = ({ value, onChange }: SelectProps) => {
    return (
        <select
            className={style.select}
            value={value}
            onChange={e => onChange(Number(e.target.value))}
        >
            <option value={9}>3x3</option>
            <option value={36}>6x6</option>
            <option value={81}>9x9</option>
        </select>
    );
};

export default Select;