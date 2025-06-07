import { useEffect, useRef } from "react";
import styles from "./popup.module.css";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface WinnerProps {
    winnerUser: string;
    onClose: () => void;
}

const Popup = ({ winnerUser, onClose }: WinnerProps) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const users = useSelector((state: RootState) => state.users.users);

    const winnerObj = winnerUser !== "Draw"
        ? users.find(u => u.name === winnerUser)
        : null;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className={styles.popup} ref={popupRef}>
            <h1>{winnerUser === 'Draw' ? "Draw" : `${winnerUser} won. Congratulations!`}</h1>
            {winnerObj && <p>{`Total time: ${winnerObj.totalTime}s`}</p>}
            <button type="button" onClick={onClose}>OK</button>
        </div>
    );
};

export default Popup;