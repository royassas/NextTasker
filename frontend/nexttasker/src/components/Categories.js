import React, { useEffect, useState } from "react";
import CategoryService from "../services/categories.service";

const Categories = () => {
  const [rows, setRows] = useState(false);
  useEffect(() => {
    CategoryService.getCategories()
      .then((response) => {
        setRows(
          response.data.map((cat) => {
            return (
              <tr>
                <td style={{ backgroundColor: cat.color }}></td>
                <td>{cat.id}</td>
                <td>{cat.description}</td>
                <td>{cat.color}</td>
              </tr>
            );
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  return (
    <div>
      <div className="container">
        <h1>Categories</h1>
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th></th>
              <th>id</th>
              <th>description</th>
              <th>color</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
