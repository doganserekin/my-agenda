import { createSelector } from 'reselect';

const domain = state => state;

export const selectNavigation = () => createSelector(
    domain,
    substate => substate.nav,
);

export const selectData = () => createSelector(
    domain,
    substate => substate.reducers.get('data'),
);

export const selectStatus = () => createSelector(
    domain,
    substate => substate.reducers.get('status'),
);

export const selectLoader = () => createSelector(
    domain,
    substate => substate.reducers.get('loader'),
);

export const selectSelectedItem = () => createSelector(
    domain,
    substate => substate.reducers.get('selectedItem'),
);
