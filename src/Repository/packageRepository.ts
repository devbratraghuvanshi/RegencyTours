import { model } from 'mongoose';
import { IPackageModel } from './interfacePackageModel';
import * as Schema from './schema';
export let Packages = model<IPackageModel>("Package", Schema.packageSchema);

