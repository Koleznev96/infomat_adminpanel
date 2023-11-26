/**
 * @NOTE: please, import all files, containing DI-registrations, to this file
 */

import 'src/Services/EnvService';
import '@infomat/core/src/DiInit'; // it needs to be after EnvService

import 'src/Redux/store';
import 'src/Services/SelectorCreator';
import 'src/Services/StoreService';
import 'src/Services/FileProcessingService';
