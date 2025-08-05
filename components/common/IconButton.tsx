import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type Props = TouchableOpacityProps & {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
  color?: string;
};
const IconButton: React.FC<Props> = ({ onPress, icon, style,color, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onPress} {...rest}>
      <Ionicons name={icon} size={24} color={color ?? theme.colors.text} />
    </TouchableOpacity>
  );
};
export default IconButton;
const styles = StyleSheet.create({
  btn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(26, 26, 46, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.small,
  },
});
