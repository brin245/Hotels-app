import { useForm } from "react-hook-form";
import useCrud from "../../hooks/useCrud";
import { useNavigate } from "react-router-dom";

const FormReservations = ({ hotelId }) => {
  const { reset, handleSubmit, register } = useForm();
  const [, , createBooking] = useCrud();
  const navigate = useNavigate();

  const submit = (data) => {
    const url = "https://hotels-api.academlo.tech/bookings";

    const objData = { ...data, hotelId };

    createBooking(url, objData, true);
    reset({
      checkIn: "",
      checkOut: "",
    });
    navigate("/reservations");
  };

  return (
    <form className="form-reservation" onSubmit={handleSubmit(submit)}>
      <div className="form-reservation__fields">
        <label className="form-reservation__field">
          <span className="hotel__city">Check-in</span>
          <input
            className="form-reservation__input "
            {...register("checkIn")}
            type="date"
          />
        </label>
        <label className="form-reservation__field">
          <span className="hotel__city">Check-out</span>
          <input
            className="form-reservation__input "
            {...register("checkOut")}
            type="date"
          />
        </label>
      </div>
      <br />
      <button className="bottom-reserve">Reserve a Room</button>
    </form>
  );
};

export default FormReservations;
