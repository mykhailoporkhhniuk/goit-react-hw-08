import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";

import css from './UserMenu.module.css'

const UserMenu = () => {
    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    const onLogout = () => {
        dispatch(logout());
    }

    return (
        <div className={css.userMenu}>
            <p className={css.userText}>
                Welcome, <b>{user.name}!</b>
            </p>

            <button className={css.button} type="button" onClick={onLogout}>Logout</button>
        </div>
    );
}

export default UserMenu