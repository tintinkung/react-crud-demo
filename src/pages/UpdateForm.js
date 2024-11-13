
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"
import { fetchUsersSelector } from "../states/selectors"
import { useRecoilValue } from "recoil"
import { Link } from "react-router-dom";
import axios from 'axios';
import FormInput from "../components/FormInput";
import "./Form.css"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

const UpdateForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const userId = location.pathname.split("/")[2]
  const user = useRecoilValue(fetchUsersSelector).find(user => user.id == userId)
  console.log("updaing id:", user.id)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      phone: user.phone,
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("putting user:", user)

      await axios.put("http://localhost:8800/users/" + userId, {
        id: null,
        name: data.name,
        email: data.email,
        age: data.age,
        phone: data.phone
      })
      navigate("/")
      window.location.reload()

    } catch(err) {
      console.log(err)
    }
  });

  return (
    <div className="form-content">
        <p><strong>Update this user data</strong></p>
        <form onSubmit={onSubmit}>
            <FormInput label="name" type="text" options={{ required: true, maxLength: 20 }} register={register} errors={errors}/>
            <FormInput label="email" type="text" options={{ required: true, pattern: EMAIL_REGEX }} register={register} errors={errors}/>
            <FormInput label="age" type="number" options={{ required: true, min: 18, max: 99 }} register={register} errors={errors}/>
            <FormInput label="phone" type="text" options={{ required: false, pattern: PHONE_REGEX }} register={register} errors={errors}/>
            <div className="submit-button">
                <button className="back-button"><Link to={"/"}>Back</Link></button>
                <button className="confirm-button" type="submit">Confirm</button>
            </div>
        </form>
    </div>
  );
};

export default UpdateForm;