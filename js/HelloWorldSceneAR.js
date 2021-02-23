'use strict';

import React, { Component} from 'react';

import {StyleSheet, Linking} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroNode,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroBox,
  Viro3DObject,
  ViroMaterials,
  ViroAmbientLight,
  ViroImage,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color="#FFFFFF" />

        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

        <ViroARImageMarker target={"banana"} >
          <Viro3DObject source={require('./res/Banana.obj')}
              position={[0, 0.05, 0]}
              scale={[.001, .001, .001]}
              type="OBJ" />
        </ViroARImageMarker>

        <ViroARImageMarker target={"amongus"} onClick={this._orderNow}>
          <Viro3DObject source={require('./res/amongus.obj')}
              position={[0, .05, 0]}
              scale={[.001, .001, .001]}
              type="OBJ" />
        </ViroARImageMarker>

        <ViroARImageMarker target={"waffle"}>
          <ViroImage
              height={.5}
              width={.5}
              position={[0, .2, 0]}
              source={require("./res/Smashed-Icon-4-01.png")}
           />
        </ViroARImageMarker>


      </ViroARScene>
    );
  }

  _orderNow() {
    console.log("click")
    Linking.openURL('https://static1.squarespace.com/static/582bc464d1758e48585deec3/t/5cd1d9ab0852294b4237069e/1557256623454/Smashed-New-Menu-Print-Photos-Small-compressed.pdf')
  }
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      console.log("console log test")
      this.setState({
        text : "Hello Demo!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
/*
ViroMaterials.createMaterials({
  waffle: {
     lightingModel: "Lambert",
   },
});
*/
ViroARTrackingTargets.createTargets({
  "banana" : {
    source : require('./res/watermelonQR.png'),
    orientation : "Up",
    physicalWidth : 0.071 // real world width in meters
  },
  "amongus" : {
    source : require('./res/amongusQR.png'),
    orientation : "Up",
    physicalWidth : 0.071 // real world width in meters
  },
  "waffle" : {
    source : require('./res/waffleQR.png'),
    orientation : "Up",
    physicalWidth : 0.071 // real world width in meters
  },
});

module.exports = HelloWorldSceneAR;
