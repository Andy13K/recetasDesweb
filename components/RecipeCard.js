import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 30) / 2;

const RecipeCard = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: recipe.strMealThumb }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.categoryBadge}>{recipe.strCategory}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.strMeal}
        </Text>
        
        <View style={styles.details}>
          <Text style={styles.area}>🌍 {recipe.strArea}</Text>
          <Text style={styles.tapText}>👆 Toca para sorpresa</Text>
        </View>
      </View>
      
      <View style={styles.decorativeBorder} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ff6b35',
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 107, 53, 0.9)',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
    minHeight: 80,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 18,
    marginBottom: 8,
  },
  details: {
    marginTop: 'auto',
  },
  area: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  tapText: {
    fontSize: 10,
    color: '#ff6b35',
    fontWeight: '600',
    textAlign: 'center',
  },
  decorativeBorder: {
    height: 3,
    backgroundColor: '#ff6b35',
  },
});

export default RecipeCard;