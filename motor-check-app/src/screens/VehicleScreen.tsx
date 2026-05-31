import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function VehicleScreen() {
  const [infoExpanded, setInfoExpanded] = useState(false);
  const [preventiveExpanded, setPreventiveExpanded] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      {/* Foto */}
      <TouchableOpacity style={styles.photoContainer}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>

      {/* Nome */}
      <Text style={styles.name}>
        Veículo 1
      </Text>

      {/* Quilometragem */}
      <Text style={styles.km}>
        KM: 20.000
      </Text>

      {/* Última manutenção */}
      <View style={styles.maintenanceBox}>
        <Text style={styles.maintenanceText}>
          Última manutenção:
        </Text>

        <Text style={styles.maintenanceInfo}>
          5.000 km • há 3 meses
        </Text>

        <Text style={styles.maintenanceText}>
          Próxima recomendada:
        </Text>

        <Text style={styles.maintenanceInfo}>
          25.000 km ou em 3 meses
        </Text>
      </View>

      {/* CARD INFORMAÇÕES */}
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
              • Tipo: Carro
            </Text>

            <Text style={styles.item}>
              • Placa: ABC-1234
            </Text>

            <Text style={styles.item}>
              • Modelo: Civic
            </Text>

            <Text style={styles.item}>
              • Ano: 2020
            </Text>

            <Text style={styles.item}>
              • Quilometragem: 20.000 km
            </Text>

            <Text style={styles.item}>
              • Combustível: Flex
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* CARD PREVENTIVAS */}
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

            <Text style={styles.itemTitle}>
                Troca de óleo
            </Text>

            <Text style={styles.itemInfo}>
                Última: 15.000 km
            </Text>

            <Text style={styles.itemInfo}>
                Próxima: 20.000 km
            </Text>

            <Text style={styles.itemTitle}>
                Filtro de óleo
            </Text>

            <Text style={styles.itemInfo}>
                Última: 15.000 km
            </Text>

            <Text style={styles.itemInfo}>
                Próxima: 20.000 km
            </Text>

            <Text style={styles.itemTitle}>
                Filtro de ar
            </Text>

            <Text style={styles.itemInfo}>
                Última: 10.000 km
            </Text>

            <Text style={styles.itemInfo}>
                Próxima: 20.000 km
            </Text>

            <Text style={styles.itemTitle}>
                Filtro de combustível
            </Text>

            <Text style={styles.itemInfo}>
                Última: 10.000 km
            </Text>

            <Text style={styles.itemInfo}>
                Próxima: 20.000 km
            </Text>

            <Text style={styles.itemTitle}>
                Velas
            </Text>

            <Text style={styles.itemInfo}>
                Última: 0 km
            </Text>

            <Text style={styles.itemInfo}>
                Próxima: 40.000 km
            </Text>

            <Text style={styles.itemTitle}>
                Correia dentada
            </Text>

            <Text style={styles.itemInfo}>
                Última: 0 km
            </Text>

            <Text style={styles.itemInfo}>
                Próxima: 60.000 km
            </Text>

            <Text style={styles.itemTitle}>
                Fluido de freio
            </Text>

            <Text style={styles.itemInfo}>
                Última: 12.000 km
            </Text>

            <Text style={styles.itemInfo}>
                Próxima: 24.000 km
            </Text>

            <Text style={styles.itemTitle}>
                Radiador
            </Text>

            <Text style={styles.itemInfo}>
                Última: 0 km
            </Text>

            <Text style={styles.itemInfo}>
                Próxima: 50.000 km
            </Text>

            <Text style={styles.itemTitle}>
                Suspensão
            </Text>

            <Text style={styles.itemInfo}>
                Última: 8.000 km
            </Text>

            <Text style={styles.itemInfo}>
                Próxima: 30.000 km
            </Text>

            <Text style={styles.itemTitle}>
                Pneus
            </Text>

            <Text style={styles.itemInfo}>
                Última: 18.000 km
            </Text>

            <Text style={styles.itemInfo}>
                Próxima: 40.000 km
            </Text>

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

    itemTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#222',
    },

    itemInfo: {
    fontSize: 15,
    color: '#555',
    marginTop: 3,
    },
});