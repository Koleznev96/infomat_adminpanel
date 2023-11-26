import React, {useEffect, useRef} from 'react';

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

	useEffect(() => {
		if (!isTranscoded || !src) {
			return;
		}
	}, [src, autoPlay, isTranscoded]);

	return src ? (
		<video ref={videoRef} src={src} autoPlay={autoPlay} controls={controls} muted={muted} width="100%" {...restProps} />
	) : null;
};

export default VideoPlayer;
