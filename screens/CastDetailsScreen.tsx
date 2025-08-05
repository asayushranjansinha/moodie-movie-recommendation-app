import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PageHeader from "@/components/app/PageHeader";
import Description from "@/components/common/Description";

import { usePersonDetails } from "@/api/queries";
import { theme } from "@/constants/theme";

const CastDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = usePersonDetails(id);

  if (!data || isLoading) return null;

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <PageHeader title="Cast Details" />

        <View style={styles.section}>
          <View style={styles.profileRow}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w300${data.profile_path}`,
              }}
              style={styles.avatar}
              contentFit="cover"
            />

            <View style={styles.metaCol}>
              <Text style={styles.name}>{data.name}</Text>
              {data.known_for_department && (
                <Text style={styles.meta}>
                  Department: {data.known_for_department}
                </Text>
              )}
              {data.birthday && (
                <Text style={styles.meta}>Birthday: {data.birthday}</Text>
              )}
              {data.place_of_birth && (
                <Text style={styles.meta}>Born in: {data.place_of_birth}</Text>
              )}
            </View>
          </View>

          {/* Meta  */}
          <Description
            title="Biography"
            description={data.biography}
            maxLines={5}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CastDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 999,
  },
  metaCol: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    marginBottom: theme.spacing.md,
  },
  name: {
    ...theme.typography.heading3,
    color: theme.colors.text,
    fontFamily: "Inter-SemiBold",
  },
  meta: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontFamily: "Inter-Regular",
  },
});
