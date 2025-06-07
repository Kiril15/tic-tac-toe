import { FC, useEffect, useState, useRef, useCallback } from "react";
import styles from "./Board.module.css"
import Square from "../Square/Square";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { generateWinnerCombinations } from "../winner/winner";
import { incrementWins, incrementTime, resetTime } from "../users/usersSlice";
import Popup from "../popup/popup";
import Select from "../select/select";

const Board: FC = () => {
    const users = useSelector((state: RootState) => state.users.users);
    const dispatch = useDispatch();
    const [isNextX, setIsNextX] = useState(true);
    const [size, setSize] = useState(9);
    const [activeSize, setActiveSize] = useState(9);
    const [winnerUser, setWinnerUser] = useState<string | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [square, setSquare] = useState(Array(9).fill(null))

    const winnerCombinations = generateWinnerCombinations(Math.sqrt(activeSize));

    useEffect(() => {
        const currentSymbol = isNextX ? "X" : "O";
        timerRef.current = setInterval(() => {
            dispatch(incrementTime(currentSymbol));
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isNextX, dispatch]);

    const gameReload = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        dispatch(resetTime());
        setActiveSize(size);
        setSquare(Array(size).fill(null));
        setIsNextX(true);
    }

    const squareValue = (i: number) => {
        if(square[i]) return;
        if(winnerUser) return;
        let newSquare = square.slice();
        newSquare[i] = (isNextX ? 'X' : 'O');
        setIsNextX(!isNextX);
        setSquare(newSquare);
    }

    const checkWinner = useCallback(() => {
        for (let combination of winnerCombinations) {
            const first = square[combination[0]];
            if (!first) continue;
            if (combination.every(idx => square[idx] === first)) {
                return first;
            }
        }
        return null;
    }, [square, users, winnerCombinations]);

    const currentUser = isNextX
        ? users.find(u => u.symbol === "X")
        : users.find(u => u.symbol === "O");

    useEffect(() => {
        if (winnerUser) return;
        const winnerSymbol = checkWinner();
        if (winnerSymbol) {
            const winnerObj = users.find(u => u.symbol === winnerSymbol);
            setWinnerUser(winnerObj ? winnerObj.name : winnerSymbol);
            dispatch(incrementWins(winnerSymbol));
            if (timerRef.current) clearInterval(timerRef.current);
        } else if (square.every(cell => cell)) {
            setWinnerUser("Draw");
            if (timerRef.current) clearInterval(timerRef.current);
        }
    }, [square]);

    const handleSizeChange = (newSize: number) => {
        setSize(newSize);
        if (square.every(cell => cell === null)) {
            setActiveSize(newSize);
            setSquare(Array(newSize).fill(null));
            setIsNextX(true);
            setWinnerUser(null);
            dispatch(resetTime());
        }
    };

    return (
        <div className={styles['board-wrapper']}>
            <Select value={size} onChange={handleSizeChange}/>
            <h1 className={styles['board-title']}>
                Move player: {currentUser ? currentUser.name : ''}
            </h1>
            <div className={styles.board}
                style={{
                    gridTemplateColumns: `repeat(${Math.sqrt(activeSize)}, 1fr)`,
                    gridTemplateRows: `repeat(${Math.sqrt(activeSize)}, 1fr)`
                }}>
                {square.map((square: string, index: number) => {
                    return (
                        <Square key={index}
                                value={square}
                                size={activeSize}
                                squareValue={() => squareValue(index)}/>
                    )
                })}
            </div>
            <button className={styles.button} type="button" onClick={gameReload}>New game</button>
            {winnerUser && 
                <Popup
                    winnerUser={winnerUser}
                    onClose={() => setWinnerUser(null)}
                />
            }
        </div>
    )
}

export default Board;