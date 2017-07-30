import { mongoose } from './../dbConfig/db';
import { IPackageModel } from './interfacePackageModel';
import * as Schema from './schema';
export let Packages = mongoose.model<IPackageModel>("Package", Schema.packageSchema);

