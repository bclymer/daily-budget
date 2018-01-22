import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TransactionListItem from './TransactionListItem';

class TransactionList extends Component {
  componentWillMount() {
    this.props.fetchTransactions();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      createEmployee: this.props.createEmployee,
    });
  }

  static renderRow(transaction) {
    return <TransactionListItem transaction={transaction} />;
  }

  render() {
    return (
      <View>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={TransactionList.renderRow}
        />
      </View>
    );
  }
}

TransactionList.propTypes = {
  navigation: PropTypes.object.isRequired,
  createEmployee: PropTypes.func.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.array,
};

TransactionList.defaultProps = {
  transactions: [],
};

const mapStateToProps = (state) => {
  const transactions = _.map(state.transactions, (val, uid) => {
    return { ...val, uid };
  });
  return {
    transactions,
  };
};

export default connect(mapStateToProps, { fetchTransactions })(TransactionList);
