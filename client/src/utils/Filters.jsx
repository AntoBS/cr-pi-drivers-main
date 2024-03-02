import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDrivers, getDrivers } from "../Redux/actions";

const Filters = () => {
    const dispatch = useDispatch();
    const allTeams = useSelector((state) => state.teams);
    const [filter, setFilter] = useState({
        team: 'default',
        source: 'default'
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilter({ ...filter, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(filterDrivers(filter));
    };

    const handleReset = () => {
        setFilter({ team: 'default', source: 'default' });
        dispatch(getDrivers());
    };

    useEffect(() => {
        if (Object.values(filter).find(e => e !== 'default')) {
            dispatch(filterDrivers(filter));
        }
    }, [filter, dispatch]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Team:
                    <select name="team" value={filter.team} onChange={handleChange}>
                        <option value="default">All Teams</option>
                        {/* Render options dynamically based on allTeams */}
                        {allTeams.map((team) => (
                            <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Source:
                    <select name="source" value={filter.source} onChange={handleChange}>
                        <option value="default">All Sources</option>
                        <option value="api">API</option>
                        <option value="dbb">Database</option>
                    </select>
                </label>
                <button type="submit">Apply Filter</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </form>
        </div>
    );
};

export default Filters;

