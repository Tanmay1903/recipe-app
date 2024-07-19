import React, { useState } from 'react';
import axios from '../axiosConfig'; // Import configured Axios instance
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { FormHelperText } from '@mui/material';

function AddRecipePage() {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    steps: '',
    image: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      errors.name = 'Name must be at least 3 characters long';
    }

    if (!formData.ingredients) {
      errors.ingredients = 'Ingredients are required';
    }

    if (!formData.steps) {
      errors.steps = 'Steps are required';
    }

    if (!formData.image) {
      errors.image = 'Please Upload an image';
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('ingredients', formData.ingredients);
      data.append('steps', formData.steps);
      data.append('image', formData.image);
  
      axios.post('/api/recipes/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          alert('Recipe added successfully');
          setFormData({
            name: '',
            ingredients: '',
            steps: '',
            image: null,
          });
        })
        .catch(error => {
          console.error('Error adding recipe:', error);
        });
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file, event.target.files);
    setFormData({
      ...formData,
      image: file,
    });
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Add Recipe
        </Typography>
        <form onSubmit={handleSubmit} style={{textAlign: "center"}}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            id="ingredients"
            name="ingredients"
            label="Ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            error={Boolean(errors.ingredients)}
            helperText={errors.ingredients}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            id="steps"
            name="steps"
            label="Steps"
            value={formData.steps}
            onChange={handleChange}
            error={Boolean(errors.steps)}
            helperText={errors.steps}
            margin="normal"
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: 2 }}
            fullWidth
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {errors && errors.image && <FormHelperText error>{errors.image}</FormHelperText>}
          {formData && formData.image && <img src={URL.createObjectURL(formData.image)} alt="Uploaded"  style={{paddingBottom: 12}}/>}
          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ marginTop: 2 }}>
            Add Recipe
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AddRecipePage;
