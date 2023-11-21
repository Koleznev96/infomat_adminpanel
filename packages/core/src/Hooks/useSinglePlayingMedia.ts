import {Audio, Video} from 'expo-av';
import {isFunction} from 'lodash';

type StopHandlerType = () => void;

type CurrentMediaType = Audio.Sound | Video | StopHandlerType | null;

interface IUseSinglePlayerHandler {
	(handler: CurrentMediaType): void;
}

interface IUseSinglePlayingMedia {
	(): {
		onStartPlaying: IUseSinglePlayerHandler;
		onStopPlaying: IUseSinglePlayerHandler;
		stopCurrent: () => void;
	};
}

let currentMedia: CurrentMediaType = null;

const stopCurrent = () => {
	if (isFunction(currentMedia)) {
		currentMedia();
	} else {
		currentMedia?.pauseAsync();
	}
};

const onStartPlaying: IUseSinglePlayerHandler = (media) => {
	if (media !== currentMedia) {
		stopCurrent();
		currentMedia = media;
	}
};

const onStopPlaying: IUseSinglePlayerHandler = (media) => {
	if (media === currentMedia) {
		currentMedia = null;
	}
};

const useSinglePlayingMedia: IUseSinglePlayingMedia = () => ({onStartPlaying, onStopPlaying, stopCurrent});

export default useSinglePlayingMedia;
