import CardsContainer from '../../Components/CardsContainer/CardsContainer'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, nextPage } from '../../Redux/actions';
import Filters from '../../utils/Filters';




const Home = () => {

    const dispatch = useDispatch();
    const drivers = useSelector(state => state.drivers);
    const [currentPage, setCurrentPage] = useState(0);
    //const teams = useSelector((state) => state.teams);
    

    useEffect(()=>{
        dispatch(getDrivers(currentPage))
    }, [])

    const handlePreviousPage = () => {
      const newPage = Math.max(0, currentPage - 1);
      setCurrentPage(newPage);
      dispatch(nextPage(newPage));
  };

  const handleNextPage = () => {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      dispatch(nextPage(newPage));
  };

    return (
      <>
        <div>
          <Filters/>
        </div>
        <div>
          <h1>Drivers</h1>
          <CardsContainer />
        </div>
        <div>
          <button onClick={handlePreviousPage}>Previous Page</button>
          <button onClick={handleNextPage}>Next Page</button>
        </div>
      </>
    );
}

export default Home;
