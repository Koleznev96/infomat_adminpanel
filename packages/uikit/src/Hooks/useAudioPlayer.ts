import {useState, useEffect, useCallback} from 'react';

import useSinglePlayingMedia from '@infomat/core/src/Hooks/useSinglePlayingMedia';
import {useBooleanState} from '@infomat/core/src/Hooks/useBooleanState';

const useAudioPlayer = (ref: HTMLAudioElement | null, isNetworkAvailable = true) => {
	const [error, setError] = useState();
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [isPlaying, play, stop] = useBooleanState(false);
	const [isLoading, startLoading, finishLoading] = useBooleanState(false);
	const {onStartPlaying, onStopPlaying} = useSinglePlayingMedia();

	const audio = ref;

	const setTimestamp = useCallback(
		(timestamp: number) => {
			if (audio !== null && isFinite(timestamp)) {
				audio.currentTime = timestamp;
			}
		},
		[audio],
	);

	const onEnded = useCallback(() => {
		setTimestamp(0);
		onStopPlaying(stop);
		stop();
	}, [setTimestamp, stop, onStopPlaying]);

	useEffect(() => {
		if (audio === null) {
			return;
		}

		if (isPlaying) {
			onStartPlaying(stop);
			audio.play().then(
				() => {
					setError(undefined);
				},
				(error) => {
					finishLoading();
					stop();
					setError(error);
				},
			);
		} else {
			onStopPlaying(stop);
			audio.pause();
		}

		const setAudioData = () => {
			setDuration(audio.duration);
			setCurrentTime(audio.currentTime);
		};
		const setAudioTime = () => setCurrentTime(audio.currentTime);

		audio.addEventListener('loadedmetadata', setAudioData);
		audio.addEventListener('loadeddata', setAudioData);
		audio.addEventListener('loadstart', startLoading);
		audio.addEventListener('canplaythrough', finishLoading);
		audio.addEventListener('timeupdate', setAudioTime);
		audio.addEventListener('ended', onEnded);

		return () => {
			audio.removeEventListener('loadedmetadata', setAudioData);
			audio.removeEventListener('loadeddata', setAudioData);
			audio.removeEventListener('timeupdate', setAudioTime);
			audio.removeEventListener('loadstart', startLoading);
			audio.removeEventListener('canplaythrough', finishLoading);
			audio.removeEventListener('ended', onEnded);
		};
	}, [onEnded, audio, isPlaying, onStopPlaying, onStartPlaying, startLoading, finishLoading, stop]);

	return {
		currentTime,
		duration,
		isPlaying,
		play,
		stop,
		setTimestamp,
		isLoading,
		isDisabled: !(isNetworkAvailable || duration),
		error,
	};
};

export default useAudioPlayer;
