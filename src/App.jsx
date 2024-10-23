import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecipeSearch from './RecipeSearch';
import RecipeDetail from './RecipeDetail';
import Favorites from './Favorites';
import './RecipeSearch.css';
import './RecipeDetail.css';
import './Favorites.css';

import 'bootstrap/dist/css/bootstrap.min.css'; // Lisätään Bootstrapin tyylit

const App = () => {
  return (
    <Router>
      <div>
        
        {/* Lisätään moderni "Recipe-app" -teksti headeriin */}
        <header className="recipe-app-header text-center py-5">
          <h1 className="display-3 text-white fw-bold">Recipe-app</h1> {/* Isompi, vahva fontti, valkoinen teksti */}
          <p className="lead text-light">Löydä parhaat reseptit, juuri sinulle räätälöitynä</p> {/* Tyylitelty alaotsikko */}
        </header>
        
        {/* Bootstrapin Navbar-komponentti: Navigointipalkki */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light"> {/* Responsiivinen navigointipalkki */}
          <div className="container-fluid"> {/* Navigointipalkin sisäinen leveys Bootstrapin container-luokalla */}
            <Link className="navbar-brand" to="/">Reseptihaku</Link> {/* Brändilinkki, joka ohjaa pääsivulle */}
            {/* Toggler-painike mobiililaitteille */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span> {/* Bootstrapin toggler-ikoni (hamburger menu) */}
            </button>
            <div className="collapse navbar-collapse" id="navbarNav"> {/* Navigoinnin collapsible-osa, joka piiloutuu pienillä näytöillä */}
              <ul className="navbar-nav"> {/* Bootstrapin navigointivalikko */}
                <li className="nav-item">
                  <Link className="nav-link" to="/favorites">Suosikit</Link> {/* Linkki suosikkisivulle */}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Bootstrapin container, joka lisää marginaalit ja keskittää sisällön */}
        <div className="container mt-4"> 
          {/* Reitit, jotka näyttävät oikean komponentin URL-reitin perusteella */}
          <Routes>
            <Route path="/" element={<RecipeSearch />} /> {/* Hakusivun reitti */}
            <Route path="/recipe/:id" element={<RecipeDetail />} /> {/* Yksittäisen reseptin reitti */}
            <Route path="/favorites" element={<Favorites />} /> {/* Suosikkisivun reitti */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

