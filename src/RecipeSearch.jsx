// RecipeSearch.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Axios-kirjasto API-kutsuihin
import './RecipeSearch.css'; // Tuodaan CSS-tiedosto, joka lisätään komponentin tyyleihin

const RecipeSearch = () => {
  const [query, setQuery] = useState(''); // Käyttäjän hakukysely
  const [recipes, setRecipes] = useState([]); // Hakutulokset, jotka haetaan API:sta

  // Funktio, joka hakee reseptejä Spoonacular API:sta käyttäen Axiosia
  const handleSearch = async () => {
    try {
      // API-kutsu, jossa käytetään käyttäjän syöttämää hakukyselyä (query)
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      // Tallennetaan hakutulokset tilaan
      setRecipes(response.data.results);
    } catch (error) {
      // Käsitellään mahdolliset virheet API-kutsussa
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className="container">
      {/* Pääotsikko */}
      <h1>Recipe Search</h1>

      {/* Hakukenttä */}
      <input
        type="text"
        value={query} // Kentän arvo sidottu query-tilaan
        onChange={(e) => setQuery(e.target.value)} // Päivittää query-tilan käyttäjän syöttäessä tekstiä
        placeholder="Search for recipes..." // Vihje käyttäjälle hakukentässä
        className="search-input"
      />
      {/* Haku-painike */}
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {/* Tulokset */}
      {recipes.length > 0 && (
        <ul className="recipe-list">
          {/* Käydään läpi jokainen resepti hakutuloksista ja näytetään ne luettelona */}
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <h3>{recipe.title}</h3> {/* Reseptin otsikko */}
              <img src={recipe.image} alt={recipe.title} className="recipe-image" /> {/* Reseptin kuva */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeSearch;
