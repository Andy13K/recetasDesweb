import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.decorativeLine} />
      <Text style={styles.footerText}>
        Andy Aquino - II Parcial DesWeb
      </Text>
      <Text style={styles.footerSubtext}>
        🍽️ Desarrollado con React Native
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#ff6b35',
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: '#e55a2b',
  },
  decorativeLine: {
    width: 60,
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
    marginBottom: 10,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  footerSubtext: {
    color: '#fff8f0',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default Footer;
