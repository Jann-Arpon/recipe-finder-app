import { useState, useEffect } from 'react';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('Chicken');

  const fetchRecipes = async (query) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://www.themealdb.com/api/json/v1/1';
      const res = await fetch(`${baseUrl}/search.php?s=${query}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchRecipes(search);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(search);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🍳 Recipe Finder</h1>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search recipes (e.g., Pasta, Beef, Chicken)..."
          style={{ flex: 1, padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Search
        </button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        {recipes.length > 0 ? (
          recipes.map((meal) => (
            <div key={meal.idMeal} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '16px', margin: '0 0 5px 0' }}>{meal.strMeal}</h3>
                  <p style={{ fontSize: '12px', color: '#666', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                    {meal.strCategory} • {meal.strArea}
                  </p>
                  <p style={{ fontSize: '13px', color: '#444', margin: 0, lineHeight: '1.4' }}>
                    {meal.strInstructions ? `${meal.strInstructions.slice(0, 110)}...` : 'No description available.'}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found. Try searching for something else!</p>
        )}
      </div>
    </div>
  );
}