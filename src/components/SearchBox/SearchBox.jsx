import { selectFilterValue } from '../../redux/filters/selectors';
import { setFilterValue } from '../../redux/filters/slice';
import css from './SearchBox.module.css'

import { useDispatch, useSelector } from 'react-redux';

const SearchBox = () => {
    const dispatch = useDispatch();

    const filterValue = useSelector(selectFilterValue);

    const handleFilter = (e) => {
        const value = e.target.value;
        dispatch(setFilterValue(value));
    };

    return (
        <div className={css.searchBox}>
            <p>Find contact by name</p>
            <input className={css.input} type="text" value={filterValue} onInput={handleFilter} />
        </div>
    );
}

export default SearchBox