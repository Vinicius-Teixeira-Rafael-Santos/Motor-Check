import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';

type Props = {
  navigation: any;
};

type Vehicle = {
  id: number;
  nome: string;
  modelo: string;
  placa: string;
  km: number;
};

export default function HomeScreen({ navigation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const [nome, setNome] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [km, setKm] = useState('');

  const [veiculos, setVeiculos] = useState<Vehicle[]>([]);

  const [tipo, setTipo] = useState('carros');

  const [marcas, setMarcas] = useState<any[]>([]);
  const [modelos, setModelos] = useState<any[]>([]);
  const [anos, setAnos] = useState<any[]>([]);

  const [marcaId, setMarcaId] = useState('');
  const [modeloId, setModeloId] = useState('');
  const [anoId, setAnoId] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadVehicles();
    }, [])
  );

  useEffect(() => {
    loadMarcas(tipo);
  }, []);

  async function loadVehicles() {
    try {
      const response = await api.get('/vehicles');

      const vehicles = response.data.map((v: any) => ({
        id: v.id,
        nome: v.marca || 'Sem marca',
        modelo: v.modelo,
        placa: v.placa,
        km: v.quilometragem,
      }));

      setVeiculos(vehicles);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMarcas(tipoSelecionado: string) {
  try {
    const response = await api.get(
      `/fipe/marcas/${tipoSelecionado}`
    );

    setMarcas(response.data);
  } catch (error) {
    console.log(error);
  }
}

async function loadModelos(marca: string) {
  try {
    const response = await api.get(
      `/fipe/modelos/${tipo}/${marca}`
    );

    setModelos(response.data);
  } catch (error) {
    console.log(error);
  }
}

async function loadAnos(modelo: string) {
  try {
    const response = await api.get(
      `/fipe/anos/${tipo}/${marcaId}/${modelo}`
    );

    setAnos(response.data);
  } catch (error) {
    console.log(error);
  }
}

  async function adicionarVeiculo() {
    if (!nome || !modelo || !placa || !km) {
      return;
    }

    try {
      await api.post('/vehicles', {
        placa,
        modelo,
        marca: nome,
        quilometragem: Number(km),
        combustivel: 'Flex',
        tipo: 'carro',
      });

      setNome('');
      setModelo('');
      setPlaca('');
      setKm('');

      setModalVisible(false);

      await loadVehicles();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.welcome}>
          Olá
        </Text>

        <Text style={styles.subtitle}>
          Bem-vindo ao Motor Check
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {veiculos.length}
            </Text>

            <Text style={styles.statLabel}>
              Veículos
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Meus Veículos
        </Text>

        {veiculos.map((veiculo) => (
          <TouchableOpacity
            key={veiculo.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate('Vehicle', {
                vehicleId: veiculo.id,
              })
            }
          >
            <Text style={styles.nome}>
              {veiculo.nome}
            </Text>

            <Text style={styles.modelo}>
              {veiculo.modelo}
            </Text>

            <Text style={styles.km}>
              {veiculo.km.toLocaleString()} km
            </Text>

            <Text style={styles.placa}>
              {veiculo.placa}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Adicionar Veículo
            </Text>

            <TextInput
              placeholder="Nome do veículo"
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              placeholder="Modelo"
              style={styles.input}
              value={modelo}
              onChangeText={setModelo}
            />

            <TextInput
              placeholder="Placa"
              style={styles.input}
              value={placa}
              onChangeText={setPlaca}
            />

            <TextInput
              placeholder="Quilometragem"
              style={styles.input}
              keyboardType="numeric"
              value={km}
              onChangeText={setKm}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={adicionarVeiculo}
            >
              <Text style={styles.addButtonText}>
                Salvar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },

  welcome: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1F2937',
  },

  subtitle: {
    color: '#6B7280',
    marginBottom: 25,
  },

  statsContainer: {
    marginBottom: 25,
  },

  statCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },

  statNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF8C00',
  },

  statLabel: {
    color: '#6B7280',
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 4,
  },

  nome: {
    fontSize: 20,
    fontWeight: '700',
  },

  modelo: {
    color: '#6B7280',
    marginTop: 5,
  },

  km: {
    marginTop: 10,
    fontWeight: '600',
  },

  placa: {
    marginTop: 5,
    color: '#9CA3AF',
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  fabText: {
    color: '#FFF',
    fontSize: 40,
    marginTop: -5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },

  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 25,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  addButton: {
    backgroundColor: '#FF8C00',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },

  cancelText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6B7280',
  },
});