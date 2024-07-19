import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig'; // Import configured Axios instance
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`/api/recipes/${id}/`)
      .then(response => setRecipe(response.data))
      .catch(error => console.error('Error fetching recipe:', error));
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          {recipe.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              src={recipe.image || 'default-image-url'}
              alt={recipe.name}
              style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Ingredients
            </Typography>
            <Typography variant="body1" paragraph>
              {recipe.ingredients}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Steps
            </Typography>
            <Typography variant="body1">
              {recipe.steps}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default RecipeDetailPage;
