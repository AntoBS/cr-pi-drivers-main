import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDriver, getTeams } from "../../Redux/actions";
import validateForm from "../../utils/validateForm";

const Form = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  

  const [data, setData] = useState({
    name: "",
    surname: "",
    description: "",
    dob: "",
    nationality: "",
    image: "",
    teams: ["default_team_value"],
  });

  const [errors, setErrors] = useState("");

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setData({ ...data, [property]: value });
    setErrors(validateForm({ ...data, [property]: value }));
  };

  const handleClearTeams = (event) => {
    setData((prevInput) => ({
      ...prevInput,
      teams: [],
    }));
  };

  const selectHandler = (event) => {
    const value = event.target.value

    setData ((prevInput) => ({
      ...prevInput,
      teams: [...prevInput.teams, value]
    }))
    console.log("Selected Teams:", data.teams);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Data to be sent:", data);
    if (Object.values(errors).length) {
      const errorMessage = Object.values(errors).join("\n");
      console.log(errorMessage);
      alert(errorMessage);
      return;
    }
    const { name, surname, description, dob, nationality,image, teams } = data;
    if (
      !name ||
      !surname ||
      !description ||
      !dob ||
      !nationality ||
      !image ||
      teams.length === 0
    ) {
      alert("Some fields are missing information");
      return;
    }

    dispatch(postDriver(data))
      .then(() => {
        alert("Driver created successfully!");
        setData({
          name: "",
          surname: "",
          description: "",
          dob: "",
          nationality: "",
          image: "",
          team: [],
        });
        window.location.href = "/drivers"; // Redirigir a la página de drivers después de crear el conductor
      })
      .catch((error) => {
        // Manejo de errores al crear el Driver
        console.error("Error creating Driver:", error.message);
        alert(
          "An error occurred while creating the Driver. Please try again later."
        );
      });
  }

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch])

  console.log("Teams:", teams); 

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={data.name} 
          onChange={changeHandler}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
      <label>SurName: </label>
      <input 
      type="text" 
      name="surname"
          value={data.surname} 
          onChange={changeHandler}
      />
      {errors.surname && <p>{errors.surname}</p>}
      </div>
      <div>
      <label>Description: </label>
        <input
          type="text"
          name="description"
          value={data.description} 
          onChange={changeHandler}
        />
        {errors.description && <p>{errors.description}</p>}
      </div>
      <div>
      <label>Birthdate: </label>
      <input 
      type="date" 
      name="dob"
          value={data.dob} 
          onChange={changeHandler}
      />
      {errors.dob && <p>{errors.dob}</p>}
      </div>
      <div>
      <label>Nationality: </label>
      <input 
      type="text" 
      name="nationality"
          value={data.nationality} 
          onChange={changeHandler}
      />
      {errors.nationality && <p>{errors.nationality}</p>}
      </div>
      <div>
      <label>Image: </label>
      <input 
      type="url" 
      name="image"
          value={data.image} 
          onChange={changeHandler}
      />
      {errors.image && <p>{errors.image}</p>}
      </div>
      <select onChange={(e) => {
        selectHandler(e);
      }}
      >
        {teams.map((e) => {
          return(
            <option value={e.name} key={e.id}>
              {e.name}
            </option>
          )
        })}

      </select>
      <button href="#" onClick={handleClearTeams} >Clear</button>
      <div>
        <button teams="submit"> CREATE </button>
      </div>
    </form>
  );
};

export default Form;
