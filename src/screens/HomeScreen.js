import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { fetchPopularMovies } from "../api/tmdb";
import Card from "../components/MovieCard";

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchPopularMovies();
      setMovies(data);
    };
    loadMovies();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            onPress={() => navigation.navigate("Details", { movieId: item.id })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default HomeScreen;
