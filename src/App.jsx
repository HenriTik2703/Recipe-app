import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';  // Tuodaan Router-komponentit

// Tuodaan pääsivun, reseptisivun ja suosikkisivun komponentit
import RecipeSearch from './RecipeSearch';  // Pääsivu, jossa käyttäjä voi hakea reseptejä
import RecipeDetail from './RecipeDetail';  // Reseptinäkymä, jossa näytetään valitun reseptin yksityiskohdat
import Favorites from './Favorites';        // Suosikit-näkymä, jossa käyttäjän tallentamat reseptit näkyvät
import './css/RecipeSearch.css';


function App() {
  return (
    // Router hallitsee sivunäkymien välisiä siirtymiä
    <Router>
      <div>
        <nav>
          {/* Navigointilinkit eri sivuille */}
          <ul>
            <li>
              <Link to="/">Search</Link>  {/* Linkki pääsivulle */}
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>  {/* Linkki suosikkisivulle */}
            </li>
          </ul>
        </nav>

        {/* Switch-komponentti renderöi vain yhden reitin kerrallaan */}
        <Switch>
          {/* Reitti pääsivulle (reseptihaku) */}
          <Route path="/" exact component={RecipeSearch} />
          
          {/* Reitti yksittäiselle reseptisivulle. ":id" viittaa dynaamiseen osaan reittiä, joka vastaanottaa reseptin ID:n */}
          <Route path="/recipe/:id" component={RecipeDetail} />
          
          {/* Reitti suosikkisivulle, jossa näytetään käyttäjän suosikit */}
          <Route path="/favorites" component={Favorites} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


