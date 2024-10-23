import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Tuodaan Link-komponentti navigointia varten
import './RecipeSearch.css';

const RecipeSearch = () => {
  const [query, setQuery] = useState(''); // Käyttäjän hakutermi
  const [recipes, setRecipes] = useState([]); // Tallennetaan haetut reseptit

  // Funktio, joka suorittaa API-kutsun hakemaan reseptejä käyttäjän syöttämällä hakusanalla
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=db372486753b4193b9ccc3e52fbf21ee`
      );
      setRecipes(response.data.results); // Tallennetaan reseptit tilaan
    } catch (error) {
      console.error('Virhe reseptien hakemisessa:', error); // Näytetään virhe, jos API-kutsu epäonnistuu
    }
  };

  return (
    <div className="container">
      <h1>Reseptihaku</h1>

      {/* Hakukenttä, johon käyttäjä voi syöttää hakusanan */}
      <input
        type="text"
        value={query} // Hakukentän arvo
        onChange={(e) => setQuery(e.target.value)} // Päivitetään hakusanaa
        placeholder="Hae reseptejä..." // Näytetään vihje hakukentässä
        className="search-input"
      />

      {/* Hae-painike */}
      <button onClick={handleSearch} className="search-button">
        Hae
      </button>

      {/* Näytetään hakutulokset, jos reseptejä on löytynyt */}
      {recipes.length > 0 && (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              {/* Linkki yksittäisen reseptin sivulle */}
              <Link to={`/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Näytetään viesti, jos hakutuloksia ei ole */}
      {recipes.length === 0 && <p>Hakutuloksia ei löytynyt.</p>}
    </div>
  );
};

export default RecipeSearch;


