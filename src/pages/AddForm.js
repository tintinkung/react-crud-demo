
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import axios from 'axios';
import FormInput from "../components/FormInput";
import "./Form.css"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userListsAtom, usersListUrl } from "../states";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

const AddForm = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm();
  const setUserLists = useSetRecoilState(userListsAtom)
  const apiUrl = useRecoilValue(usersListUrl);

  const onSubmit = handleSubmit(async (data) => {
    try{
        console.log("pending submitting", data)

        const update = {
          id: null,
          name: data.name,
          email: data.email,
          age: data.age,
          phone: data.phone
        }

        await axios.post(apiUrl, update)
        setUserLists((state) => [...state, update])

        navigate("/")
    } catch(err){
        console.log(err)
    }

  });

  return (
    <div className="form-content">
      <p><strong>Add a user to database</strong></p>
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

export default AddForm;