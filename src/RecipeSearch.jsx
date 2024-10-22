import './RecipeSearch.css';  // Tuodaan CSS-tiedosto, joka lisätään komponentin tyyleihin

import React, { useState } from 'react';
import axios from 'axios';  // Axios-kirjasto API-kutsuihin

const RecipeSearch = () => {
  const [query, setQuery] = useState('');  // Käyttäjän hakukysely
  const [recipes, setRecipes] = useState([]);  // Hakutulokset, jotka haetaan API:sta

  // Funktio, joka hakee reseptejä Spoonacular API:sta käyttäen Axiosia
  const handleSearch = async () => {
    try {
      // API-kutsu, jossa käytetään käyttäjän syöttämää hakukyselyä (query)
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=db372486753b4193b9ccc3e52fbf21ee`
      );
      // Tallennetaan hakutulokset tilaan
      setRecipes(response.data.results);
    } catch (error) {
      // Käsitellään mahdolliset virheet API-kutsussa
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div>
      {/* Pääotsikko */}
      <h1>Recipe Search</h1>
      
      {/* Hakukenttä, johon käyttäjä syöttää haluamansa raaka-aineet tai ruokarajoitteet */}
      <input
        type="text"
        value={query}  // Kentän arvo sidottu query-tilaan
        onChange={(e) => setQuery(e.target.value)}  // Päivittää query-tilan käyttäjän syöttäessä tekstiä
        placeholder="Search for recipes..."  // Vihje käyttäjälle hakukentässä
      />
      {/* Haku-painike, joka laukaisee handleSearch-funktion API-kutsua varten */}
      <button onClick={handleSearch}>Search</button>

      {/* Tulokset: jos hakutuloksia on, näytetään lista resepteistä */}
      <div>
        {recipes.length > 0 && (
          <ul>
            {/* Käydään läpi jokainen resepti hakutuloksista ja näytetään ne luettelona */}
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <h3>{recipe.title}</h3>  {/* Reseptin otsikko */}
                <img src={recipe.image} alt={recipe.title} />  {/* Reseptin kuva */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;
