// screens/StatusScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import globalStyles, { colors } from '../theme/styles';
import { apiGet } from '../services/api';

export default function StatusScreen() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function carregarStatus() {
    try {
      // Ajuste isso para o endpoint real do backend
      const data = await apiGet('/status');
      setStatus(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    carregarStatus();
  }, []);

  function onRefresh() {
    setRefreshing(true);
    carregarStatus();
  }

  if (loading && !refreshing) {
    return (
      <View style={globalStyles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.text, marginTop: 8 }}>Carregando status...</Text>
      </View>
    );
  }

  if (!status) {
    return (
      <View style={globalStyles.centered}>
        <Text style={{ color: colors.textMuted }}>Não foi possível obter o status.</Text>
      </View>
    );
  }

  const { temperatura, umidade, limiar_temp, timestamp } = status;
  const acima = temperatura >= limiar_temp;

  return (
    <ScrollView
      contentContainerStyle={globalStyles.screenContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={globalStyles.title}>Status do sistema</Text>

      <View style={globalStyles.card}>
        <Text style={globalStyles.label}>Temperatura atual</Text>
        <Text style={globalStyles.value}>{temperatura.toFixed(1)} °C</Text>
      </View>

      <View style={globalStyles.card}>
        <Text style={globalStyles.label}>Umidade atual</Text>
        <Text style={globalStyles.value}>{umidade.toFixed(1)} %</Text>
      </View>

      <View style={globalStyles.card}>
        <Text style={globalStyles.label}>Limiar configurado</Text>
        <Text style={globalStyles.value}>{limiar_temp.toFixed(1)} °C</Text>
      </View>

      <View style={globalStyles.card}>
        <Text style={globalStyles.label}>Situação</Text>
        <Text
          style={[
            globalStyles.value,
            { color: acima ? colors.danger : colors.success },
          ]}
        >
          {acima ? 'ACIMA do limite (LED vermelho)' : 'Dentro do limite (LED verde)'}
        </Text>
      </View>

      {timestamp && (
        <Text style={globalStyles.timestamp}>Última leitura: {timestamp}</Text>
      )}
    </ScrollView>
  );
}
