import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Main from '../components/Main';
import * as MortgageActions from '../actions/mortgageActions';
import {calculatePayments} from '../helpers/mortgage';
import '../styles/App.scss';

class App extends Component {
  render() {
    const { mortgage, overpayments, dispatch } = this.props;
    const actions = bindActionCreators(MortgageActions, dispatch);
    return (
      <div>
        <Header title={"Mortgage Overpayment Calculator"} />
        <Main 
          {...mortgage}
          overpayments={overpayments}
          {...calculatePayments({...mortgage, overpayments})}
          actions={actions} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps)(App);