import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

type Props = {
  navigation: any;
};

export default function HomeScreen({ navigation }: Props) {
  const veiculos = [
    { id: 1, nome: 'Honda Civic', km: 20000 },
    { id: 2, nome: 'Toyota Corolla', km: 35000 },
    { id: 3, nome: 'HB20', km: 12000 },
  ];

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
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Veículos</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Revisões</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Meus Veículos
        </Text>

        {veiculos.map((veiculo) => (
          <View key={veiculo.id} style={styles.card}>
            <Text style={styles.nome}>{veiculo.nome}</Text>
            <Text style={styles.km}>{veiculo.km.toLocaleString()} km</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Vehicle')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  statCard: {
    width: '48%',
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

  km: {
    marginTop: 5,
    color: '#6B7280',
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
});