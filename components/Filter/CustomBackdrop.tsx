import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import {BlurView} from "expo-blur"


const AnimatedBlurView  = Animated.createAnimatedComponent(BlurView)

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  // animated variables

  const blurViewProps = useAnimatedProps(() => {
    return {
        intensity: interpolate(
            animatedIndex.value,
            [-1, 0, 1, 2],
            [0, 6, 10, 18],
            Extrapolate.CLAMP
        )
    }
  })

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#0000",
        
      },
    ],
    [style]
  );

  return <AnimatedBlurView animatedProps={blurViewProps} style={containerStyle} />;
};

export default CustomBackdrop;