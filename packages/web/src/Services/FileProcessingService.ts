import {container, inject, singleton} from 'tsyringe';
import _ from 'lodash';

import AbstractFileProcessingService from '@infomat/core/src/Services/AbstractFileProcessingService';
import DIToken from '@infomat/core/src/BusinessLogic/DIToken';

interface ILocalFile {
	uri: string;
	type: string;
	name: string;
}

@singleton()
class FileProcessingService extends AbstractFileProcessingService {
	constructor() {
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
}

container.register<AbstractFileProcessingService>(DIToken.FileProcessingService, {useToken: FileProcessingService});

export default FileProcessingService;
