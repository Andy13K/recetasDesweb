import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';

const RandomRecipeScreen = ({ route, navigation }) => {
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  const { currentRecipe } = route.params;

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  const fetchRandomRecipe = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      
      if (data.meals && data.meals[0]) {
        setRandomRecipe(data.meals[0]);
        // Animación de entrada
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Alert.alert('Error', 'No se pudo cargar el platillo sorpresa');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure || ''} ${ingredient}`.trim());
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6b35" />
        <Text style={styles.loadingText}>🎲 Preparando tu sorpresa...</Text>
      </View>
    );
  }

  if (!randomRecipe) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>😔 No se pudo cargar el platillo</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchRandomRecipe}>
          <Text style={styles.retryButtonText}>🔄 Intentar de nuevo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const ingredients = getIngredients(randomRecipe);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff6b35" barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Header con imagen */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: randomRecipe.strMealThumb }}
              style={styles.mainImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay}>
              <Text style={styles.surpriseTitle}>🎲 ¡PLATILLO SORPRESA!</Text>
            </View>
          </View>

          {/* Información principal */}
          <View style={styles.infoCard}>
            <Text style={styles.recipeName}>{randomRecipe.strMeal}</Text>
            
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>🍽️ {randomRecipe.strCategory}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>🌍 {randomRecipe.strArea}</Text>
              </View>
            </View>
          </View>

          {/* Ingredientes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🥘 Ingredientes</Text>
            <View style={styles.ingredientsContainer}>
              {ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={styles.ingredientText}>• {ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Instrucciones */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👨‍🍳 Preparación</Text>
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsText}>
                {randomRecipe.strInstructions}
              </Text>
            </View>
          </View>

          {/* Botón para nueva sorpresa */}
          <TouchableOpacity style={styles.newSurpriseButton} onPress={fetchRandomRecipe}>
            <Text style={styles.newSurpriseButtonText}>🎲 ¡Nueva Sorpresa!</Text>
          </TouchableOpacity>

          {/* Información del platillo original */}
          <View style={styles.originalRecipeCard}>
            <Text style={styles.originalTitle}>📋 Platillo que seleccionaste:</Text>
            <View style={styles.originalInfo}>
              <Image
                source={{ uri: currentRecipe.strMealThumb }}
                style={styles.originalImage}
              />
              <View style={styles.originalDetails}>
                <Text style={styles.originalName}>{currentRecipe.strMeal}</Text>
                <Text style={styles.originalCategory}>{currentRecipe.strCategory}</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8f0',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#ff6b35',
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8f0',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 107, 53, 0.9)',
    padding: 15,
  },
  surpriseTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  badge: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: 15,
  },
  ingredientsContainer: {
    gap: 5,
  },
  ingredientItem: {
    backgroundColor: '#fff8f0',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b35',
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  instructionsContainer: {
    backgroundColor: '#fff8f0',
    padding: 15,
    borderRadius: 10,
  },
  instructionsText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
  },
  newSurpriseButton: {
    backgroundColor: '#ff6b35',
    marginHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  newSurpriseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  originalRecipeCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  originalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  originalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  originalDetails: {
    flex: 1,
  },
  originalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  originalCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default RandomRecipeScreen;