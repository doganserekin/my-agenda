import { NavigationActions } from 'react-navigation';
import * as constants from './constants';

export const navigate = routeName => NavigationActions.navigate({routeName});

export const requestData = () => ({type: constants.REQUEST_DATA});

export const setData = (data) => ({type: constants.SET_DATA, data});

export const setStatus = (status) => ({type: constants.SET_STATUS, status})

export const setLoader = (loader) => ({type: constants.SET_LOADER, loader});

export const setSelectedItem = (selectedItem) => ({type: constants.SET_SELECTED_ITEM, selectedItem});
