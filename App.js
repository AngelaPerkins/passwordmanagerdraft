import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/showpasswords")
      .then((response) => {
        setPasswordList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching password list:", error);
      });
  }, []);

  const addPassword = () => {
    Axios.post("http://localhost:3001/addpassword", {
      password: password,
      title: title,
    })
      .then((response) => {
        console.log(response.data); // Log the response for debugging purposes
        // Optionally, update the passwordList state to reflect the new password
        // setPasswordList([...passwordList, response.data]);
      })
      .catch((error) => {
        console.error("Error adding password:", error);
      });
  };

  return (
    <div className="App">
      <div className="AddingPassword">
        <input
          type="text"
          placeholder="Ex. password123"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Ex. Facebook"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <button onClick={addPassword}> Add Password</button>
      </div>
    </div>
  );
}

export default App;
