import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { BleManager } from 'react-native-ble-plx';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const SensoresScreen = () => {
  // Estados
  const [sensorData, setSensorData] = useState([
    { id: 1, name: 'Sensor Izquierdo', value: 0 },
    { id: 2, name: 'Sensor Central', value: 0 },
    { id: 3, name: 'Sensor Derecho', value: 0 }
  ]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // 'disconnected' | 'connecting' | 'connected'
  const [history, setHistory] = useState({
    labels: Array(10).fill(''),
    datasets: [
      { data: Array(10).fill(0), color: () => '#335c67' }, // Izquierdo
      { data: Array(10).fill(0), color: () => '#e09f3e' }, // Central
      { data: Array(10).fill(0), color: () => '#9e2a2b' }  // Derecho
    ]
  });

  // simular datos cuando no hay conexión porque no jala si no muestra algo
  useEffect(() => {
    if (connectionStatus === 'disconnected') {
      const interval = setInterval(() => {
        const mockValues = [
          Math.round(Math.random()), 
          Math.round(Math.random()), 
          Math.round(Math.random())
        ];
        
        updateData(mockValues, true);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [connectionStatus]);

  const updateData = (values, isMock = false) => {
    // Actualizar datos simples
    setSensorData(prev => prev.map((sensor, idx) => ({
      ...sensor,
      value: values[idx]
    })));

    // Actualizar histórico para gráficos
    const now = new Date();
    const timeLabel = `${now.getMinutes()}:${now.getSeconds()}`;
    
    setHistory(prev => {
      const newData = {
        labels: [...prev.labels.slice(1), timeLabel],
        datasets: prev.datasets.map((dataset, idx) => ({
          ...dataset,
          data: [...dataset.data.slice(1), values[idx]]
        }))
      };
      return newData;
    });
  };

  const connectToDevice = () => {
    setConnectionStatus('connecting');
    
    // Aquí iría tu lógica real de conexión BLE
    // Simulamos una conexión que falla después de 3 segundos
    setTimeout(() => {
      setConnectionStatus('disconnected');
    }, 3000);
  };

  const renderConnectionStatus = () => {
    switch (connectionStatus) {
      case 'connected':
        return (
          <View style={styles.statusContainer}>
            <Ionicons name="wifi" size={20} color="#4CAF50" />
            <Text style={[styles.statusText, { color: '#4CAF50' }]}>Conectado al carrito</Text>
          </View>
        );
      case 'connecting':
        return (
          <View style={styles.statusContainer}>
            <ActivityIndicator size="small" color="#FF9800" />
            <Text style={[styles.statusText, { color: '#FF9800' }]}>Conectando...</Text>
          </View>
        );
      default:
        return (
          <View style={styles.statusContainer}>
            <Ionicons name="wifi-off" size={20} color="#F44336" />
            <Text style={[styles.statusText, { color: '#F44336' }]}>Modo demostración (sin conexión)</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitoreo de Sensores</Text>
      
      {renderConnectionStatus()}

      {/* Gráficos */}
      <View style={styles.chartContainer}>
        <LineChart
          data={history}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: { r: '3', strokeWidth: '1' },
          }}
          bezier
          withDots={false}
          withInnerLines={false}
        />
      </View>

      {/* Tarjetas de sensores */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
        {sensorData.map(sensor => (
          <View key={sensor.id} style={[
            styles.sensorCard,
            sensor.value ? styles.sensorActive : styles.sensorInactive
          ]}>
            <Text style={styles.sensorName}>{sensor.name}</Text>
            <Text style={styles.sensorValue}>
              {sensor.value ? 'DETECTADO' : 'LIBRE'}
            </Text>
            <View style={[
              styles.sensorIndicator,
              sensor.value ? styles.indicatorActive : styles.indicatorInactive
            ]}/>
          </View>
        ))}
      </ScrollView>

      {/* Botón de conexión */}
      <TouchableOpacity
        style={[
          styles.button,
          connectionStatus === 'connected' && styles.connectedButton,
          connectionStatus === 'connecting' && styles.connectingButton
        ]}
        onPress={connectToDevice}
        disabled={connectionStatus === 'connecting'}
      >
        {connectionStatus === 'connecting' ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>
            {connectionStatus === 'connected' ? 'DESCONECTAR' : 'CONECTAR A TURBORUCA'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardsContainer: {
    marginBottom: 16,
  },
  sensorCard: {
    width: 150,
    padding: 16,
    marginRight: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  sensorActive: {
    borderTopWidth: 4,
    borderTopColor: '#4CAF50',
  },
  sensorInactive: {
    borderTopWidth: 4,
    borderTopColor: '#F44336',
  },
  sensorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sensorValue: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sensorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  indicatorActive: {
    backgroundColor: '#4CAF50',
  },
  indicatorInactive: {
    backgroundColor: '#F44336',
  },
  button: {
    backgroundColor: '#9e2a2b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  connectedButton: {
    backgroundColor: '#4CAF50',
  },
  connectingButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SensoresScreen;