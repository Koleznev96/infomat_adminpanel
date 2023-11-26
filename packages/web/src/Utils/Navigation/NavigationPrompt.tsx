import React, {useCallback} from 'react';
import {unstable_useBlocker as useBlocker} from 'react-router-dom';
import {BlockerFunction} from '@remix-run/router';

import EnumChatPageTestIds from '@infomat/uikit/src/TestIds/EnumChatPageTestIds';
import DialogWindow, {DialogAlign} from '@infomat/uikit/src/Dialog/DialogWindow/DialogWindow';

import {Routes} from 'src/Routes/Routes';

type TNavigationPromptProps = {
	isNavigationBlocked: boolean;
	title: string;
	body: string;
	closeButton: string;
	agreeButton: string;
	align?: DialogAlign;
	isModalsNavigationDisallowed?: boolean;
	onContinueNavigation?: () => void;
};

const NavigationPrompt = ({
	isNavigationBlocked,
	align,
	title,
	body,
	closeButton,
	agreeButton,
	isModalsNavigationDisallowed,
	onContinueNavigation,
}: TNavigationPromptProps) => {
	const blocker = useBlocker(
		useCallback<BlockerFunction>(
			({currentLocation, nextLocation}) => {
				return (
					isNavigationBlocked &&
					!nextLocation.state?.bypassNavigationPrompt &&
					(isModalsNavigationDisallowed ||
						(!Routes.isModal(nextLocation.pathname) && !Routes.isModal(currentLocation.pathname)))
				);
			},
			[isNavigationBlocked, isModalsNavigationDisallowed],
		),
	);

	if (blocker.state === 'blocked') {
		const onClose = () => {
			blocker.reset?.();
		};

		return (
			<DialogWindow
				isOpen={true}
				onBtn1Click={() => {
					onContinueNavigation && onContinueNavigation();
					blocker.proceed?.();
				}}
				onBtn0Click={onClose}
				onClose={onClose}
				title={title}
				body={body}
				btn0Text={closeButton}
				btn1Text={agreeButton}
				dataTestId={EnumChatPageTestIds.SAVING_CHANGES_MODAL}
				btn0DataTestId={EnumChatPageTestIds.SAVING_CHANGES_MODAL_CANCEL_BTN}
				btn1DataTestId={EnumChatPageTestIds.SAVING_CHANGES_MODAL_LEAVE_BTN}
				align={align}
			/>
		);
	}

	return null;
};

export default NavigationPrompt;
