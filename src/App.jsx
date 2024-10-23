import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecipeSearch from './RecipeSearch';
import RecipeDetail from './RecipeDetail';
import Favorites from './Favorites';
import './RecipeSearch.css';
import './RecipeDetail.css';
import './Favorites.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Search</Link> {/* Linkki hakusivulle */}
            </li>
            <li>
              <Link to="/favorites">Favorites</Link> {/* Linkki suosikkisivulle */}
            </li>
          </ul>
        </nav>

        <Routes>
          {/* Reitit eri sivuille */}
          <Route path="/" element={<RecipeSearch />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} /> {/* Reseptin yksityiskohtainen sivu */}
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

