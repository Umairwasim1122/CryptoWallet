import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";

const ScanButtonAnimation = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [scrollCoordinates, setScrollCoordinates] = useState({ x: 0, y: 0 });
  const updateScrollCoordinates = (event) => {
    const { x, y } = event.nativeEvent.contentOffset;
    setScrollCoordinates({ x, y });
  };
  const buttonWidth = scrollY.interpolate({
    inputRange: [0, 100], // Adjust input range as needed
    outputRange: [350, 70], // Adjust output range as needed
    extrapolate: "clamp",
  });
  const buttonHeight = 70; // Maintain the same height
  const borderRadius = scrollY.interpolate({
    inputRange: [0, 100], // Adjust input range as needed
    outputRange: [5, 100], // Adjust output range as needed
    extrapolate: "clamp",
  });
  const leftTextOpacity = scrollY.interpolate({
    inputRange: [0, 100], // Adjust input range as needed
    outputRange: [1, 0], // Fade out the right text as you scroll
    extrapolate: "clamp",
  });

  const data = Array.from({ length: 50 }, (_, index) => ({
    key: index.toString(),
  }));

  const renderOrderMethod = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Text>Item {item.key}</Text>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderOrderMethod}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
            listener: updateScrollCoordinates,
          }
        )}
      />
      <Animated.View
        style={[
          styles.button,
          {
            width: buttonWidth,
            height: buttonHeight,
            borderRadius: borderRadius,
          },
        ]}
      >
        <Text style={styles.buttonText}>Right</Text>

        {scrollCoordinates.y > 90 ? null : (
          <Animated.Text
            style={[
              styles.buttonText,
              {
                opacity: leftTextOpacity,
              },
            ]}
          >
            Left Text
          </Animated.Text>
        )}
      </Animated.View>
    </View>
  );
};

export default ScanButtonAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "blue",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
