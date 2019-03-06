/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, SafeAreaView, Dimensions, StyleSheet, Animated, Easing, Text, View, TouchableOpacity, Button} from 'react-native';

const { width: fullWidth, height: fullHeight } = Dimensions.get('window');

class Square extends Component {
  state = {
    expanded: false,
    animatedValue: new Animated.Value(0),
  }

  showCarousel = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      timing: 100,
      easing: Easing.circle,
      useNativeDriver: true,
    }).start(() => this.setState({
      expanded: true,
    }));
  }

  hideCarousel = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 0,
      timing: 100,
      easing: Easing.circle,
      useNativeDriver: true,
    }).start(() => this.setState({
      expanded: false,
    }));
  }

  toggleAnimation = () => {
    this.state.expanded ? this.hideCarousel() : this.showCarousel();
  }

  getTranslateX = () => {
    const { left } = this.props;

    if (left === 0) {
      return fullWidth / 3;
    }

    if (left === 2) {
      return -fullWidth / 3;
    }

    return 0;
  }

  getTranslateY = () => {
    const { top } = this.props;

    if (top === 0) {
      return fullWidth / 3;
    }

    if (top === 2) {
      return -fullWidth / 3;
    }

    return 0;
  }

  render() {
    const { animatedValue } = this.state;
    const { left, top, backgroundColor, noAnimate } = this.props;

    return (
      <View
          style={{
            position: 'absolute',
            left: left * fullWidth / 3,
            top: top * fullWidth / 3,
            width: fullWidth / 3,
            height: fullWidth / 3,
          }}
      >
        <TouchableOpacity onPress={this.toggleAnimation}>
            <Animated.View
            style={[
              {
                transform: noAnimate ? [] : [
                  {
                    translateX: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, this.getTranslateX()]
                    })
                  },
                  {
                    translateY: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, this.getTranslateY()]
                    })
                  },
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 3],
                    })
                  },
                ]
              }
            ]}
          >
            <View style={{
              backgroundColor,
              width: fullWidth / 3,
              height: fullWidth / 3,
            }} />
            </Animated.View>
          </TouchableOpacity>
      </View>
    )
  }
}

type Props = {};
export default class App extends Component<Props> {
  state = {
    view: 'grid',
    carouselAnimation: new Animated.Value(0),
  }

  renderButton = () => {
    return null;
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
    console.log(this.state.carouselAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 3],
    }));
    return (
      <View style={styles.container}>
        <Square
          left={0}
          top={0}
          backgroundColor='rgba(0, 0, 0, .5)'
          animatedValue={this.state.carouselAnimation}
        />
        <Square
          left={1}
          top={0}
          backgroundColor='rgba(255, 0, 0, .5)'
          animatedValue={this.state.carouselAnimation}
        />
        <Square
          left={2}
          top={0}
          backgroundColor='rgba(0, 255, 0, .5)'
          animatedValue={this.state.carouselAnimation}
        />

        <Square
          left={0}
          top={1}
          backgroundColor='rgba(0, 0, 255, .5)'
          animatedValue={this.state.carouselAnimation}
        />
        <Square
          left={1}
          top={1}
          backgroundColor='rgba(255, 255, 0, .5)'
          animatedValue={this.state.carouselAnimation}
        />
        <Square
          left={2}
          top={1}
          backgroundColor='rgba(255, 0, 255, .5)'
          animatedValue={this.state.carouselAnimation}
        />

        <Square
          left={0}
          top={2}
          backgroundColor='rgba(0, 255, 255, .5)'
          animatedValue={this.state.carouselAnimation}
        />
        <Square
          left={1}
          top={2}
          backgroundColor='rgba(104, 255, 104, .5)'
          animatedValue={this.state.carouselAnimation}
        />
        <Square
          left={2}
          top={2}
          backgroundColor='rgba(200, 100, 200, .5)'
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
