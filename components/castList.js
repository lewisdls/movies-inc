import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { getCastById } from "../api/db";
import { useRoute } from "@react-navigation/native";

export default function CastList() {
  const [isLoading, setIsLoading] = useState(true);
  const [cast, setCast] = useState();
  const { params: item } = useRoute();

  useEffect(() => {
    const getCast = async (id) => {
      try {
        const data = await getCastById(id);
        setCast(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCast(item.id);
  }, [item]);

  return (
    <View className="flex gap-3">
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        cast.map((c) => (
          <View key={c.credit_id}>
            <View className="w-fit flex">
              <Text className="leading-normal">
                {c.name} as <Text className="font-medium">{c.character}</Text>
              </Text>
            </View>
          </View>
        ))
      )}
    </View>
  );
}
