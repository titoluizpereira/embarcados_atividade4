// screens/ConfigScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import globalStyles, { colors } from '../theme/styles';
import { apiGet, apiPut } from '../services/api';

export default function ConfigScreen() {
  const [limiar, setLimiar] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function carregarConfiguracao() {
      try {
        const data = await apiGet('/limiar_temp');
        setLimiar(String(data.limiar_temp));
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível carregar o limiar de temperatura.');
      } finally {
        setLoading(false);
      }
    }
    carregarConfiguracao();
  }, []);

  async function salvar() {
    const valor = Number(limiar);
    if (Number.isNaN(valor)) {
      Alert.alert('Erro', 'Digite um valor numérico válido.');
      return;
    }

    setSaving(true);
    try {
      await apiPut('/limiar_temp', { limiar_temp: valor });
      Alert.alert('Sucesso', 'Configuração atualizada com sucesso.');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar a configuração.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={globalStyles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.text, marginTop: 8 }}>Carregando configuração...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Configuração do sistema</Text>

      <Text style={globalStyles.label}>Limiar de temperatura (°C)</Text>
      <TextInput
        style={globalStyles.input}
        keyboardType="numeric"
        value={limiar}
        onChangeText={setLimiar}
      />

      <Button
        title={saving ? 'Salvando...' : 'Salvar'}
        onPress={salvar}
        color={colors.primarySoft}
        disabled={saving}
      />
    </View>
  );
}
