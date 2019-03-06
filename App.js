/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, SafeAreaView, Dimensions, StyleSheet, Animated, Easing, Text, View, Button} from 'react-native';

const { width: fullWidth, height: fullHeight } = Dimensions.get('window');

const Square = ({ animatedValue, startScale, endScale, left, top, width, height }) => (
  <Animated.View
    style={[
      {
        position: 'absolute',
        transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [startScale, endScale],
            })
          }
        ]
      }
    ]}
  >
    <View style={{
      backgroundColor: 'red',
      left,
      top,
      width,
      height,
    }} />
  </Animated.View>
);

type Props = {};
export default class App extends Component<Props> {
  state = {
    view: 'grid',
    carouselAnimation: new Animated.Value(0),
  }

  showCarousel = () => {
    Animated.timing(this.state.carouselAnimation, {
      toValue: 1,
      timing: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => this.setState({
      view: 'carousel',
    }));
  }

  hideCarousel = () => {
    Animated.timing(this.state.carouselAnimation, {
      toValue: 0,
      timing: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => this.setState({
      view: 'grid',
    }));
  }

  renderButton = () => {
    const { view } = this.state;

    if (view === 'grid') {
      return (
        <Button
          title="Toggle view"
          onPress={this.showCarousel}
        />
      );
    }

    return (
      <Button
        title="Toggle view"
        onPress={this.hideCarousel}
        style={styles.button}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Square
          left={10}
          top={50}
          width={80}
          height={80}
          startScale={1}
          endScale={0}
          animatedValue={this.state.carouselAnimation}
        />
        <Square
          left={200}
          top={100}
          width={70}
          height={90}
          startScale={1}
          endScale={0}
          animatedValue={this.state.carouselAnimation}
        />

        <Square
          left={80}
          top={150}
          width={120}
          height={220}
          startScale={1}
          endScale={0}
          animatedValue={this.state.carouselAnimation}
        />
        <View style={{
          position: 'absolute',
          bottom: 50,
          left: 50,
          right: 50,
          height: 50,
        }}
        >
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#F5FCFF',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    width: 100,
    height: 100,
  }
});
