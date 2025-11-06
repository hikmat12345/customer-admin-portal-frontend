import { Dimensions } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth: number = 375;
const guidelineBaseHeight: number = 812;

const scale = (size: number): number => (windowWidth / guidelineBaseWidth) * size;

const horizontalScale = (size: number): number => (windowWidth / guidelineBaseWidth) * size;

const verticalScale = (size: number): number => (windowHeight / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor: number = 0.5): number => size + (scale(size) - size) * factor;

export { horizontalScale, moderateScale, scale, verticalScale, windowHeight, windowWidth };
