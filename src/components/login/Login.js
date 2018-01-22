import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';
import PropTypes from 'prop-types';

import { emailChanged, passwordChanged, loginUser } from '../../actions/AuthActions';

class Login extends Component {
  static navigationOptions = {
    title: 'Daily Budget',
  };

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  render() {
    return (
      <Container style={{ paddingHorizontal: 10 }}>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="Email"
                autoCapitalize="none"
                spellCheck={false}
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
            </Item>
            <Item last>
              <Input
                placeholder="Password"
                autoCapitalize="none"
                spellCheck={false}
                autoCorrect={false}
                secureTextEntry
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </Item>
          </Form>
          <Button block onPress={this.onButtonPress.bind(this)}>
            <Text>Sign In</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

Login.propTypes = {
  emailChanged: PropTypes.func.isRequired,
  passwordChanged: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

Login.defaultProps = {
  email: '',
  password: '',
  error: '',
  loading: false,
};

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    password: state.login.password,
    error: state.login.error,
    loading: state.login.loading,
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
})(Login);
