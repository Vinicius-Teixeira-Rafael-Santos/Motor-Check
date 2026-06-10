import { useState, useEffect } from 'react';
import { api } from '../services/api';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';

export default function VehicleScreen({
  route,
  navigation,
}: any) {
  const { vehicleId } = route.params;

  const [infoExpanded, setInfoExpanded] = useState(false);
  const [preventiveExpanded, setPreventiveExpanded] =
    useState(false);

  const [vehicle, setVehicle] = useState<any>(null);
  const [maintenances, setMaintenances] = useState<any[]>([]);

  const [editModalVisible, setEditModalVisible] =
    useState(false);

  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [ano, setAno] = useState('');
  const [quilometragem, setQuilometragem] =
    useState('');
  const [combustivel, setCombustivel] =
    useState('');
  const [tipo, setTipo] = useState('');
  const [tipoUso, setTipoUso] = useState('');

  const [maintenanceModalVisible, setMaintenanceModalVisible] =
    useState(false);

  const [tipoManutencaoId, setTipoManutencaoId] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    loadVehicle();
    loadMaintenances();
  }, []);

  async function loadVehicle() {
    try {
      const response = await api.get(
        `/vehicles/${vehicleId}`
      );

      setVehicle(response.data);

      setPlaca(response.data.placa || '');
      setModelo(response.data.modelo || '');
      setMarca(response.data.marca || '');
      setAno(
        response.data.ano
          ? String(response.data.ano)
          : ''
      );
      setQuilometragem(
        String(response.data.quilometragem || 0)
      );
      setCombustivel(
        response.data.combustivel || ''
      );
      setTipo(response.data.tipo || '');
      setTipoUso(
        response.data.tipoUso || 'moderado'
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMaintenances() {
    try {
      const response = await api.get(
        `/maintenances/status/${vehicleId}`
      );

      setMaintenances(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateVehicle() {
    try {
      await api.put(`/vehicles/${vehicleId}`, {
        placa,
        modelo,
        marca,
        ano: Number(ano),
        quilometragem: Number(
          quilometragem
        ),
        combustivel,
        tipo,
        tipoUso,
      });

      setEditModalVisible(false);

      await loadVehicle();

      Alert.alert(
        'Sucesso',
        'Veículo atualizado.'
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível atualizar.'
      );
    }
  }

  function deleteVehicle() {
    Alert.alert(
      'Excluir veículo',
      'Deseja realmente excluir este veículo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(
                `/vehicles/${vehicleId}`
              );

              Alert.alert(
                'Sucesso',
                'Veículo removido.'
              );

              navigation.goBack();
            } catch (error) {
              console.log(error);

              Alert.alert(
                'Erro',
                'Não foi possível excluir.'
              );
            }
          },
        },
      ]
    );
  }

  async function registerMaintenance() {
    try {
      await api.post('/maintenances', {
        veiculoId: vehicleId,
        tipoManutencaoId: Number(tipoManutencaoId),
        quilometragemAtual: vehicle.quilometragem,
        observacoes,
      });

      Alert.alert('Sucesso', 'Manutenção registrada.');

      setMaintenanceModalVisible(false);
      setTipoManutencaoId('');
      setObservacoes('');

      await loadMaintenances();
    } catch (error) {
      console.log(error);

      Alert.alert('Erro', 'Não foi possível registrar a manutenção.');
    }
  }

  function getStatusColor(
    status: string
  ) {
    switch (status) {
      case 'ATRASADA':
        return '#DC2626';

      case 'ATENÇÃO':
        return '#F59E0B';

      case 'EM DIA':
        return '#16A34A';

      default:
        return '#6B7280';
    }
  }

  if (!vehicle) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <>
      <Modal
        visible={editModalVisible}
        animationType="slide"
      >
        <ScrollView
          style={{
            flex: 1,
            padding: 20,
          }}
        >
          <Text style={styles.modalTitle}>
            Editar Veículo
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Placa"
            value={placa}
            onChangeText={setPlaca}
          />

          <TextInput
            style={styles.input}
            placeholder="Modelo"
            value={modelo}
            onChangeText={setModelo}
          />

          <TextInput
            style={styles.input}
            placeholder="Marca"
            value={marca}
            onChangeText={setMarca}
          />

          <TextInput
            style={styles.input}
            placeholder="Ano"
            keyboardType="numeric"
            value={ano}
            onChangeText={setAno}
          />

          <TextInput
            style={styles.input}
            placeholder="Quilometragem"
            keyboardType="numeric"
            value={quilometragem}
            onChangeText={
              setQuilometragem
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Combustível"
            value={combustivel}
            onChangeText={
              setCombustivel
            }
          />

          <TextInput
            style={styles.input}
            placeholder="Tipo"
            value={tipo}
            onChangeText={setTipo}
          />

          <TextInput
            style={styles.input}
            placeholder="Tipo de uso"
            value={tipoUso}
            onChangeText={setTipoUso}
          />

          <TouchableOpacity
            style={styles.editButton}
            onPress={updateVehicle}
          >
            <Text
              style={styles.buttonText}
            >
              Salvar Alterações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() =>
              setEditModalVisible(false)
            }
          >
            <Text
              style={styles.buttonText}
            >
              Cancelar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      <Modal
        visible={maintenanceModalVisible}
        animationType="slide"
      >
        <ScrollView style={{ flex: 1, padding: 20 }}>
          <Text style={styles.modalTitle}>
            Registrar Manutenção
          </Text>

          <TextInput
            style={styles.input}
            placeholder="ID do tipo de manutenção"
            keyboardType="numeric"
            value={tipoManutencaoId}
            onChangeText={setTipoManutencaoId}
          />

          <TextInput
            style={styles.input}
            placeholder="Observações"
            value={observacoes}
            onChangeText={setObservacoes}
          />

          <TouchableOpacity
            style={styles.editButton}
            onPress={registerMaintenance}
          >
            <Text style={styles.buttonText}>
              Registrar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() =>
              setMaintenanceModalVisible(false)
            }
          >
            <Text style={styles.buttonText}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      <ScrollView
        contentContainerStyle={
          styles.container
        }
      >        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditModalVisible(true)}
        >
          <Text style={styles.buttonText}>
            Editar Veículo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deleteVehicle}
        >
          <Text style={styles.buttonText}>
            Excluir Veículo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setMaintenanceModalVisible(true)}
        >
          <Text style={styles.buttonText}>
            Registrar Manutenção
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.photoContainer}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>

        <Text style={styles.name}>
          {vehicle.marca || vehicle.modelo}
        </Text>

        <Text style={styles.km}>
          KM: {vehicle.quilometragem?.toLocaleString()}
        </Text>

        <View style={styles.maintenanceBox}>
          <Text style={styles.maintenanceText}>
            Total de preventivas:
          </Text>

          <Text style={styles.maintenanceInfo}>
            {maintenances.length}
          </Text>

          <Text style={styles.maintenanceText}>
            Quilometragem atual:
          </Text>

          <Text style={styles.maintenanceInfo}>
            {vehicle.quilometragem?.toLocaleString()} km
          </Text>
        </View>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            setInfoExpanded(!infoExpanded)
          }
        >
          <Text style={styles.cardTitle}>
            Informações do veículo
          </Text>

          {infoExpanded && (
            <View style={styles.cardContent}>
              <Text style={styles.item}>
                • Tipo: {vehicle.tipo}
              </Text>

              <Text style={styles.item}>
                • Placa: {vehicle.placa}
              </Text>

              <Text style={styles.item}>
                • Modelo: {vehicle.modelo}
              </Text>

              <Text style={styles.item}>
                • Marca:{' '}
                {vehicle.marca ||
                  'Não informado'}
              </Text>

              <Text style={styles.item}>
                • Ano:{' '}
                {vehicle.ano ||
                  'Não informado'}
              </Text>

              <Text style={styles.item}>
                • Quilometragem:{' '}
                {vehicle.quilometragem?.toLocaleString()}{' '}
                km
              </Text>

              <Text style={styles.item}>
                • Combustível:{' '}
                {vehicle.combustivel}
              </Text>

              <Text style={styles.item}>
                • Tipo de uso:{' '}
                {vehicle.tipoUso}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            setPreventiveExpanded(
              !preventiveExpanded
            )
          }
        >
          <Text style={styles.cardTitle}>
            Preventivas
          </Text>

          {preventiveExpanded && (
            <View style={styles.cardContent}>
              {maintenances.length === 0 ? (
                <Text style={styles.itemInfo}>
                  Nenhuma preventiva
                  encontrada.
                </Text>
              ) : (
                maintenances.map(item => (
                  <View
                    key={
                      item.tipoManutencaoId
                    }
                    style={
                      styles.maintenanceItem
                    }
                  >
                    <Text
                      style={
                        styles.itemTitle
                      }
                    >
                      {item.nome}
                    </Text>

                    <Text
                      style={
                        styles.itemInfo
                      }
                    >
                      Última troca:{' '}
                      {item.ultimaTrocaKm
                        ? `${item.ultimaTrocaKm.toLocaleString()} km`
                        : 'Não registrada'}
                    </Text>

                    <Text
                      style={
                        styles.itemInfo
                      }
                    >
                      Próxima troca:{' '}
                      {item.proximaTrocaKm
                        ? `${item.proximaTrocaKm.toLocaleString()} km`
                        : 'Não definida'}
                    </Text>

                    <Text
                      style={[
                        styles.status,
                        {
                          color:
                            getStatusColor(
                              item.status
                            ),
                        },
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                ))
              )}
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },

  editButton: {
    width: '90%',
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },

  deleteButton: {
    width: '90%',
    backgroundColor: '#DC2626',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: '#6B7280',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 75,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  plus: {
    fontSize: 50,
    color: '#777',
    fontWeight: '300',
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  km: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },

  maintenanceBox: {
    width: '90%',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },

  maintenanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },

  maintenanceInfo: {
    fontSize: 15,
    color: '#555',
    marginBottom: 5,
  },

  card: {
    width: '90%',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  cardContent: {
    marginTop: 15,
  },

  item: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },

  maintenanceItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  itemTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#222',
  },

  itemInfo: {
    fontSize: 15,
    color: '#555',
    marginTop: 3,
  },

  status: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: 'bold',
  },
});