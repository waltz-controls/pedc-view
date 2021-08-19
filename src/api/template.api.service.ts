import ListApiService, {ListApiServiceType} from "api/list.api.service";

export default class TemplateApiService extends ListApiService {
  readonly STORAGE_PATH: string = ListApiServiceType.TEMPLATE;
}
