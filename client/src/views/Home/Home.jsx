import CardsContainer from '../../Components/CardsContainer/CardsContainer'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, nextPage, previousPage } from '../../Redux/actions';
import Filters from '../../utils/Filters';




const Home = () => {

  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const order = useSelector(state => state.order);
  const page = useSelector((state) => state.page)
  


  useEffect(() => {
    dispatch(getDrivers(page, filters, order))
  }, [page, filters, order])

  const handlePreviousPage = () => {
    dispatch(previousPage());
  };

  const handleNextPage = () => {
    dispatch(nextPage());
  };

  return (
    <>
      <div>
        <Filters />
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
