import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Text } from 'native-base';
import firebase from 'firebase';

import { userStateLoaded } from '../../actions/AuthActions';

class SplashScreen extends Component {
  static navigationOptions = {
    title: 'Daily Budget',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.userStateLoaded(user);
    });
  }

  render() {
    return (
      <Container style={{ paddingHorizontal: 10 }}>
        <Text>Loading...</Text>
      </Container>
    );
  }
}

export default connect(null, { userStateLoaded })(SplashScreen);
