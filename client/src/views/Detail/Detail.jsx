import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDriverDetail } from "../../Redux/actions";
import { Link } from "react-router-dom";


const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const driver = useSelector((state) => state.detail);

    useEffect(() => {
        console.log('ID del Driver:', id);
        dispatch(getDriverDetail(id));
    }, [dispatch, id])

    console.log('Detalle del Driver:', driver);

    if(!driver){
        return('carggando')
    }

    return(
       <div>
        <div>
        {/* <Link to={"/home"}>
        </Link> */}
        </div>
        <div>
            <h1>{driver.name} {driver.surname}</h1>
        </div>
        <div>
            <p>Nationality: {driver.nationality} &#127757;</p>
            <p>Description: {driver.description}</p>
            <p>Teams: {driver.teams}&#127950;&#65039;	</p>
        </div>
        <div>
            <img src={driver.image} alt={driver.name} />
        </div>
       </div>
    )
}

export default Detail