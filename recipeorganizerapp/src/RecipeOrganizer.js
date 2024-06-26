import React, { useState } from 'react';
import './RecipeOrganizer.css';

const RecipeOrganizer = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newRecipeInstructions, setNewRecipeInstructions] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(null);

  const handleAddRecipe = () => {
    if (newRecipeName.trim() && newRecipeInstructions.trim()) {
      if (isEditing) {
        const updatedRecipes = recipes.map((recipe, index) =>
          index === currentRecipeIndex
            ? { name: newRecipeName, instructions: newRecipeInstructions }
            : recipe
        );
        setRecipes(updatedRecipes);
        setIsEditing(false);
        setCurrentRecipeIndex(null);
      } else {
        setRecipes([...recipes, { name: newRecipeName, instructions: newRecipeInstructions }]);
      }
      setNewRecipeName('');
      setNewRecipeInstructions('');
    }
  };

  const handleEditRecipe = (index) => {
    setNewRecipeName(recipes[index].name);
    setNewRecipeInstructions(recipes[index].instructions);
    setIsEditing(true);
    setCurrentRecipeIndex(index);
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  };

  return (
    <div className="recipe-organizer-container">
      <div className="recipe-organizer">
        <h1>
            "RECIPE ORGANIZER"
        </h1>
        <h1>
            {isEditing ? 'Edit Recipe' : 'Add Recipe'}
        </h1>
        <input
          type="text"
          value={newRecipeName}
          onChange={(e) => setNewRecipeName(e.target.value)}
          placeholder="Enter recipe name"
        />
        <textarea
          value={newRecipeInstructions}
          onChange={(e) => setNewRecipeInstructions(e.target.value)}
          placeholder="Enter recipe instructions"
        ></textarea>
        <button onClick={handleAddRecipe}>{isEditing ? 'Update Recipe' : 'Add Recipe'}</button>
      </div>
      <div className="recipe-list-container">
        <h1>
            "RECIPE LIST"
        </h1>
        <ul className="recipe-list">
          {recipes.map((recipe, index) => (
            <li key={index}>
              <div>
                <h2>{recipe.name}</h2>
                <p>{recipe.instructions}</p>
              </div>
              <div className="recipe-buttons">
                <button onClick={() => handleEditRecipe(index)}>Edit</button>
                <button onClick={() => handleDeleteRecipe(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeOrganizer;
