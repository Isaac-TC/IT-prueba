import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Item {
  id: number;
  description: string;
  amount: number;
  quantity: number;
  total: number;
  date: string;
}

export default function RegistroScreen() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const navigation = useNavigation();

  const agregarItem = () => {
    const parsedAmount = parseFloat(amount);
    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedAmount) || isNaN(parsedQuantity)) {
      Alert.alert('Error', 'El monto o cantidad ingresados no son válidos.');
      return;
    }

    if (parsedAmount < 0 || parsedQuantity < 0) {
      Alert.alert('Error', 'El monto o la cantidad no pueden ser negativos.');
      return;
    }

    if (parsedAmount < 1 || parsedAmount > 20) {
      Alert.alert(
        'Advertencia',
        'El monto es menor a $1 o mayor a $20. ¿Deseas continuar?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Aceptar', onPress: () => guardarItem(parsedAmount, parsedQuantity) },
        ]
      );
      return;
    }

    guardarItem(parsedAmount, parsedQuantity);
  };

  const guardarItem = (parsedAmount: number, parsedQuantity: number) => {
    const total = parsedAmount * parsedQuantity; // Calcular el total
    const newItem: Item = {
      id: items.length + 1,
      description,
      amount: parsedAmount,
      quantity: parsedQuantity,
      total,
      date: new Date().toLocaleDateString(),
    };

    setItems([...items, newItem]);

    Alert.alert('Éxito', 'El item se ha guardado correctamente.', [
      { text: 'OK', onPress: () => navigation.navigate('Poductos') }, 
    ]);

    setDescription('');
    setAmount('');
    setQuantity('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Operaciones</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Button title="Agregar" onPress={agregarItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Descripción: {item.description}</Text>
            <Text>Monto: ${item.amount.toFixed(2)}</Text>
            <Text>Cantidad: {item.quantity}</Text>
            <Text>Total: ${item.total.toFixed(2)}</Text>
            <Text>Fecha: {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  item: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
