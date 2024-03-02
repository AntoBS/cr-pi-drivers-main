import { Link } from "react-router-dom";

const Landing = () => {
    return(
        <>
            <h1>Esta en la vista de Landing</h1>
            <div >
        <Link to="/home">
          <button >Ingresar</button>
        </Link>
      </div>
        </>
    )
}

export default Landing;
