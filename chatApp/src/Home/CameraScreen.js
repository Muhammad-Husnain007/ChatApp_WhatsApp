// // CameraScreen.js
// import React from 'react';
// import { View, Text } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// const CameraScreen = () => {
//   const takePicture = async () => {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options);
//       console.log(data.uri);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <RNCamera
//         ref={ref => {
//           this.camera = ref;
//         }}
//         style={{ flex: 1 }}
//         type={RNCamera.Constants.Type.back}
//         flashMode={RNCamera.Constants.FlashMode.off}
//       />
//       <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//         <TouchableOpacity onPress={takePicture}>
//           <Text style={{ fontSize: 14 }}> SNAP </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CameraScreen;
