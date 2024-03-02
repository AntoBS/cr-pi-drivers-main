import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css'

const Card = ({name, teams, image, id}) => {
    return(
        <div className={style.card}>
            <Link to={`/detail/${id}`} className={style.link}>
            <img src={image} alt={`${name}`}/>
            <div>
                <h2>{name}</h2>
            </div>
            </Link>
        </div>
    )
}

export default Card
