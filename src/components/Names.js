import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Names() {
  const [names, setNames] = useState([]);
  const [count, setCount] = useState(null);
  const [sortBy, setSortBy] = useState("/");
  const [active, setActive] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/names${sortBy}`)
      .then((res) => res.json())
      .then((data) => setNames(data));

    fetch(`${API_URL}/api/names/count`)
      .then((res) => res.json())
      .then((data) => setCount(data));
  }, [sortBy]);

  if (names.length === 0) {
    return null;
  }

  const handleClick = (event) => {
    setSortBy("?sort=" + event.target.textContent);
    setActive(event.target.textContent);
  };

  return (
    <>
      <h3>Top-10 names in Solita</h3>
      <table>
        <thead>
          <tr>
            <th
              className={active === "alphabetical" ? "btn active" : "btn"}
              onClick={handleClick}
            >
              alphabetical
            </th>
            <th
              className={active === "popular" ? "btn active" : "btn"}
              onClick={handleClick}
            >
              popular
            </th>
          </tr>
        </thead>
        <tbody>
          {names.map(({ name, amount }) => (
            <tr key={name}>
              <td className={name === 'Magomed' ? 'super' : ''}>
                <Link to={`/names/${name}`}>{name}</Link>
              </td>
              <td>
                <span>{amount}</span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="total">Total names</td>
            <td>{count}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default Names;
