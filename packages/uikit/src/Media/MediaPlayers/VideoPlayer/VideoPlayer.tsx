import React, {MutableRefObject, RefObject, useEffect, useRef} from 'react';

import {TVideoProps} from '@infomat/core/src/Types/media';

const VideoPlayer = ({
	src,
	autoPlay = true,
	controls = true,
	muted = false,
	isTranscoded = true,
	...restProps
}: TVideoProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	// const hlsRef = useRef<Hls | null>(null);

	useEffect(() => {
		if (!isTranscoded || !src) {
			return;
		}

		// hlsRef.current = initHlsPlayer(hlsRef, videoRef, src, autoPlay);

		// return () => {
		// 	hlsRef.current?.destroy();
		// };
	}, [src, autoPlay, isTranscoded]);

	return src ? (
		<video ref={videoRef} src={src} autoPlay={autoPlay} controls={controls} muted={muted} width="100%" {...restProps} />
	) : null;
};

// const initHlsPlayer = (
// 	hlsRef: MutableRefObject<Hls | null>,
// 	videoRef: RefObject<HTMLVideoElement>,
// 	src: string,
// 	autoPlay: boolean,
// ) => {
// 	hlsRef.current?.destroy();
// 	hlsRef.current = new Hls();

// 	if (videoRef.current) {
// 		hlsRef.current.attachMedia(videoRef.current);
// 	}

// 	hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, () => {
// 		hlsRef.current?.loadSource(src);
// 		hlsRef.current?.on(Hls.Events.MANIFEST_PARSED, () => {
// 			if (autoPlay) {
// 				videoRef.current?.play().catch(() => {
// 					// https://developer.chrome.com/blog/play-request-was-interrupted/
// 				});
// 			}
// 		});
// 	});

// 	hlsRef.current.on(Hls.Events.ERROR, function (event, data) {
// 		if (data.fatal) {
// 			switch (data.type) {
// 				case Hls.ErrorTypes.NETWORK_ERROR:
// 					hlsRef.current?.startLoad();
// 					break;
// 				case Hls.ErrorTypes.MEDIA_ERROR:
// 					hlsRef.current?.recoverMediaError();
// 					break;
// 				default:
// 					initHlsPlayer(hlsRef, videoRef, src, autoPlay);
// 					break;
// 			}
// 		}
// 	});

// 	return hlsRef.current;
// };

export default VideoPlayer;
