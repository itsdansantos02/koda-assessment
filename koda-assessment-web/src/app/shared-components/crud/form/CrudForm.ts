import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import { OneResponse } from "../../../model/Response";
import { ApiRequest } from "../../../service/Api.service";
import { snakeToTitle } from "../../../utils/TitleConversion";

interface CrudFormProps {
  resourceName: string;
  id?: string;
  pageTitle?: string;
  onComplete?: (res: any) => void;
  onError?: () => void;
  useRouteParams?: boolean;
  isPostUpdate?: boolean;
  noId?: boolean;
}

const CrudForm = <T,>({
  resourceName,
  id,
  pageTitle,
  onComplete,
  onError,
  useRouteParams = true,
  isPostUpdate = false,
  noId = false,
}: CrudFormProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();
  const navigate = useNavigate();

  let resourceId = useRouteParams ? id ?? params.id : id ?? null;

  if (noId) {
    resourceId = null;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [resource, setResource] = useState<T>();

  const resourceTitle = snakeToTitle(resourceName);

  const title =
    pageTitle ??
    (resourceId
      ? `Edit ${resourceTitle}`
      : `Create ${resourceTitle}`);

  const url = `/${resourceName}`;

  const breadcrumbs = [
    {
      name: resourceTitle,
      path: url,
    },
    {
      name: title,
      path: resourceId
        ? `${url}/${resourceId}/edit`
        : `${url}/create`,
    },
  ];

  const onBack = () => {
    navigate(-1);
  };

  const onSubmit = (
    data: Record<string, any>
  ): Promise<any> => {
    setIsLoading(true);

    const isFormData = data instanceof FormData;

    const request = resourceId
      ? ApiRequest({
          url: `${url}/${resourceId}`,
          method: isPostUpdate ? "POST" : "PUT",
          body: data,
          isMultipart: isFormData,
        })
      : ApiRequest({
          url,
          method: "POST",
          body: data,
          isMultipart: isFormData,
        });

    return request
      .then((res: OneResponse<T>) => {
        setResource(res.data);

        enqueueSnackbar(
          (res as any).message ??
            `${resourceId ? "Updated" : "Created"} successfully`,
          {
            variant: "success",
          }
        );

        if (onComplete) {
          onComplete(res);
        } else {
          onBack();
        }

        return res;
      })
      .catch((err) => {
        enqueueSnackbar(
          err.message ?? "Something went wrong",
          {
            variant: "error",
          }
        );

        if (onError) {
          onError();
        }

        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getResource = () => {
    if (!resourceId) return;

    setIsLoading(true);

    ApiRequest({
      url: `${url}/${resourceId}`,
      method: "GET",
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
    if (resourceId) {
      getResource();
    }
  }, [resourceId]);

  return {
    title,
    breadcrumbs,
    onSubmit,
    isLoading,
    resource,
    onBack,
    url,
    setIsLoading,
    getResource,
    resourceId,
  };
};

export default CrudForm;