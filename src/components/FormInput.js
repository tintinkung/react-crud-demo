import "./FormInput.css"

const checkError = (label) => {
    console.log("checking error: " ,label)

    switch(label?.type) {
        case "pattern":
          return " is not valid"
        case "min":
          return " cannot be below 18"
        case "max":
          return " number too big"
        case "maxLength":
          return " is limit to 20 characters"
        case "valueAsNumber":
          return " has to be number"
        case "value":
          return " is empty"
        case "required":
          return " is required"
        default:
          return ""
    } 
}

const FormInput = ({ label, type, register, errors, options }) => {
    return (<div className="input-container">
        <label className="label-container">
            <span>{String(label).charAt(0).toUpperCase() + String(label).slice(1)}: </span>
            <input className="input-box" type={type} {...register(label, options)} />
        </label>
        {checkError(errors[label]) != "" && 
            <p className="error-message" role="alert">{label} {checkError(errors[label])}</p>
        }
    </div>)
}


export default FormInput;