import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  StatusBar,
  ImageBackground,
} from 'react-native';
import RecipeCard from './RecipeCard';
import Footer from './Footer';

const MenuScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
      const data = await response.json();
      
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        Alert.alert('Error', 'No se pudieron cargar las recetas');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipePress = (recipe) => {
    navigation.navigate('RandomRecipe', { currentRecipe: recipe });
  };

  const renderRecipe = ({ item }) => (
    <RecipeCard
      recipe={item}
      onPress={() => handleRecipePress(item)}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6b35" />
        <Text style={styles.loadingText}>Cargando deliciosas recetas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff6b35" barStyle="light-content" />
      
      <ImageBackground
        source={{uri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmY4ZjAiLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNmZmYwZTYiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4='}}
        style={styles.backgroundContainer}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>🍽️ Nuestro Menú Especial</Text>
            <Text style={styles.headerSubtitle}>Descubre sabores únicos</Text>
            <View style={styles.headerDivider} />
          </View>
        </View>

        <FlatList
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          columnWrapperStyle={styles.row}
        />
      </ImageBackground>
      
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
  },
  backgroundContainer: {
    flex: 1,
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
  header: {
    backgroundColor: 'rgba(255, 107, 53, 0.95)',
    paddingTop: 25,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 4,
    borderBottomColor: '#e55a2b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff8f0',
    marginTop: 8,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  headerDivider: {
    width: 80,
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
    marginTop: 12,
  },
  flatList: {
    flex: 1,
  },
  listContainer: {
    padding: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
});

export default MenuScreen;