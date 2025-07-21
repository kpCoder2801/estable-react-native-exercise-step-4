import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const useScreen = () => {
  const { fontScale, height, scale, width } = Dimensions.get("window");
  const { bottom, left, right, top } = useSafeAreaInsets();

  return {
    fontScale,
    SCREEN_HEIGHT: height,
    SCREEN_WIDTH: width,
    scale,
    SAFE_AREA_BOTTOM: bottom + 12,
    SAFE_AREA_LEFT: left,
    SAFE_AREA_RIGHT: right,
    SAFE_AREA_TOP: top,
  };
};

export { useScreen };
