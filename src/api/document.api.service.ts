import ListApiService, {ListApiServiceType} from "api/list.api.service";

export default class DocumentApiService extends ListApiService {
  readonly STORAGE_PATH: string = ListApiServiceType.DOCUMENT;
}
