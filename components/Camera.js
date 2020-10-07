import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import FSLTechFilter from './FSLTechFilter';
import GlassesFilter from './GlassesFilter';
import Icon from 'react-native-vector-icons/FontAwesome';


const Camera = (props) => {
    const [left, setLeft] = useState(false);
    const [right, setRight] = useState(false);
    const [state, setState] = useState({
        takingPic: false,
        box: null,
        leftEyePosition: null,
        rightEyePosition: null,
    });
    const camera = useRef(null);

    const takePicture = async () => {
        if (camera && !state.takingPic) {
            let options = {
                quality: 0.85,
                fixOrientation: true,
                forceUpOrientation: true,
            };

            setState({ ...state, takingPic: true });

            try {
                const data = await camera.takePictureAsync(options);
                this.setState({ takingPic: false }, () => {
                    props.onPicture(data);
                });
            } catch (err) {
                setState({ ...state, takingPic: false });
                Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
                return;
            }
        }
    };

    const faceSide = (number) => {
        if (parseInt(number) < 10) setLeft(true)
        else if (parseInt(number) > 90) setRight(true);
        else {
            setRight(false);
            setLeft(false);
        }
    }

    const onFaceDetected = ({ faces }) => {
        if (faces[0]) {
            console.log(faces[0].bounds.origin.x);
            faceSide(faces[0].bounds.origin.x);
            //console.log("yawAngle: " + faces[0].yawAngle);
            //console.log("rollAngle: " + faces[0].rollAngle);
            //console.log("rightEyePosition: " + faces[0].yawAngle);
            //console.log("leftEyePosition: ", faces[0].leftEyePosition);
            setState({
                ...state,
                box: {
                    width: faces[0].bounds.size.width,
                    height: faces[0].bounds.size.height,
                    x: faces[0].bounds.origin.x,
                    y: faces[0].bounds.origin.y,
                    yawAngle: faces[0].yawAngle,
                    rollAngle: faces[0].rollAngle,
                },
                rightEyePosition: faces[0].rightEyePosition,
                leftEyePosition: faces[0].leftEyePosition,
            });
        } else {
            this.setState({
                ...state,
                box: null,
                rightEyePosition: null,
                leftEyePosition: null,
            });
        }
    };

    return (
        <RNCamera
            ref={camera}
            captureAudio={false}
            style={{ flex: 1, flexDirection: "row" }}
            faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
            type={RNCamera.Constants.Type.front}
            onFacesDetected={onFaceDetected}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}>
            {state.box && (
                <>
                    <View style={left ? { flex: 1, backgroundColor: "rgba(0,143,57,.5)" } : { flex: 1 }}>
                        <Text>Hola</Text>
                    </View>
                    <View style={right ? { flex: 1, backgroundColor: "rgba(255,0,0,.5)" } : { flex: 1 }}><Text>Holq 2</Text></View>
                    {/* <FSLTechFilter {...state.box} />
                    <GlassesFilter
                        rightEyePosition={state.rightEyePosition}
                        leftEyePosition={state.leftEyePosition}
                        rollAngle={state.box.rollAngle}
                        yawAngle={state.box.yawAngle}
                    />*/}
                </>
            )}
        </RNCamera>

    );
}
const styles = StyleSheet.create({
    btnAlignment: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
});
export default Camera;