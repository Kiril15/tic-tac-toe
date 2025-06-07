import styles from "./square.module.css"

interface SquareProps {
    value: string;
    squareValue: () => void;
    size: number;
}

const Square = ({value, squareValue, size}: SquareProps) => {
    let squareClass = styles.square;
    if (size === 9) squareClass += ` ${styles.squareSmall}`;
    if (size === 36) squareClass += ` ${styles.squareMedium}`;
    if (size === 81) squareClass += ` ${styles.squareLarge}`;

    return (
        <button className={squareClass} onClick={squareValue}>{value}</button>
    )
}

export default Square;


