import React from "react";
import axios from "axios";
import { useState, useRef } from "react";

const Feedback = () => {
  const rName = useRef();
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("excellent");
  const [msg, setMsg] = useState("");

  const hName = (e) => {
    setName(e.target.value);
  };

  const hFeedback = (e) => {
    setFeedback(e.target.value);
  };

  const save = (e) => {
    e.preventDefault();
    if (name === "") {
      alert("Please enter your name");
      rName.current.focus();
      setMsg("");
      return;
    }

    let data = { name, feedback };
    let url = "https://feedback-app-express.onrender.com/save";
    axios.post(url, data)
      .then(res => {
        setMsg("Thank You For Your Feedback");
        setName("");
        setFeedback("excellent");
        rName.current.focus();
      })
      .catch(err => {
        setMsg("Issue" + err);
      });
  };
  return (
    <div>
      <center>
        <h1> Feedback Application Using React Express And MySQL</h1>
        <form onSubmit={save}>
          <input
            type="text"
            placeholder="Enter Your Name"
            ref={rName}
            onChange={hName}
            value={name}
          />
          <br />
          <br />
          <input
            type="radio"
            name="f"
            value="excellent"
            defaultChecked={true}
            onChange={hFeedback}
            checked={feedback === "excellent"}
          />{" "}
          Excellent
          <input type="radio" name="f" value="good" onChange={hFeedback} /> Good
          <input type="radio" name="f" value="okay" onChange={hFeedback} /> Okay
          <br />
          <br />
          <input type="submit" vslue="Submit" />
        </form>
        <h2> {msg}</h2>
      </center>
    </div>
  );
};

export default Feedback;
