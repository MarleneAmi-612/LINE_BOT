import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Ale Breceda Paulina',
      role: 'Líder del Proyecto',
      description: 'Líder del equipo y principal encargado del desarrollo lógico del proyecto.',
      image: require('../assets/pau.png'),
      email: 'pau.aleb@hotmail.com',
      github: 'https://github.com/PauAb42',
      instagram: 'pauuu_.ab'
    },
    {
      id: 2,
      name: 'Perez Yadier',
      role: 'Integrador de Componentes Físicos',
      description: 'Encargado principal del armado inicial del carrito y en la gestión de materiales esenciales para su construcción.',
      image: require('../assets/yadimmm.png'),
      email: 'yadimmQhotmail',
      github: 'https://github.com/Yadimmm',
      phone: '+52 1 618 222 2815'
    },
    {
      id: 3,
      name: 'Ontiveros Reyes Ami',
      role: 'Diseñadora Mecánica',
      description: 'Responsable de las conexiones electrónicas y de la integración de nuevos componentes a lo largo del desarrollo.',
      image: require('../assets/ami.png'),
      phone: '+52 1 618 453 5214',
      github: ' https://github.com/MarleneAmi-612',
      instagram: 'amichi_612.j'
    }
  ];

  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleSocialPress = (url) => {
    Linking.openURL(`https://${url}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nuestro Equipo</Text>
      <Text style={styles.subtitle}>Los talentosos detrás del carrito seguidor de línea</Text>
      
      <View style={styles.teamContainer}>
        {teamMembers.map((member) => (
          <View key={member.id} style={styles.profileCard}>
            
            <Image source={member.image} style={styles.profileImage} />
            
            {/* Información del miembro */}
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberRole}>{member.role}</Text>
            
           
            <Text style={styles.memberDescription}>{member.description}</Text>
            
            {/* Contacto */}
            <View style={styles.contactContainer}>
            {member.email && (
                <TouchableOpacity 
                  onPress={() => handleEmailPress(member.email)}
                  style={styles.contactIcon}
                >
                  <MaterialIcons name="email" size={24} color="#3498db" />
                </TouchableOpacity>
              )}
              {member.phone && (
                <TouchableOpacity style={styles.contactIcon}>
                  <FontAwesome5 name="phone-alt" size={20} color="#377771" />
                </TouchableOpacity>
              )}
              
              {member.linkedin && (
                <TouchableOpacity 
                  style={styles.contactIcon}
                  onPress={() => handleSocialPress(`linkedin.com/in/${member.linkedin}`)}
                >
                  <FontAwesome5 name="linkedin" size={24} color="#0077b5" />
                </TouchableOpacity>
              )}
              
              {member.github && (
                <TouchableOpacity 
                  style={styles.contactIcon}
                  onPress={() => handleSocialPress(`github.com/${member.github}`)}
                >
                  <FontAwesome5 name="github" size={24} color="#220901" />
                </TouchableOpacity>
              )}
              
              {member.behance && (
                <TouchableOpacity 
                  style={styles.contactIcon}
                  onPress={() => handleSocialPress(`behance.net/${member.behance}`)}
                >
                  <FontAwesome5 name="behance" size={24} color="#1769ff" />
                </TouchableOpacity>
              )}

              {member.instagram && (
                <TouchableOpacity 
                  style={styles.contactIcon}
                  onPress={() => handleSocialPress(`instagram.com/${member.instagram}`)}
                >
                  <FontAwesome5 name="instagram" size={24} color="#E1306C" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
  },
  teamContainer: {
    marginBottom: 30,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#ad2e24',
  },
  memberName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
    textAlign: 'center',
  },
  memberRole: {
    fontSize: 16,
    color: '#8c2f39',
    marginBottom: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  memberDescription: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  contactIcon: {
    marginHorizontal: 10,
    padding: 8,
  },
});

export default Team;