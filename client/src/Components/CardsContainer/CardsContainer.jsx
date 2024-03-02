import React from "react";
import { useSelector } from "react-redux";
import Card from '../Card/Card';
import style from './CardsContainer.module.css'


const CardsContainer = () => {
    const drivers = useSelector(state=>state.drivers)
    //const teams = useSelector((state) => state.teams)
    return(
        <div className={style.container}>
           {Array.isArray(drivers) && drivers.map(drivers=>{
            return <Card
                key={drivers.id}
                name={drivers.name}
                image={drivers.image}
                teams={drivers.teams}
                id={drivers.id}
            />
           })}
        </div>
    )
}

export default CardsContainer;