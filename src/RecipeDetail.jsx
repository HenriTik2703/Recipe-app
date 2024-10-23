import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Tuodaan useParams, jotta voidaan hakea ID URL:sta
import axios from 'axios';  // Axios API-kutsuihin
import './RecipeDetail.css';  // Tyylitiedosto komponentille

import { useNavigate } from 'react-router-dom'; // Tuo useNavigate


const RecipeDetail = () => {
  
  const navigate = useNavigate(); // Alustetaan navigate
  const { id } = useParams(); // Hakee reseptin ID:n URL:sta, joka tulee linkistä (dynaaminen reitti /recipe/:id)
  const [recipe, setRecipe] = useState(null); // Tila, johon tallennetaan haettu resepti
  const [favorites, setFavorites] = useState([]); // Tila, johon tallennetaan suosikkireseptit LocalStoragea varten

  useEffect(() => {
    // Funktio reseptin tietojen hakemiseen API:sta
    const fetchRecipe = async () => {
      try {
        // Suoritetaan API-kutsu Spoonacular API:lle ja haetaan reseptin tiedot ID:n perusteella
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=db372486753b4193b9ccc3e52fbf21ee`
        );
        setRecipe(response.data);  // Tallennetaan haetut tiedot 'recipe'-tilaan
      } catch (error) {
        console.error('Virhe haettaessa reseptiä:', error);  // Jos API-kutsussa tapahtuu virhe, tulostetaan virhe konsoliin
      }
    };

    fetchRecipe(); // Kutsutaan reseptin hakufunktiota heti kun komponentti ladataan

    // Ladataan suosikit LocalStoragesta
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites); // Tallennetaan ladatut suosikit 'favorites'-tilaan
  }, [id]);  // useEffect riippuu reseptin ID:stä. Se lataa uudet tiedot aina, kun ID vaihtuu

  // Funktio, joka lisää nykyisen reseptin suosikkeihin ja tallentaa sen LocalStorageen
  const addToFavorites = () => {
    if (recipe) {  // Varmistetaan, että reseptin tiedot on haettu
      const updatedFavorites = [...favorites, recipe];  // Päivitetään suosikit lisäämällä nykyinen resepti suosikkilistaan
      setFavorites(updatedFavorites);  // Päivitetään tila suosikkien osalta
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));  // Tallennetaan päivitetty suosikkilista LocalStorageen JSON-muodossa
      
    
    }
  };

  // Näytetään latausviesti, jos reseptin tietoja ei ole vielä haettu
  if (!recipe) {
    return <div>Ladataan reseptiä...</div>;
  }

  return (
    <div className="recipe-detail">
      {/* Näytetään reseptin otsikko */}
      <h1>{recipe.title}</h1>

      {/* Näytetään reseptin kuva */}
      <img src={recipe.image} alt={recipe.title} />

      {/* Näytetään raaka-aineet listana */}
      <h2>Raaka-aineet</h2>
      <ul>
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>  // Näytetään jokainen raaka-aine listalla
        ))}
      </ul>

      {/* Näytetään reseptin valmistusohjeet */}
      {/* Näytetään reseptin valmistusohjeet ilman ylimääräisiä <p> elementtejä */}
      <h2>Valmistusohjeet</h2>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} /> {/* Tämä renderöi HTML:n suoraan */}


      {/* Lisää suosikkeihin -painike */}
      <button
        onClick={() => {
          addToFavorites(); // Kutsutaan funktiota, joka lisää reseptin suosikkeihin
          navigate('/'); // Navigoidaan etusivulle lisäyksen jälkeen
        }}
        className="btn btn-primary"
      > 
        Lisää suosikkeihin
      </button>


    </div>
  );
};

export default RecipeDetail;