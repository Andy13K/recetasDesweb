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
const cardWidth = (width - 40) / 2;

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
    borderRadius: 18,
    marginVertical: 8,
    marginHorizontal: 5,
    shadowColor: '#ff6b35',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ff6b35',
    alignSelf: 'center',
  },
  imageContainer: {
    position: 'relative',
    height: 130,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 107, 53, 0.95)',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    fontSize: 11,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    padding: 12,
    minHeight: 90,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  details: {
    marginTop: 'auto',
  },
  area: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
    textAlign: 'center',
  },
  tapText: {
    fontSize: 10,
    color: '#ff6b35',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#fff8f0',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  decorativeBorder: {
    height: 4,
    backgroundColor: '#ff6b35',
  },
});

export default RecipeCard;