import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    try {
      const response = await fetch(
        'http://192.168.0.122:3000/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Erro', data.error);
        return;
      }

      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso!'
      );

      navigation.navigate('Login');
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível conectar ao servidor'
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🚗</Text>

        <Text style={styles.title}>
          Criar Conta
        </Text>

        <Text style={styles.subtitle}>
          Cadastre-se para gerenciar seus veículos
        </Text>
      </View>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>
          Cadastrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.link}>
          Já possui conta? Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#F8F9FA',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },

  logo: {
    fontSize: 70,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 10,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 55,
    paddingHorizontal: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ECECEC',
    fontSize: 16,
  },

  button: {
    height: 55,
    backgroundColor: '#FF8C00',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,

    shadowColor: '#FF8C00',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,

    elevation: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  link: {
    color: '#FFC107',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
  },
});