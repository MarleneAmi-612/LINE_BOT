import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, Dimensions,TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');

const Mapeo = () => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const scrollY = useRef(new Animated.Value(0)).current;

  
  const circuitos = [
    {
      id: 1,
      nombre: "Circuito Principal",
      imagen: require('../assets/mapeo/circuito_negro.jpg'),
      video: require('../assets/mapeo/carrito.mp4'),
      descripcion: "Trayectoria estándar con curvas de 90° a través de una línea negra"
    },
    {
      id: 2,
      nombre: "Circuito 'Linea Blanca'",
      imagen: require('../assets/mapeo/circuito_blanco.jpg'),
      descripcion: "LINEAS BLANCAS"
    }
  ];

  // efecto parallax pro master animation
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [250, 100],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.container}>
     
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <ImageBackground 
          source={circuitos[0].imagen} 
          style={styles.headerImage}
          resizeMode="cover"
        >
          <View style={styles.headerOverlay}>
            <Animated.Text style={[styles.title, { 
              transform: [{
                translateY: scrollY.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -30],
                  extrapolate: 'clamp'
                })
              }] 
            }]}>
              Mapeo del Carrito
            </Animated.Text>
          </View>
        </ImageBackground>
      </Animated.View>

      
      <ScrollView 
        contentContainerStyle={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } }}],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
      
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recorrido en acción</Text>
          
          <Video
            ref={videoRef}
            style={styles.video}
            source={circuitos[0].video}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={setStatus}
          />

          {/*controles*/}
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={() =>
                status.isPlaying 
                  ? videoRef.current.pauseAsync() 
                  : videoRef.current.playAsync()
              }
            >
              <Ionicons 
                name={status.isPlaying ? "pause-circle" : "play-circle"} 
                size={48} 
                color="#9e2a2b" 
              />
            </TouchableOpacity>
          </View>
        </View>

       
        <View style={styles.section}>
          <Text style={styles.descTitle}>Sobre este circuito:</Text>
          <Text style={styles.description}>{circuitos[0].descripcion}</Text>
        </View>

        {/* galeria de muchas fotos*/}
        <Text style={styles.galleryTitle}>Otros circuitos</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gallery}
        >
          {circuitos.map((circuito) => (
            <TouchableOpacity key={circuito.id} style={styles.galleryItem}>
              <ImageBackground 
                source={circuito.imagen} 
                style={styles.galleryImage}
                imageStyle={{ borderRadius: 12 }}
              >
                <View style={styles.galleryOverlay}>
                  <Text style={styles.galleryText}>{circuito.nombre}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    overflow: 'hidden',
  },
  headerImage: {
    flex: 1,
    justifyContent: 'center',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  video: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: '#000',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  descTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e09f3e',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 20,
    marginBottom: 15,
  },
  gallery: {
    paddingLeft: 20,
  },
  galleryItem: {
    width: 150,
    height: 100,
    marginRight: 15,
  },
  galleryImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  galleryOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  galleryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Mapeo;