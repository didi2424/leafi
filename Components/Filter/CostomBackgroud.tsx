import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  Extrapolate,
  interpolate,
} from "react-native-reanimated";
import { useTheme } from "../../Screens/Profile/Settings/Account/ThemeContext";
import { theme, darkTheme } from '../../Style/style'

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  //#region styles
  const { isDarkMode } = useTheme();
  const selectedTheme = isDarkMode ? darkTheme : theme;
  const { colors, spacing, textVariants } = selectedTheme;

  const containerAnimatedStyle = useAnimatedStyle(() => {
    // Interpolate background color
    const backgroundColor = interpolateColor(
      animatedIndex.value,
      [0, 1],
      [colors.background, colors.background]
    );

    // Interpolate border radius
    const borderTopRadius = interpolate(
      animatedIndex.value,
      [1, 2],
      [20, 90],
      Extrapolate.CLAMP
    );

    return {
      backgroundColor,
      borderTopLeftRadius: borderTopRadius,
      borderTopRightRadius: borderTopRadius,
    };
  });

  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle]
  );
  //#endregion

  // render
  return <Animated.View pointerEvents="none" style={containerStyle} />;
};

export default CustomBackground;