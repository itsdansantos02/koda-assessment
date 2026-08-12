import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSnackbar } from "notistack";

import { OneResponse } from "../../../model/Response";
import { ApiRequest } from "../../../service/Api.service";
import { snakeToTitle } from "../../../utils/TitleConversion";

interface CrudDetailProps {
  resourceName: string;
  resourceId?: string;
  pageTitle?: string | null;
  initialLoad?: boolean;
  params?: Record<string, any>;
}

const CrudDetail = <T,>({
  resourceName,
  resourceId,
  pageTitle,
  initialLoad = true,
  params,
}: CrudDetailProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [resource, setResource] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  // Get ID from props or route params
  const routeParams = useParams();
  const id = resourceId || routeParams.id;

  const resourceTitle = snakeToTitle(resourceName);

  const title =
    pageTitle ?? `${resourceTitle} Detail`;

  const url = `/${resourceName}`;

  const breadcrumbs = [
    {
      name: resourceTitle,
      path: url,
    },
    {
      name: title,
      path: `${url}/${id}`,
    },
  ];

  const getResource = () => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    ApiRequest({
      url: `${url}/${id}`,
      method: "GET",
      params: {
        ...params,
      },
    })
      .then((res: OneResponse<T>) => {
        setResource(res.data);
      })
      .catch((err) => {
        enqueueSnackbar(
          err.message ?? "Something went wrong",
          {
            variant: "error",
          }
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!initialLoad || !id) {
      return;
    }

    getResource();
  }, [id, initialLoad]);

  return {
    title,
    breadcrumbs,
    resource,
    isLoading,
    getResource,
    url,
    id,
  };
};

export default CrudDetail;