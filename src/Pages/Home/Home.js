import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";
import {fetchDataWithToken} from "../../Components/Redux/TokenSlice";
import HomeContent from "./HomeContent/HomeContent";

function Home() {
  const dispatch = useDispatch();

  const {token, data, loading, error} = useSelector((state) => state.token);
  console.log(token, loading, data);

  useEffect(() => {
    if (token) {
      dispatch(fetchDataWithToken(token)); // Dispatch to fetch data when token is available
    }
  }, [token, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    // return <div>Error: {error}</div>; // Show error if there's any issue with data fetching
  }
  return (
    <div className='home-container'>
        <Navbar contentComponent = {HomeContent}/>
    </div>
  );
}

export default Home;
