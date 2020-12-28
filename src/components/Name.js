import React, { useEffect, useState } from "react";

function Name(props) {
  const [name, setName] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/api/names/${props.match.params.name}`)
      .then((res) => res.json())
      .then((data) => setName(data[0]));
  }, []);

  const handleClick = () => {
    props.history.push('/');
  }

  return (
    <div>
      <button className='btn' onClick={handleClick}>back</button>
      <h2>{name.name}</h2>
      <h2>{name.amount}</h2>
    </div>
  );
}

export default Name;
