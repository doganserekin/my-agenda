import React, { Component } from 'react';
import { BackHandler, AppState, LogBox } from 'react-native';
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MainNavigator from './App';
import { selectNavigation } from './store/selectors';


export const middleWare = createReactNavigationReduxMiddleware(
    state => state.nav,
)

const AppNavigator = createReduxContainer(MainNavigator);

class AppWithNavigationState extends Component
{
    state = {
        curTime: new Date(),
        appState: AppState.currentState,
    }

    componentDidMount() {
        LogBox.ignoreAllLogs()
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }


    onBackPress = () => {
        const { navigation, dispatch } = this.props;

        if (navigation.index === 0) {
            return false;
        }

        dispatch(NavigationActions.back());
        return true;
    }

    render() {
        const { navigation, dispatch } = this.props;
        return (
            <AppNavigator
                state={navigation}
                dispatch={dispatch}
            />
        )
    }
}

const mapStateToProps = createStructuredSelector({
    navigation: selectNavigation(),
});

export default connect(mapStateToProps)(AppWithNavigationState);
