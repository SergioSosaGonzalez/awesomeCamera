/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import Camera from './components/Camera';

import {
  SafeAreaView, TouchableHighlight, Image, Dimensions
} from 'react-native';

const App: () => React$Node = () => {
  const [img, setImg] = useState(null);

  const onPicture = ({ uri }) => {
    setImg(uri);
  }

  const onBackToCamera = () => {
    setImg(null);
  }
  console.log(Dimensions.get('window').width);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {img ? (
          <TouchableHighlight
            style={{ flex: 1 }}
            onPress={() => {
              onBackToCamera();
            }}>
            <Image source={{ uri: img }} style={{ flex: 1 }} />
          </TouchableHighlight>
        ) : (
            <Camera onPicture={onPicture} />
          )}
      </SafeAreaView>
    </>
  );
};


export default App;
