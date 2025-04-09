import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  ScrollView 
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Inicio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Imagen de fondo a todo ancho y alto */}
      <ImageBackground
        source={require('../assets/fondo.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Capa semitransparente */}
        <View style={styles.overlay}>
          {/* ScrollView para contenido desplazable */}
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Contenido principal */}
            <View style={styles.content}>
              <Text style={styles.title}>Bienvenido a nuestra App</Text>
              
              <Image
                source={require('../assets/mapeo/completo.jpg')}
                style={styles.carImage}
                resizeMode="contain"
              />
              
              <View style={styles.textContainer}>
                <Text style={styles.subtitle}>Carrito Seguidor de Línea</Text>
                <Text style={styles.description}>
                Este es nuestro innovador Carrito Seguidor de Línea, un robot autónomo diseñado para detectar y seguir de manera precisa un trayecto delineado en el suelo. Este proyecto fusiona principios de robótica, electrónica y programación para ofrecer una solución eficiente en el seguimiento de rutas predefinidas. {"\n"} {"\n"} {"\n"}

                El robot opera detectando continuamente la línea guía mediante sus sensores IR. Cuando los sensores identifican que el robot se está desviando de la línea, el microcontrolador procesa esta información y ajusta la velocidad de los motores para corregir la trayectoria. Este proceso de retroalimentación permite que el robot siga la línea de manera autónoma y precisa.{"\n"} {"\n"} {"\n"} Increible, ¿no?
                </Text>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.subtitle}>Pero...¡Nuestro carrito tiene nombre!</Text>
              
              </View>

              <Image
                source={require('../assets/ruca.jpg')}
                style={styles.carImage}
                resizeMode="contain"
              />

              <View style={styles.textContainer}>
                <Text style={styles.description}>
                "Maldice al que pierda una carrera con ella"{"\n"} {"\n"} {"\n"}
                Les presentamos a nuestra TurboRuca, el vehículo que redefine la velocidad. ¿Por qué "TurboRuca"? Bueno, imaginen a la abuelita más veloz que hayan conocido, esa que no necesita bastón porque va más rápido que un rayo. Ahora, combínenla con la potencia de un motor turbo y obtendrán a nuestro intrépido carrito. TurboRuca no solo sigue líneas, las persigue con una pasión desenfrenada. ¡Prepárense para verlo en acción y traten de seguirle el ritmo si pueden!
                </Text>
              </View>


              <Text style={styles.description}>
                Puedes ver más información de cada miembro que conforma al equipo que se esforzó en desarrollar esta TurboRuca
              </Text>

              
              
              <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Team')}
              >
                <Text style={styles.buttonText}>Ver equipo de trabajo</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#220901',
    marginBottom: 20,
    textAlign: 'center',
  },
  carImage: {
    width: '100%',
    height: height * 0.5,
    maxHeight: 500,
    marginBottom: 15,
  },
  textContainer: {
    marginBottom: 25,
    width: '100%',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#38040e',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#34495e',
    textAlign: 'justify',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#780116',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '50%',
    minWidth: 200,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Inicio;