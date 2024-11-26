import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Importar useFocusEffect
import { getFavorites } from "../api/firebase"; // Asegúrate de tener esta función configurada correctamente

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar los favoritos
  const loadFavorites = async () => {
    try {
      setLoading(true); // Inicia la carga
      const data = await getFavorites(); // Obtiene los favoritos
      setFavorites(data); // Establece los favoritos en el estado
    } catch (err) {
      setError("Hubo un problema al cargar los favoritos.");
      console.error(err);
    } finally {
      setLoading(false); // Desactiva el indicador de carga
    }
  };

  // Utiliza useFocusEffect para recargar la lista cada vez que la pantalla se enfoque
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites(); // Llama a la función de carga de favoritos cada vez que se enfoque la pantalla
    }, []) // El array vacío asegura que solo se ejecute una vez cuando la pantalla se enfoque
  );

  const renderFavorite = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.posterPath}` }}
        style={styles.favoriteImage}
      />
      <Text style={styles.favoriteTitle}>{item.title}</Text>
      <Button
        title="Ver detalles"
        onPress={() =>
          navigation.navigate("Details", { movieId: item.movieId })
        }
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando favoritos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No tienes favoritos guardados.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Favoritos</Text>
      <FlatList
        data={favorites}
        renderItem={renderFavorite}
        keyExtractor={(item) => item.movieId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  favoriteItem: {
    marginBottom: 20,
    alignItems: "center",
  },
  favoriteImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  favoriteTitle: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default FavoriteScreen;
