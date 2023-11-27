import React, {useCallback, useState} from 'react';
import {Grid} from '@mui/material';
import _ from 'lodash';

import {TFile, TVideo} from '@infomat/core/src/Types/media';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ButtonWithTooltip from '@infomat/uikit/src/Button/ButtonWithTooltip';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import {TInformationVM} from '@infomat/core/src/Redux/Information/type';
import FileFiledWithPreview from '@infomat/uikit/src/Fields/FileFiledWithPreview/FileFiledWithPreview';

import style from './GeneralInformation.module.scss';
import {checkUrlsNull} from 'src/Utils/checkFile';

const GeneralInformation = ({onSubmit, data}: TGeneralInformationProps) => {
	const [yandex, setYandex] = useState(data?.yandexMetricCode || '');
	const [labelRu, setLabelRu] = useState(data?.title || '');
	const [labelEng, setLabelEng] = useState(data?.titleEn || '');
	const [videos, setVideos] = useState<TVideo[]>(data?.videos || []);
	const [videoIdsForRemoving, setVideoIdsForRemoving] = useState<number[]>([]);

	const isDisabledSave = !labelRu.length || checkUrlsNull(videos);

	const onSave = useCallback(() => {
		onSubmit({
			yandexMetricCode: yandex,
			title: labelRu,
			titleEn: labelEng,
			videos: videos,
			videoIdsForRemoving: videoIdsForRemoving,
		});
	}, [yandex, labelRu, labelEng, videos, videoIdsForRemoving, onSubmit]);

	const onAttach = useCallback(
		(index: number, file: File | null) => {
			const id = videos[index]?.id;
			if (file === null && !_.isUndefined(id)) {
				const videoIdsForRemovingNew = [...videoIdsForRemoving];
				videoIdsForRemovingNew.push(id);
				setVideoIdsForRemoving(videoIdsForRemovingNew);
			}
			const videosNew = [...videos];
			if (_.isUndefined(videosNew[index])) {
				do {
					videosNew.push({url: null});
				} while (_.isUndefined(videosNew[index]));
			}
			videosNew[index] = {url: file};
			setVideos(videosNew);
		},
		[setVideos, videos, videoIdsForRemoving, setVideoIdsForRemoving],
	);

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<TextField
					label={'Код счетчика Яндекс.Метрики'}
					variant="outlined"
					multiline
					tabIndex={1}
					onChange={(e) => setYandex(e.target.value)}
					value={yandex}
					rows={8}
					placeholder="<!-- Yandex.Metrika counter -->"
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label={'Заголовок на русском языке*'}
					variant="outlined"
					tabIndex={2}
					onChange={(e) => setLabelRu(e.target.value)}
					value={labelRu}
					placeholder="Заголовок"
					className={style.marginBottom}
				/>
				<TextField
					label={'Заголовок на английском языке'}
					variant="outlined"
					tabIndex={3}
					onChange={(e) => setLabelEng(e.target.value)}
					value={labelEng}
					placeholder="Title"
				/>
			</Grid>
			<Grid item container xs={12} md={12}>
				<FileFiledWithPreview
					totalFiles={7}
					isVideoAllowed
					onAttach={onAttach}
					files={videos}
					label="Видео на главном экране*"
				/>
			</Grid>
			<Grid item>
				<ButtonWithTooltip onClick={onSave} disabled={isDisabledSave} tabIndex={4}>
					Сохранить
				</ButtonWithTooltip>
			</Grid>
		</Grid>
	);
};

type TGeneralInformationProps = {
	data?: TInformationVM;
	onSubmit: PropertyHandler<TInformationVM & {videoIdsForRemoving?: number[]}>;
	error?: string;
};

export default GeneralInformation;
