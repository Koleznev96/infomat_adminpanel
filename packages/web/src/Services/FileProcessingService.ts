import {container, inject, singleton} from 'tsyringe';
import _ from 'lodash';

import AbstractFileProcessingService from '@infomat/core/src/Services/AbstractFileProcessingService';
import DIToken from '@infomat/core/src/BusinessLogic/DIToken';
import AbstractUiContainer from '@infomat/core/src/Services/AbstractUiContainer';
import type ILogService from '@infomat/core/src/Services/ILogService';

interface ILocalFile {
	uri: string;
	type: string;
	name: string;
}

@singleton()
class FileProcessingService extends AbstractFileProcessingService {
	constructor(
		@inject(DIToken.LogService) protected logService: ILogService,
		@inject(DIToken.UiContainer) protected uiContainer: AbstractUiContainer,
	) {
		super();
	}

	// private heicImageConvertWorkerInstance: Worker | undefined = undefined;

	isImageConversionRequired(file: File | ILocalFile): boolean {
		return _.includes(['image/heic', 'image/heif'], file.type);
	}

	async getFileSize(file: File | ILocalFile): Promise<number | undefined> {
		return new Promise<number | undefined>((resolve, reject) => {
			if ((file as File).size) {
				resolve((file as File).size);
			} else {
				reject();
			}
		});
	}

	// async createFilePath(file: File, setFilePath: (url: string) => void): Promise<void> {
	// 	return new Promise<void>((resolve, reject) => {
	// 		if (this.isImageConversionRequired(file)) {
	// 			if (_.isUndefined(this.heicImageConvertWorkerInstance)) {
	// 				this.heicImageConvertWorkerInstance = new HeicImageConvertWorker() as Worker;
	// 				this.heicImageConvertWorkerInstance.onerror = (e: ErrorEvent) => {
	// 					this.logService.error(
	// 						{...e.error, text: `Error during conversion of HEIC image: ${e.error}`},
	// 						{service: 'FileProcessingService'},
	// 					);
	// 					reject();
	// 				};
	// 			}

	// 			this.heicImageConvertWorkerInstance.onmessage = ({data}: MessageEvent) => {
	// 				resolve(setFilePath(data.url));
	// 			};
	// 			this.heicImageConvertWorkerInstance.postMessage({file});
	// 		} else {
	// 			resolve(setFilePath(this.uiContainer.createObjectURL(file)));
	// 		}
	// 	});
	// }
}

container.register<AbstractFileProcessingService>(DIToken.FileProcessingService, {useToken: FileProcessingService});

export default FileProcessingService;
