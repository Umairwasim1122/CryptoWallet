// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import Pie from "react-native-pie";

// const PieChartWithAnimation = () => {
//   const [chartData, setChartData] = useState([
//     { label: "Item 1", value: 0 },
//     { label: "Item 2", value: 0 },
//     { label: "Item 3", value: 0 },
//   ]);

//   const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

//   useEffect(() => {
//     // Simulate data update with animation
//     let animationInterval;
//     if (totalValue < 100) {
//       animationInterval = setInterval(() => {
//         const newData = chartData.map((item) => ({
//           ...item,
//           value: item.value + 10, // You can adjust the value increments as needed
//         }));
//         setChartData(newData);
//       }, 1000); // Adjust the animation duration as needed
//     }

//     return () => clearInterval(animationInterval);
//   }, [chartData, totalValue]);

//   return (
//     <View style={styles.container}>
//       <Pie
//         radius={50}
//         sections={chartData}
//         strokeCap="butt"
//         dividerSize={5}
//         dividerColor={{ color: "grey", width: 1 }}
//       />
//       <Text>Total: {totalValue}%</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//   },
// });

// export default PieChartWithAnimation;
