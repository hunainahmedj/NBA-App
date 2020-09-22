import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {connect} from 'react-redux';
import {autoSignIn} from '../../store/actions/userActions';
import {bindActionCreators} from 'redux';

import Logo from './logo';
import Form from './form';

import {getTokens, setTokens} from '../../utils/misc';

class AuthComponent extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    getTokens(values => {
      if (values[0][1] === null) {
        this.setState({loading: false});
      } else {
        this.props.autoSignIn(values[1][1]).then(() => {
          if (!this.props.User.auth.token) {
            this.setState({loading: false});
          } else {
            setTokens(this.props.User.auth, () => {
              this.goNext();
            });
          }
        });
      }
    });
  }

  goNext = () => {
    this.props.navigation.navigate('App');
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.container}>
          <View>
            <Logo />
            <Form goNext={this.goNext} />
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d428a',
    padding: 50,
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    User: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({autoSignIn}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
