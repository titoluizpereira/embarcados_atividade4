// screens/HomeScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import globalStyles, { colors } from '../theme/styles';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={globalStyles.screenContainer}>
      {/* Logo + nome do app */}
      <View style={globalStyles.homeLogoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={globalStyles.homeLogo}
          resizeMode="contain"
        />
        <Text style={globalStyles.homeAppName}>Embarcados Monitor</Text>
        <Text style={globalStyles.homeAppSubtitle}>
          Controle e acompanhe seu sistema em tempo real.
        </Text>
      </View>

      {/* Botões principais */}
      <View style={globalStyles.homeButtonsContainer}>
        <TouchableOpacity
          style={globalStyles.menuButton}
          onPress={() => navigation.navigate('Monitor')}
        >
          <View>
            <Text style={globalStyles.menuButtonText}>Monitor de Temperatura</Text>
            <Text style={globalStyles.menuButtonHint}>
              Ver leitura atual do sensor
            </Text>
          </View>
          <Text style={{ color: colors.primary, fontSize: 20 }}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.menuButton}
          onPress={() => navigation.navigate('Histórico')}
        >
          <View>
            <Text style={globalStyles.menuButtonText}>Histórico de Leitura</Text>
            <Text style={globalStyles.menuButtonHint}>
              Consultar registros anteriores
            </Text>
          </View>
          <Text style={{ color: colors.primary, fontSize: 20 }}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.menuButton}
          onPress={() => navigation.navigate('Config.')}
        >
          <View>
            <Text style={globalStyles.menuButtonText}>Configuração</Text>
            <Text style={globalStyles.menuButtonHint}>
              Ajustar limiar de temperatura
            </Text>
          </View>
          <Text style={{ color: colors.primary, fontSize: 20 }}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
