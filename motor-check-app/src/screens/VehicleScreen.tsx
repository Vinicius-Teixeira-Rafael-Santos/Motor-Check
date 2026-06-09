import { useState, useEffect } from 'react';
import { api } from '../services/api';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function VehicleScreen({ route }: any) {
  const { vehicleId } = route.params;

  const [infoExpanded, setInfoExpanded] = useState(false);
  const [preventiveExpanded, setPreventiveExpanded] = useState(false);

  const [vehicle, setVehicle] = useState<any>(null);
  const [maintenances, setMaintenances] = useState<any[]>([]);

  useEffect(() => {
    loadVehicle();
    loadMaintenances();
  }, []);

  async function loadVehicle() {
    try {
      const response = await api.get(`/vehicles/${vehicleId}`);
      setVehicle(response.data);
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

  function getStatusColor(status: string) {
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
    <ScrollView contentContainerStyle={styles.container}>
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
        onPress={() => setInfoExpanded(!infoExpanded)}
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
              • Marca: {vehicle.marca || 'Não informado'}
            </Text>

            <Text style={styles.item}>
              • Ano: {vehicle.ano || 'Não informado'}
            </Text>

            <Text style={styles.item}>
              • Quilometragem:{' '}
              {vehicle.quilometragem?.toLocaleString()} km
            </Text>

            <Text style={styles.item}>
              • Combustível: {vehicle.combustivel}
            </Text>

            <Text style={styles.item}>
              • Tipo de uso: {vehicle.tipoUso}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          setPreventiveExpanded(!preventiveExpanded)
        }
      >
        <Text style={styles.cardTitle}>
          Preventivas
        </Text>

        {preventiveExpanded && (
          <View style={styles.cardContent}>
            {maintenances.length === 0 ? (
              <Text style={styles.itemInfo}>
                Nenhuma preventiva encontrada.
              </Text>
            ) : (
              maintenances.map(item => (
                <View
                  key={item.tipoManutencaoId}
                  style={styles.maintenanceItem}
                >
                  <Text style={styles.itemTitle}>
                    {item.nome}
                  </Text>

                  <Text style={styles.itemInfo}>
                    Última troca:{' '}
                    {item.ultimaTrocaKm
                      ? `${item.ultimaTrocaKm.toLocaleString()} km`
                      : 'Não registrada'}
                  </Text>

                  <Text style={styles.itemInfo}>
                    Próxima troca:{' '}
                    {item.proximaTrocaKm
                      ? `${item.proximaTrocaKm.toLocaleString()} km`
                      : 'Não definida'}
                  </Text>

                  <Text
                    style={[
                      styles.status,
                      {
                        color: getStatusColor(
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
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#fff',
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