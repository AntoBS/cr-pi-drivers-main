import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterChanged, getTeams, resetFilters, orderChange } from "../Redux/actions";

const Filters = () => {
    const dispatch = useDispatch();
    const allTeams = useSelector((state) => state.teams);
    const filters = useSelector(state => state.filters);
    const order = useSelector(state => state.order);


    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        dispatch(filterChanged(name, value));
    };

    const handleOrderChange = (event) => {
        const { name, value } = event.target;

        dispatch(orderChange(name, value));
    };

    

    const handleReset = () => {
        dispatch(resetFilters());
    };


    useEffect(() => {
        dispatch(getTeams());
    }, [dispatch]);

    return (
        <div>
            <form>
                <label>
                    Team:
                    <select name="team" value={filters.team} onChange={handleFilterChange}>
                        <option value="default">All Teams</option>
                        {/* Render options dynamically based on allTeams */}
                        {allTeams.map((team) => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Source:
                    <select name="source" value={filters.source} onChange={handleFilterChange}>
                        <option value="default">All Sources</option>
                        <option value="api">API</option>
                        <option value="dbb">Database</option>
                    </select>
                </label>
                <label>
                    Birthday:
                    <select name="birthday" value={order.birthday} onChange={handleOrderChange}>
                        <option value="default">Birthday</option>
                        <option value="asc">Ascending Order</option>
                        <option value="dsc">Descending Order</option>
                    </select>
                </label>
                <label>
                    Alphabetically:
                    <select name="alphabetically" value={order.alphabetically} onChange={handleOrderChange}>
                        <option value="default">Alphabetically</option>
                        <option value="asc">A - Z</option>
                        <option value="dsc">Z - A</option>
                    </select>
                </label>
                <button type="button" onClick={handleReset}>Reset</button>
            </form>
        </div>
    );
};

export default Filters;

