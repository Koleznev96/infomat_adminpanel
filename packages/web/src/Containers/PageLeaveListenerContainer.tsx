import React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {selectIsWebRtcOutputStreamActive} from '@infomat/core/src/Redux/Stream/Selectors/selectIsWebRtcOutputStreamActive';
import ClientActionCreator from '@infomat/core/src/Actions/Client/ActionCreator';
import selectRootState from '@infomat/core/src/Redux/selectRootState';
import isClientLogoutModalActive from '@infomat/core/src/Redux/Client/Selectors/ClientLogoutModalActiveSelector';
import {createSelector} from '@infomat/core/src/Utils/Redux';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {streamClientOnlyActions} from '@infomat/core/src/Redux/Stream/Actions/streamClientOnlyActions';

import PageLeaveHandler from 'src/Components/PageLeave/PageLeaveHandler';

const PageLeaveListenerContainer = (props: IListenerContainerProps) => <PageLeaveHandler {...props} />;

export interface IListenerContainerProps {
	isWebRtcOutputStreamActive: boolean;
	open: boolean;
	showStopStreamWarning: PropertyHandler;
	sendStopStream: PropertyHandler;
}

const mapStateToProps = createSelector([selectRootState], (rootState) => ({
	isWebRtcOutputStreamActive: selectIsWebRtcOutputStreamActive(rootState),
	open: isClientLogoutModalActive(rootState),
}));

const mapDispatchToProps = (dispatch: Dispatch) => ({
	showStopStreamWarning: () => dispatch(ClientActionCreator.showStopStreamWarning()),
	sendStopStream: () => dispatch(streamClientOnlyActions.goOffline()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageLeaveListenerContainer);
