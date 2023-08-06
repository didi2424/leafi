import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
  Extrapolate,
  interpolate,
} from "react-native-reanimated";

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,
}) => {
  //#region styles
  const containerAnimatedStyle = useAnimatedStyle(() => {
    // Interpolate background color
    const backgroundColor = interpolateColor(
      animatedIndex.value,
      [0, 1],
      ["#eeeeee", "#eeeeee"]
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