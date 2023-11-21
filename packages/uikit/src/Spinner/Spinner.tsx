import classNames from 'classnames';
import React, {useRef, useEffect, useCallback, useState} from 'react';

import style from './Spinner.module.scss';

const pause = 500;
const duration = 1400;

const Spinner = ({isGlobal, ...restProps}: TSpinnerProps) => {
	const [startTime] = useState(new Date().getTime() - duration - pause);
	const polyRef = useRef<SVGPolylineElement>(null);
	const frameRef = useRef(0);

	const update = useCallback(() => {
		const offset = new Date().getTime() - startTime;
		const pos = (offset % (2 * duration + pause)) - duration - pause;
		const minVal = pos < -1400 ? 1400 : -pos;
		const val = pos > 0 ? pos : minVal;
		const el = polyRef.current;

		if (el) {
			el.style.strokeDashoffset = String(val);
		}

		frameRef.current = window.requestAnimationFrame(update);
	}, [startTime]);

	useEffect(() => {
		frameRef.current = window.requestAnimationFrame(update);

		return () => window.cancelAnimationFrame(frameRef.current);
	}, [update]);

	const cls1 = {
		fill: 'url(#Verlauf_1)',
	};
	const cls2 = {
		fill: 'url(#Verlauf_2)',
	};

	return (
		<div className={classNames({[style.spinner]: true, [style.global]: isGlobal})} {...restProps}>
			<svg
				id="vxlogo-spinner"
				data-name="vxlogo-spinner"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 341.07 246.61"
			>
				<defs>
					<linearGradient id="Verlauf_1" x1="230.4" y1="161.51" x2="293.05" y2="210.73" gradientUnits="userSpaceOnUse">
						<stop offset="0" stopColor="#9e3026" />
						<stop offset="0.02" stopColor="#a93329" />
						<stop offset="0.09" stopColor="#c43b2f" />
						<stop offset="0.17" stopColor="#da4234" />
						<stop offset="0.27" stopColor="#eb4737" />
						<stop offset="0.38" stopColor="#f64a3a" />
						<stop offset="0.55" stopColor="#fd4c3c" />
						<stop offset="1" stopColor="#ff4d3c" />
					</linearGradient>
					<linearGradient id="Verlauf_2" x1="203.76" y1="47.71" x2="150.49" y2="8" gradientUnits="userSpaceOnUse">
						<stop offset="0" stopColor="#9e3026" />
						<stop offset="0.1" stopColor="#bc392d" />
						<stop offset="0.21" stopColor="#d44032" />
						<stop offset="0.33" stopColor="#e74637" />
						<stop offset="0.47" stopColor="#f54a3a" />
						<stop offset="0.65" stopColor="#fd4c3b" />
						<stop offset="1" stopColor="#ff4d3c" />
					</linearGradient>

					<mask id="mask_1">
						<polyline
							fill="none"
							ref={polyRef}
							className={style.cls4}
							points="115.09 39.98 170.09 117.98 243.09 13.98 315.09 13.98 170.09 222.98 26.09 13.98 170.09 12.98 307.09 210.98 235.09 211.98 207.09 171.98"
						/>
					</mask>
				</defs>
				<path
					className={style.cls1}
					style={cls1}
					mask="url(#mask_1)"
					d="M222.74,170.34,243,199.66h40L242.8,141.49l16.34-23.34L334,226.35H229l-22.48-32.52Z"
				/>
				<polygon
					className={style.cls2}
					style={cls2}
					mask="url(#mask_1)"
					points="177.52 0.01 206.83 42.47 190.74 66.15 163.51 26.77 177.52 0.01"
				/>
				<polygon
					className={style.cls3}
					mask="url(#mask_1)"
					points="341.07 0 235.98 0 170.5 94.8 141.95 53.51 109.48 53.51 170.5 141.75 249.99 26.76 290.04 26.76 170.5 199.65 50.99 26.81 163.5 26.76 164.29 27.89 178.41 1.3 177.51 0 0 0.03 170.5 246.61 341.07 0"
				/>
			</svg>
		</div>
	);
};

type TSpinnerProps = {
	isGlobal?: boolean;
};

export default Spinner;
