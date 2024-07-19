import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('/api/recipes/')
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom style={{ paddingTop: 20,paddingLeft: 20}}>
        Recipes
      </Typography>
      <Grid container spacing={3} pl={2} pr={2}>
        {recipes.map(recipe => (
          <Grid item xs={12} sm={6} md={3} key={recipe.id}>
            <Card>
              <CardActionArea component={Link} to={`/recipe/${recipe.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.image || 'default-image-url'}
                  alt={recipe.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recipe.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {recipe.ingredients.substring(0, 100)}...
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default HomePage;
