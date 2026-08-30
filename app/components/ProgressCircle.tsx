import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProgressCircleProps {
  progress: number;
  maxProgress: number;
  onMerge: () => void;
  difficultyLevel: number;
  isCompleted: boolean;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  maxProgress,
  onMerge,
  difficultyLevel,
  isCompleted
}) => {
  const circleSize = 200;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * (circleSize / 2);
  const progressPercentage = (progress / maxProgress) * 100;
  const animatedValue = new Animated.Value(progressPercentage);

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progressPercentage,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }, [progress, progressPercentage]);

  const rotateAnim = new Animated.Value(0);
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  React.useEffect(() => {
    if (isCompleted) {
      rotateAnim.setValue(1);
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false
      }).start();
    }
  }, [isCompleted]);

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [
                { translateX: -circleSize / 2 },
                { translateY: -circleSize / 2 },
                { rotate: rotate }
              ]
            }
          ]}
        >
          <Animated.View
            style={[
              styles.progressCircle,
              {
                transform: [
                  { translateX: -circleSize / 2 },
                  { translateY: -circleSize / 2 },
                  {
                    rotate: animatedValue.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0deg', '30deg']
                    })
                  }
                ]
              }
            ]}
          >
            <Text style={styles.progressText}>{Math.round(progressPercentage)}%</Text>
          </Animated.View>
        </Animated.View>
        <TouchableOpacity style={styles.mergeButton} onPress={onMerge}>
          <Ionicons name="md-add" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.difficultyText}>Difficulty: {difficultyLevel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  circleContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: '#ccc',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: strokeWidth,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: strokeWidth,
    borderColor: 'transparent',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mergeButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    right: 10,
  },
  difficultyText: {
    marginTop: 10,
    color: 'gray',
    fontSize: 14,
  }
});

export default ProgressCircle;