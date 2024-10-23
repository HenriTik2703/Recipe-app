import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css'; // Linkitetään komponentin omaan CSS-tiedostoon

import { useNavigate } from 'react-router-dom'; // Tuo useNavigate


const Favorites = () => {
  const [favorites, setFavorites] = useState([]); // Tila suosikkiresepteille

  

  useEffect(() => {
    // Ladataan suosikit LocalStoragesta, kun komponentti ladataan
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Funktio, joka poistaa reseptin suosikeista
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(recipe => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Päivitetään LocalStorage
  };

  if (favorites.length === 0) {
    return <div>Sinulla ei ole vielä suosikkeja.</div>; // Näytetään viesti, jos ei ole suosikkeja
  }

  return (
    <div className="favorites-container">
      <h1>Suosikkireseptit</h1>
      <ul>
        {favorites.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/resepti/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.title} /> {/* Näytetään reseptin kuva */}
              <h3>{recipe.title}</h3> {/* Näytetään reseptin nimi */}
            </Link>
            <button onClick={() => removeFavorite(recipe.id)}>Poista</button> {/* Poista-painike */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
