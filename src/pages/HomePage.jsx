import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelsThunk } from "../store/slices/products.slice";
import HotelCard from "../components/HomePage/HotelCard";
import "./styles/HomePage.css";
import FilterByName from "../components/HomePage/FilterByName";
import FilterByCity from "../components/HomePage/FilterByCity";
import FilterByPrice from "../components/HomePage/FilterByPrice";

const HomePage = () => {
  const [nameFiltered, setNameFiltered] = useState("");
  const [priceFiltered, setPriceFiltered] = useState({
    from: 0,
    to: Infinity,
  });
  const [filtersAreOpen, setFiltersAreOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const url = "https://hotels-api.academlo.tech/hotels";

    setIsLoading(true);

    dispatch(getHotelsThunk(url));

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(loadingTimeout);
  }, [dispatch]);

  const callbackFilter = (hotel) => {
    const filterName = hotel.name.toLowerCase().includes(nameFiltered);
    const price = +hotel.price;
    const filterByPrice =
      price >= priceFiltered.from && price <= priceFiltered.to;

    return filterName && filterByPrice;
  };

  const handleFiltersClose = () => {
    setFiltersAreOpen(false);
  };

  const handleFiltersOpen = () => {
    setFiltersAreOpen(true);
  };

  return (
    <div className="home">
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <section
            className={`home__filters grid-container ${
              filtersAreOpen || "home__filters-closed"
            }`}
          >
            <i
              onClick={handleFiltersClose}
              className="bx bx-x-circle home__filters-btnclose"
            ></i>
            <h3 className="home__filters-title">Filters</h3>
            <FilterByPrice
              handleFiltersClose={handleFiltersClose}
              setPriceFiltered={setPriceFiltered}
            />
            <FilterByCity
              setNameFiltered={setNameFiltered}
              setPriceFiltered={setPriceFiltered}
              handleFiltersClose={handleFiltersClose}
            />
          </section>

          <section className="home__hotels grid-container">
            <div className="home__hotels-filters flex-container">
              <FilterByName setNameFiltered={setNameFiltered} />
              <i
                onClick={handleFiltersOpen}
                className="bx bx-filter-alt home__hotels-btnfilters"
              ></i>
            </div>
            <div className="hotels__container flex-container">
              {products?.filter(callbackFilter).map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
