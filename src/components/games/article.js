import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import {connect} from 'react-redux';
import {autoSignIn} from '../../store/actions/userActions';
import {getTokens, setTokens} from '../../utils/misc';

import Icon from 'react-native-vector-icons/dist/Ionicons';
import Video from 'react-native-video';

class GameArticleComponent extends Component {
  state = {
    loading: false,
    isAuth: true,
  };

  manageState(loading, isAuth) {
    this.setState({
      loading,
      isAuth,
    });
  }

  componentDidMount() {
    const User = this.props.User;

    getTokens(value => {
      if (value[0][1] === null) {
        this.manageState(false, false);
      } else {
        this.props
          .dispatch(autoSignIn(value[1][1]))
          .then(() => {
            !User.auth.token
              ? this.manageState(false, false)
              : setTokens(User.auth, () => {
                  this.manageState(false, true);
                });
          })
          .catch(e => {
            return e;
          });
      }
    });
  }

  render() {
    const params = this.props.navigation.state.params;

    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <ScrollView style={{backgroundColor: '#F0F0F0'}}>
          {this.state.isAuth ? (
            <Video
              style={{width: '100%', height: 250}}
              source={{uri: params.play}}
              controls={true}
              paused={true}
              muted={true}
            />
          ) : (
            <View style={styles.notAuth}>
              <Icon name="md-sad" size={80} color="#d5d5d5" />
              <Text style={styles.notAuthText}>
                We are really sorry please login / register first
              </Text>
              <View style={styles.notAuthBtn}>
                <Button
                  title="Login / Register"
                  onPress={() => this.props.navigation.navigate('Auth')}
                />
              </View>
            </View>
          )}
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notAuth: {
    flex: 1,
    margin: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notAuthText: {
    fontFamily: 'Roboto-Bold',
  },
  notAuthBtn: {
    marginTop: 10,
  },
});

function mapStateToProps(state) {
  console.log(state);
  return {
    Games: state.Games,
  };
}

export default connect(mapStateToProps)(GameArticleComponent);
