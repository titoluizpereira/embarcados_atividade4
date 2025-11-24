// screens/HistoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import globalStyles, { colors } from '../theme/styles';
import { apiGet } from '../services/api';

export default function HistoryScreen() {
  const [leituras, setLeituras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function carregarLeituras() {
    try {
      const data = await apiGet('/register');
      setLeituras(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setLeituras([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    carregarLeituras();
  }, []);

  function onRefresh() {
    setRefreshing(true);
    carregarLeituras();
  }

  if (loading && !refreshing) {
    return (
      <View style={globalStyles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.text, marginTop: 8 }}>
          Carregando histórico...
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={leituras}
      keyExtractor={(item, index) => String(item.id ?? index)}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={
        leituras.length === 0 ? globalStyles.centered : globalStyles.listContent
      }
      renderItem={({ item }) => (
        <View style={globalStyles.listItem}>
          <Text style={globalStyles.listItemTitle}>
            {item.temperature.toFixed(1)} °C · {item.humidity.toFixed(1)} %
          </Text>
          {item.created_at && (
            <Text style={globalStyles.listItemSubtitle}>
              {item.created_at}
            </Text>
          )}
          {item.min_temp_configured != null && (
            <Text style={globalStyles.listItemSubtitle}>
              Limiar na leitura: {item.min_temp_configured} °C
            </Text>
          )}
        </View>
      )}
      ListEmptyComponent={
        <Text style={{ color: colors.textMuted }}>
          Nenhuma leitura registrada ainda.
        </Text>
      }
    />
  );
}
