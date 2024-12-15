import { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ScrollView, Alert } from "react-native";
import {
  getFavoriteMovies,
  getNowPlayingMovies,
  addFavorite,
  removeFavorite,
} from "../api/db";
import MovieCard from "../components/movieCard";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getNowPlayingMovies();
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchFavorites = async () => {
        try {
          const data = await getFavoriteMovies();
          setFavoriteMovies(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchFavorites();
    }, [])
  );

  const sortedMovies = movies.sort((x, y) => x.title.localeCompare(y.title));

  const handleFavorite = async (movie) => {
    const isFavorite = favoriteMovies.some(
      (favorite) => favorite.id === movie.id
    );
    try {
      if (isFavorite) {
        Alert.alert("Movie was removed from favorites");
        await removeFavorite(movie.id);
        setFavoriteMovies((prev) =>
          prev.filter((favorite) => favorite.id !== movie.id)
        );
      } else {
        Alert.alert("Movie was added to favorites");
        await addFavorite(movie.id);
        setFavoriteMovies((prev) => [...prev, movie]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="mx-6 my-10">
      <View className="flex flex-row items-center justify-between w-full mb-8">
        <Text className="text-3xl font-bold text-center">Movies Inc</Text>
        <Ionicons name="menu" size={20} color="black" />
      </View>
      <ScrollView>
        <View className="flex flex-col gap-6">
          <Text className="font-semibold text-2xl">Now Playing</Text>
          <View className="flex flex-row gap-4">
            <FlatList
              data={sortedMovies}
              renderItem={({ item }) => (
                <MovieCard
                  item={item}
                  isFavorite={favoriteMovies.some(
                    (favorite) => favorite.id === item.id
                  )}
                  handleFavorite={handleFavorite}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ display: "flex", gap: 17 }}
            />
          </View>
        </View>
        {favoriteMovies.length > 0 && (
          <View className="flex flex-col gap-6 mt-10 mb-12">
            <Text className="font-semibold text-2xl">Favorites</Text>
            <View className="flex flex-row gap-4">
              <FlatList
                data={favoriteMovies}
                renderItem={({ item }) => (
                  <MovieCard
                    item={item}
                    isFavorite={favoriteMovies.some(
                      (favorite) => favorite.id === item.id
                    )}
                    handleFavorite={handleFavorite}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ display: "flex", gap: 17 }}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
