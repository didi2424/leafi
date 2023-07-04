import React from 'react';
import { Button, Dimensions, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const CircleCustom = () => {
  const BACKGROUND_COLOR = '#444B6F';
  const BACKGROUND_STROKE_COLOR = '#303858';
  const STROKE_COLOR = '#A6E1FA';
  const CIRCLE_LENGTH = 400; // 2PI*R
  const R = CIRCLE_LENGTH / (2 * Math.PI);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const progress = useSharedValue(0);
  const { width, height } = Dimensions.get('window');
  // Animated properties for the Circle component
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  // Function to start the animation
  const startAnimation = () => {
    progress.value = withTiming(1, { duration: 2000 });
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={400} height={400}>
        <Circle
          cx={200}
          cy={200}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={20}
          strokeDasharray={CIRCLE_LENGTH}
          strokeDashoffset={CIRCLE_LENGTH * 0.2}
          strokeLinecap={'round'}
        />

        {/* <Circle
          cx={200 / 2}
          cy={200 / 2}
          r={90}
          stroke={STROKE_COLOR}
          strokeWidth={18}
          strokeDasharray={CIRCLE_LENGTH * 0.2}
          strokeLinecap={'round'}
        /> */}
       </Svg>
    </View>
  );
};

export default CircleCustom;
