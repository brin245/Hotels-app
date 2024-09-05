import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import StarGenerator from "../components/shared/StarGenerator";
import { Link, useParams } from "react-router-dom";
import OtherHotels from "../components/HotelDetailsPage/OtherHotels";
import HotelMap from "../components/HotelDetailsPage/HotelMap";
import FormReservations from "../components/HotelDetailsPage/FormReservations";
import Reviews from "../components/HotelDetailsPage/Reviews";
import SliderImgHotel from "../components/HotelDetailsPage/SliderImgHotel";
import "../components/HomePage/styles/HotelCard.css";

const HotelDetailsPage = () => {
  const { id } = useParams();
  const [hotel, getHotel, isLoading] = useFetch();
  useEffect(() => {
    const url = `https://hotels-api.academlo.tech/hotels/${id}`;
    getHotel(url);
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <section>
            <div className="main-content center-main">
              <h2 className="hotel__name">{hotel?.name}</h2>
              <div>
                {hotel?.rating && <StarGenerator rating={hotel.rating} />}
              </div>
              <span>{hotel?.rating}</span>
            </div>
            <div className="main-content">
              <div>
                <SliderImgHotel hotel={hotel} />
              </div>
              {hotel && <HotelMap lat={hotel?.lat} lon={hotel?.lon} />}
            </div>
            <div className="margin-box">
              <address>
                {hotel?.city.name}, {hotel?.city.country}
              </address>
            </div>
            <div className="margin-box">
              <i className="bx bx-map"></i>
              <address className="hotel__description-value">
                {hotel?.address}
              </address>
            </div>
            <br />
            <p className="hotel__description margin-box">
              {hotel?.description}
            </p>
            <h3 className="hotel__reservation__title margin-box">
              Reservation
            </h3>
            <section className="hotel__reservation margin-box">
              {localStorage.getItem("token") ? (
                <FormReservations hotelId={hotel?.id} />
              ) : (
                <p>
                  If you want to make a reservation, please{" "}
                  <Link to="/login">Login</Link>
                </p>
              )}
            </section>
            <div>
              <Reviews hotelId={hotel?.id} />
            </div>
            <br />
            <OtherHotels city={hotel?.city} id={hotel?.id} />
          </section>
        </>
      )}
    </div>
  );
};

export default HotelDetailsPage;
