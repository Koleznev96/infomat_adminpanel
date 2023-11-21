import React, {useCallback, useState} from 'react';
import {Grid} from '@mui/material';
import {type Crop} from 'react-image-crop';
import {map} from 'lodash';

import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import ButtonWithTooltip from '@infomat/uikit/src/Button/ButtonWithTooltip';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import FileFiledWithPreview from '@infomat/uikit/src/Fields/FileFiledWithPreview/FileFiledWithPreview';
import Page from '@infomat/uikit/src/Page/Page';

import style from './GeneralInformation.module.scss';

type filesVideo = (File | string | null)[];

const videosInitial = [null, null, null, null, null, null, null];

const GeneralInformation = ({onSubmit}: TGeneralInformationProps) => {
	const [yandex, setYandex] = useState('');
	const [labelRu, setLabelRu] = useState('');
	const [labelEng, setLabelEng] = useState('');
	const [videos, setVideos] = useState<filesVideo>(videosInitial);

	const isDisabledSave = !yandex.length || !labelRu.length || !labelEng.length;

	const onSave = useCallback(() => {
		onSubmit();
	}, []);

	const onAttach = useCallback(
		(index: number, file: File | null) => {
			const videosNew = [...videos];
			videosNew[index] = file;
			setVideos(videosNew);
		},
		[setVideos, videos],
	);

	return (
		<Page>
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
						label={'Заголовок на русском языке'}
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
					<FileFiledWithPreview isVideoAllowed onAttach={onAttach} files={videos} label="Видео на главном экране" />
				</Grid>
				<Grid item>
					<ButtonWithTooltip onClick={onSave} disabled={isDisabledSave} tabIndex={4}>
						Сохранить
					</ButtonWithTooltip>
				</Grid>
			</Grid>
		</Page>
	);
};

type TGeneralInformationProps = {
	login?: string;
	onSubmit: PropertyHandler;
};

export default GeneralInformation;
