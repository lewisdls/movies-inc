import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function MovieCard({ item, isFavorite, handleFavorite }) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Movie", item);
      }}
    >
      <View>
        <AntDesign
          name={"heart"}
          size={30}
          className="absolute z-20 w-fit top-0 right-0 m-4"
          color={isFavorite ? "red" : "white"}
          onPress={() => handleFavorite(item)}
        />
        <View className="w-[200px] h-[300px]">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
            }}
            className="w-full h-full object-cover"
          />
        </View>
        <View className="py-2">
          <Text className="text-lg font-medium">
            {item.title.length > 21
              ? item.title.slice(0, 21) + "..."
              : item.title}
          </Text>
          <Text className="text-sm">
            <Text className="font-medium">Release Date:</Text>{" "}
            {item.release_date}
          </Text>
          <Text className="text-sm">
            <Text className="font-medium">Votes:</Text>{" "}
            {item.vote_average.toFixed(1)}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
