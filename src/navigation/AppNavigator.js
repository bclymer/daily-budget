import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import BudgetHome from '../components/budget/BudgetHome';
import Login from '../components/login/Login';
import SplashScreen from '../components/splash/SplashScreen';

const AppRouteConfigs = {
  BudgetHome: { screen: BudgetHome },
  Login: { screen: Login },
  SplashScreen: { screen: SplashScreen },
};

export const AppNavigator = StackNavigator(AppRouteConfigs);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
