'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

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

        <ViroARImageMarker target={"waffle"} >
          <Viro3DObject source={require('./res/amongus.obj')}
              position={[-0.0, 0, 0]}
              scale={[.001, .001, .001]}
              //materials={["waffle"]}
              type="OBJ" />

        </ViroARImageMarker>

      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      console.log("console log test")
      this.setState({
        text : "Hello World!"
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

ViroMaterials.createMaterials({
  waffle: {
     lightingModel: "Lambert",
   },
});

ViroARTrackingTargets.createTargets({
  "waffle" : {
    source : require('./res/pattern-marker.png'),
    orientation : "Up",
    physicalWidth : 0.1 // real world width in meters
  },
});

module.exports = HelloWorldSceneAR;
