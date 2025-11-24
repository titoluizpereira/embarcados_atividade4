// screens/MonitorScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import globalStyles, { colors } from '../theme/styles';
import { apiGet } from '../services/api';

export default function MonitorScreen() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function carregarStatus() {
    try {
      // aqui você adapta para seu backend real
      // exemplo: usar /config + /register para montar status
      const [config, registros] = await Promise.all([
        apiGet('/config'),
        apiGet('/register'),
      ]);

      const ultimo = Array.isArray(registros) && registros.length
        ? registros[registros.length - 1]
        : null;

      if (!ultimo) {
        setStatus(null);
      } else {
        setStatus({
          temperatura: ultimo.temperature,
          umidade: ultimo.humidity,
          limiar_temp: config.temp_min,
          timestamp: ultimo.created_at,
        });
      }
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
        <Text style={{ color: colors.text, marginTop: 8 }}>
          Carregando dados...
        </Text>
      </View>
    );
  }

  if (!status) {
    return (
      <View style={globalStyles.centered}>
        <Text style={{ color: colors.textMuted }}>
          Ainda não há leituras registradas.
        </Text>
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
      <Text style={globalStyles.title}>Monitor de Temperatura</Text>
      <Text style={globalStyles.subtitle}>
        Acompanhe em tempo real o estado do seu sistema embarcado.
      </Text>

      <View style={globalStyles.card}>
        <Text style={globalStyles.label}>Temperatura atual</Text>
        <Text style={globalStyles.value}>
          {temperatura.toFixed(1)} °C
        </Text>
      </View>

      <View style={globalStyles.card}>
        <Text style={globalStyles.label}>Umidade atual</Text>
        <Text style={globalStyles.value}>
          {umidade.toFixed(1)} %
        </Text>
      </View>

      <View style={globalStyles.card}>
        <Text style={globalStyles.label}>Limiar configurado</Text>
        <Text style={globalStyles.value}>
          {limiar_temp.toFixed(1)} °C
        </Text>
      </View>

      <View style={globalStyles.card}>
        <Text style={globalStyles.label}>Situação</Text>
        <Text
          style={[
            globalStyles.value,
            { color: acima ? colors.danger : colors.success },
          ]}
        >
          {acima
            ? 'ACIMA do limite (LED vermelho)'
            : 'Dentro do limite (LED verde)'}
        </Text>
      </View>

      {timestamp && (
        <Text style={globalStyles.timestamp}>
          Última leitura: {timestamp}
        </Text>
      )}
    </ScrollView>
  );
}
