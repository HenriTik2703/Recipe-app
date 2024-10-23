import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import './RecipeDetail.css'; // Linkitetään tämän komponentin omaan CSS-tiedostoon

// RecipeDetail-komponentti: näyttää yksityiskohtaisen reseptin tiedot.
const RecipeDetail = () => {
  const { id } = useParams(); // Haetaan URL:sta reseptin ID, joka tulee edellisen sivun linkistä.
  const [recipe, setRecipe] = useState(null); // Alustetaan tila, johon tallennetaan reseptin tiedot (aluksi null).

  // Käytetään useEffect-koukkua, jotta API-kutsu suoritetaan heti kun komponentti ladataan.
  useEffect(() => {
    // Funktio reseptin hakemista varten API:sta.
    const fetchRecipe = async () => {
      try {
        // Haetaan yksittäisen reseptin tiedot Spoonacular API:sta reseptin ID:n perusteella.
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=db372486753b4193b9ccc3e52fbf21ee`);
        setRecipe(response.data); // Tallennetaan API:sta saatu data tilaan.
      } catch (error) {
        console.error('Virhe haettaessa reseptiä', error); // Jos virhe tapahtuu, tulostetaan se konsoliin.
      }
    };
    fetchRecipe(); // Kutsutaan funktiota.
  }, [id]); // id on riippuvuus; funktio suoritetaan aina, kun id muuttuu.

  // Jos reseptiä ei ole vielä ladattu, näytetään "Ladataan..."-viesti.
  if (!recipe) {
    return <div>Ladataan reseptiä...</div>;
  }

  // Jos resepti on ladattu, näytetään sen tiedot.
  return (
    <div className="recipe-detail"> {/* Pääkontaineri reseptin yksityiskohdille */}
      <h1>{recipe.title}</h1> {/* Reseptin otsikko */}
      <img src={recipe.image} alt={recipe.title} /> {/* Reseptin kuva */}
      <h2>Raaka-aineet</h2>
      <ul>
        {/* Listataan kaikki raaka-aineet */}
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li> // Jokaiselle raaka-aineelle oma listan elementti
        ))}
      </ul>
      <h2>Valmistusohjeet</h2>
      <p>{recipe.instructions}</p> {/* Näytetään valmistusohjeet */}
      <h2>Ravitsemustiedot</h2>
      {/* Esimerkkinä näytetään kalorit */}
      <p>Kalorit: {recipe.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Calories')?.amount}</p>
    </div>
  );
};

export default RecipeDetail;
