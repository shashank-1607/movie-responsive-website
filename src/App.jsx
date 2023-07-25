import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";

// useDispatch--> used to call the actions and useSelector--> used to raed data from store
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/404/pageNotFound";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  //To save any data in store we have to call the actions and the actions are called using dispatch
  const dispatch = useDispatch();

  //Below parameter state will have all of the initialState which are inside homeSlice
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
    genresAll();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      // console.log(res);

      const url = {
        //here we are fetching base url and size key. In every image "original" key will be present so for our convenience we are using that
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url)); //here we are calling the getApiConfiguration(res) action and passing the response to save it in the redix store
    });
  };

  const genresAll = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    // console.log(data)
    //below we are destructuring the data
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    // console.log(allGenres)

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
