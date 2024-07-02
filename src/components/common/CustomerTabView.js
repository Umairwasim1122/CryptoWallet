// import React, { useState, useEffect, useRef } from 'react';
// import { View, useWindowDimensions } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import QRListView from '../../screens/TabViewScreen/QRListView/QRListView';
// import ShortCodeList from '../../screens/TabViewScreen/ShortCodeList/ShortCodeList';
// import KeyBoardDesign from '../../screens/TabViewScreen/KeyboardDesign/KeyboardDesign';

// const renderScene = SceneMap({
//     first: KeyBoardDesign,
//     second: ShortCodeList,
//     third:QRListView
// });

// export default function CustomTabView() {
//     const layout = useWindowDimensions();

//     const [index, setIndex] = React.useState(0);
//     const [routes] = React.useState([
//         { key: 'first', title: 'First' },
//         { key: 'second', title: 'Second' },
//         { key: 'third', title: 'Third' },

//     ]);

//     return (
//         <TabView
//             navigationState={{ index, routes }}
//             renderScene={renderScene}
//             onIndexChange={setIndex}
//             initialLayout={{ width: layout.width }}
//             renderTabBar={() => null}
//         />
//     );
// }