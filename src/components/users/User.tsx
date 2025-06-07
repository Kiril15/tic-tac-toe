import { FC } from "react";
import styles from "./user.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const User: FC = () => {
    const users = useSelector((state: RootState) => state.users.users);

    return (
        <aside className={styles["User-wrapper"]}>
            {users.map((user, index: number) => (
                <div key={index}>
                    <h2 className={styles["User-title"]}>{user.name}</h2>
                    <p className={styles["User-items"]}>Symbol: {user.symbol}</p>
                    <p className={styles["User-items"]}>Wins: {user.wins}</p>
                    <p className={styles["User-items"]}>Total Time: {user.totalTime} seconds</p>
                </div>
            ))}
        </aside>
    )

}

export default User;