import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import RecipeDetailPage from './pages/recipeDetailPage';
import AddRecipePage from './pages/addRecipePage';
import Navbar from './components/navBar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
