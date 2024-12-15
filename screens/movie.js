import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import {
  addFavorite,
  getFavoriteMovies,
  getMovieById,
  getMovieStatesById,
  getSimilarMoviesById,
  removeFavorite,
} from "../api/db";
import { addRating } from "../api/db";
import CastList from "../components/castList";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MovieCard from "../components/movieCard";

export default function MovieScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState();
  const [similar, setSimilar] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [rating, setRating] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const { params: item } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getMovieById(item.id);
      const movieStates = await getMovieStatesById(item.id);
      const similarMovies = await getSimilarMoviesById(item.id);
      const favorites = await getFavoriteMovies();
      setMovie(movieData);
      setRating(movieStates.rated?.value || 0);
      setFavorite(movieStates.favorite);
      setFavoriteMovies(favorites);
      setSimilar(similarMovies);
      setIsLoading(false);
    };
    fetchData();
  }, [item]);

  const handleFavorite = async (movie) => {
    const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id);
    try {
      if (isFavorite) {
        Alert.alert("Movie was removed from favorites");
        await removeFavorite(movie.id);
        setFavoriteMovies((prev) => prev.filter((fav) => fav.id !== movie.id));
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
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View className="relative h-full">
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={20}
              color="white"
              className="absolute z-20 w-fit top-0 left-0 m-6 p-2 bg-blue-500 rounded-lg"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={async () => {
              try {
                setFavorite(!favorite);
                if (!favorite) {
                  Alert.alert("Movie added to favorites!");
                  await addFavorite(item.id);
                } else {
                  Alert.alert("Movie removed from favorites");
                  await removeFavorite(item.id);
                }
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <AntDesign
              name={"heart"}
              size={20}
              className="absolute z-20 w-fit top-0 right-0 m-6 p-2 bg-blue-500 rounded-lg"
              color={favorite ? "red" : "white"}
            />
          </TouchableWithoutFeedback>
          <ScrollView>
            <View className="h-[400px]">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                }}
                className="w-full h-full object-cover"
              />
            </View>
            <View className="h-fit m-6">
              <View>
                <Text className="flex self-center justify-self-center text-center text-4xl font-semibold w-2/3">
                  {movie.title}
                </Text>
                <View className="flex flex-row w-full items-center justify-center gap-3"></View>
                <View className="flex flex-row items-center gap-2 justify-center mt-2 w-full">
                  <Text>{movie.release_date.slice(0, 4)}</Text>
                </View>
                <View className="flex justify-center flex-row mt-2 w-full">
                  {movie.genres.map((g, index) => (
                    <View
                      key={g.id}
                      className="flex flex-row items-center gap-2"
                    >
                      <Text className={`${index > 0 && "ml-2"}`}>{g.name}</Text>
                      {index !== movie.genres.length - 1 && (
                        <View className="w-1 h-1 bg-black rounded-full group-last:hidden" />
                      )}
                    </View>
                  ))}
                </View>
                <View className="mt-4 flex flex-row w-full items-center justify-center gap-2">
                  {[...Array(5)].map((star, index) => (
                    <AntDesign
                      key={index}
                      name={index < rating ? "star" : "staro"}
                      size={20}
                      color={index < rating ? "#d0b801" : "black"}
                      onPress={async () => {
                        try {
                          setRating(index + 1);
                          const res = await addRating(item.id, index + 1);
                          Alert.alert("Rating submitted successfully!");
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    />
                  ))}
                </View>
                <Text className="mt-6 leading-normal">{movie.overview}</Text>
              </View>
              <View className="mt-6">
                <Text className="text-lg font-medium mb-4">Cast</Text>
                <CastList />
              </View>
              <View className="mt-6">
                <Text className="text-lg font-medium mb-4">
                  Recommended Movies
                </Text>
                {similar.length > 0 ? (
                  <FlatList
                    data={similar}
                    renderItem={({ item }) => (
                      <MovieCard
                        item={item}
                        isFavorite={favoriteMovies.some(
                          (fav) => fav.id === item.id
                        )}
                        handleFavorite={handleFavorite}
                      />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ display: "flex", gap: 17 }}
                  />
                ) : (
                  <Text>No similar movies exist. Yes, it is that special.</Text>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
