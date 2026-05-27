import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function HomeScreen() {

  const veiculos = [
    {
      id: 1,
      nome: 'Veículo 1',
      km: 20000,
    },
    {
      id: 2,
      nome: 'Veículo 2',
      km: 35000,
    },
    {
      id: 3,
      nome: 'Veículo 3',
      km: 12000,
    },
  ];

  function handleAdd() {
    alert('Adicionar veículo');
  }

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Text style={styles.title}>
          Meus Veículos
        </Text>

        {veiculos.map((veiculo) => (
          <View key={veiculo.id} style={styles.card}>

            <Text style={styles.nome}>
              {veiculo.nome}
            </Text>

            <Text style={styles.km}>
              KM: {veiculo.km}
            </Text>

          </View>
        ))}

      </ScrollView>

      {/* Botão flutuante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAdd}
        activeOpacity={0.7}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',

    borderRadius: 15,

    padding: 20,

    marginBottom: 15,

    elevation: 4,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },

  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  km: {
    fontSize: 16,
    color: '#555',
  },

  fab: {
    position: 'absolute',

    right: 20,
    bottom: 20,

    width: 65,
    height: 65,

    borderRadius: 50,

    backgroundColor: '#007AFF',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  fabText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '300',
    marginTop: -7,
  },
});