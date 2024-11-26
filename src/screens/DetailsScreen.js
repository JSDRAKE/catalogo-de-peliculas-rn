import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { fetchMovieDetails } from "../api/tmdb";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../api/firebase";

const DetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params; // Recibe el ID de la película
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true); // Asegúrate de que la carga esté activada al inicio
      try {
        console.log("Cargando detalles de la película con ID:", movieId); // Log de depuración
        const data = await fetchMovieDetails(movieId);
        console.log("Datos de la película recibidos:", data); // Log de depuración
        setMovieDetails(data);

        // Verifica si la película ya está en favoritos
        const favorites = await getFavorites();
        const isAlreadyFavorite = favorites.some(
          (fav) => fav.movieId === movieId
        );
        setIsFavorite(isAlreadyFavorite);
      } catch (error) {
        console.error("Error al cargar detalles:", error);
      } finally {
        setLoading(false); // Asegúrate de que se desactive la carga
      }
    };

    loadDetails();
  }, [movieId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text>No se pudieron cargar los detalles de la película.</Text>
        <Button
          title="Volver al Catálogo"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

  const handleAddToFavorites = () => {
    const { title, poster_path } = movieDetails;
    addToFavorites(movieId, title, poster_path);
    setIsFavorite(true); // Actualiza el estado de favoritos
    alert("Película añadida a favoritos");
  };

  const handleRemoveFromFavorites = () => {
    // Lógica para eliminar de favoritos
    removeFromFavorites(movieId);
    setIsFavorite(false); // Actualiza el estado de favoritos
    alert("Película eliminada de favoritos");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{movieDetails.title}</Text>
      <Text style={styles.genre}>
        Géneros: {movieDetails.genres.map((genre) => genre.name).join(", ")}
      </Text>
      <Text style={styles.releaseDate}>
        Fecha de lanzamiento: {movieDetails.release_date}
      </Text>
      <Text style={styles.description}>{movieDetails.overview}</Text>
      <View style={styles.buttonContainer}>
        {!isFavorite ? (
          <Button title="Añadir a Favoritos" onPress={handleAddToFavorites} />
        ) : (
          <Button
            title="Eliminar de Favoritos"
            onPress={handleRemoveFromFavorites}
          />
        )}
        <Button
          title="Volver al Catálogo"
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 600,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  genre: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  releaseDate: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DetailsScreen;
