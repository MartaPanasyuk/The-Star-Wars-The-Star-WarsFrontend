import React, { useState } from 'react';
import axios from 'axios';
import './css/Movie.css';

export default function Movie() {
  const [title, setTitle] = useState('');
  const [filterGender, setFilterGender] = useState(null);
  const [filterHeight, setFilterHeight] = useState(null);
  const [filterAge, setFilterAge] = useState(null);
  const [pageQuery, setPageQuery] = useState(1);

  const getAllMovieCharacters = async () => {
    try {
      let paramOptions = {};
      if (filterGender) {
        paramOptions.gender = filterGender;
      }

      if (filterHeight) {
        paramOptions.height = filterHeight;
      }

      if (filterAge) {
        paramOptions.age = filterAge;
      }

      if (pageQuery) {
        paramOptions.page = pageQuery;
      }

      const response = await axios.get(`http://localhost:4000/movie/${title}`, {
        params: paramOptions,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    getAllMovieCharacters(title);
  };

  const nextPage = () => {
    setPageQuery(pageQuery + 1);
  };

  const prevPage = () => {
    setPageQuery(pageQuery - 1 > 0 ? pageQuery - 1 : 1);
  };

  console.log(filterGender);
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <select onChange={(e) => setFilterGender(e.target.value)}>
          <option>male</option>
          <option>female</option>
        </select>
        <select onChange={(e) => setFilterHeight(e.target.value)}>
          <option>height a</option>
          <option>d</option>
        </select>
        <select onChange={(e) => setFilterAge(e.target.value)}>
          <option>age a</option>
          <option>d</option>
        </select>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <button type="submit">
          <h2 className="text_btn">Submit</h2>
        </button>
        <div className="Btn-wrapper">
          <button onClick={() => nextPage()}>Next</button>
          {pageQuery > 1 ? (
            <button onClick={() => prevPage()}>Prev</button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
}
