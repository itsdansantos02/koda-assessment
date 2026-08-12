import { ListResponse } from '../../../model/Response';
import { ApiRequest } from '../../../service/Api.service';

const baseUrl = '/projects';

export const ProjectService = {
  fetch: (params?: { [key: string]: any }): Promise<ListResponse<any>> => {
    return ApiRequest({
      url: baseUrl,
      method: 'GET',
      params,
    });
  },

  delete: (id: string) => {
    return ApiRequest({
      url: `${baseUrl}/${id}`,
      method: 'DELETE',
    });
  },
};
