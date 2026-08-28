import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Sound } from 'expo-av';

const MergeSuccessAnimation: React.FC<{ onAnimationEnd: () => void }> = ({ onAnimationEnd }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const sound = useRef(new Sound('success.mp3', Sound.AssetPath.Resources)).current;

  useEffect(() => {
    const playSound = async () => {
      try {
        await sound.play();
      } catch (error) {
        console.error('Sound playback failed', error);
      }
    };

    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false
      })
    ]).start(() => {
      onAnimationEnd();
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.successIndicator}>
        <View style={styles.checkmark}>
          <View style={styles.checkmarkLine} />
          <View style={styles.checkmarkTick} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    position: 'absolute',
    top: -30,
    left: '50%',
    transform: [{ translateX: -30 }]
  },
  successIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 2,
    marginBottom: 10
  },
  checkmark: {
    width: 20,
    height: 20,
    position: 'relative'
  },
  checkmarkLine: {
    width: '100%',
    height: 6,
    backgroundColor: 'white',
    borderRadius: 3,
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    margin: 'auto'
  },
  checkmarkTick: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'absolute',
    top: 10,
    left: 5,
    transform: [{ rotate: '45deg' }]
  }
});

export default MergeSuccessAnimation;