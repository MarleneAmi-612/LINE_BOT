import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList, 
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const API_URL = 'https://www.utdprojects.online/api/api_componentes.php';

const ComponentesScreen = () => {
  const [componentes, setComponentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchComponentes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setComponentes(data);
    } catch (error) {
      console.error('Error cargando componentes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponentes();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Carrusel de imágenes */}
      <FlatList
        horizontal
        data={item.imagenes}
        renderItem={({ item: img }) => (
          <Image 
            source={{ uri: `https://www.utdprojects.online/uploads/${img}` }} 
            style={styles.cardImage}
            resizeMode="contain"
          />
        )}
        keyExtractor={(img, index) => index.toString()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / (width * 0.85));
          setActiveIndex(index);
        }}
      />
      
      {/* Indicadores del carrusel */}
      <View style={styles.indicatorContainer}>
        {item.imagenes.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.indicator,
              activeIndex === index && styles.activeIndicator
            ]} 
          />
        ))}
      </View>

      {/* Información del componente */}
      <Text style={styles.cardTitle}>{item.nombre}</Text>
      <Text style={styles.cardDescription}>{item.descripcion}</Text>
      
      {/* Botón de más información */}
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoButtonText}>Más detalles técnicos</Text>
        <MaterialIcons name="chevron-right" size={20} color="#e09f3e" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#941b0c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Componentes del Carrito</Text>
        <Text style={styles.subtitle}>Tecnología que hace posible el seguimiento de líneas</Text>
        
        <FlatList
          data={componentes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
    </View>
  );
};

// TUS ESTILOS (exactamente como los tenías)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbc3bc',
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#370617',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6a040f', 
    marginBottom: 25,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: width * 0.85,
    height: 200,
    borderRadius: 8,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f4acb7',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#941b0c',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 10,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 22,
    marginBottom: 15,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  infoButtonText: {
    color: '#e09f3e',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ComponentesScreen;