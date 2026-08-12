import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import { IPagination } from "../../../model/Pagination";
import { ListResponse } from "../../../model/Response";
import { ApiRequest } from "../../../service/Api.service";
import { snakeToTitle } from "../../../utils/TitleConversion";

export interface IFilter {
  page: number;
  limit: number;
  order: "asc" | "desc";
  sort: string;
  filter: string | null;
  advFilter: string | null;
  scopes?: string | null;
  with?: string | null;
  student_type?: string | null;
  student_id?: string | null;
  staff_id?: string | null;
  advSearch?: string | null;
}

export const defaultFilter: IFilter = {
  page: 1,
  limit: 10,
  order: "desc",
  sort: "created_at",
  filter: null,
  advFilter: null,
  scopes: null,
  with: null,
};

interface CrudListProps {
  resourceName: string;
  initialFilter?: IFilter;
  pageTitle?: string | null;
  initialLoad?: boolean;
}

const CrudList = <T,>({
  resourceName,
  initialFilter,
  pageTitle,
  initialLoad = true,
}: CrudListProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [sort, setSort] = useState("created_at");

  const rowsPerPageOptions = [10, 20, 50];

  const [limit, setLimit] = useState(rowsPerPageOptions[0]);

  const initial: IFilter = initialFilter ?? {
    ...defaultFilter,
    limit,
    order,
    sort,
  };

  const [resources, setResources] = useState<T[]>([]);

  const [pagination, setPagination] = useState<IPagination>({
    current_page: initial.page,
    last_page: 1,
    per_page: initial.limit,
    total: 0,
    path: "",
  });

  const [isLoading, setIsLoading] = useState(initialLoad);

  const [filter, setFilter] = useState<IFilter>(initial);

  const title = pageTitle ?? snakeToTitle(resourceName);

  const url = `/${resourceName}`;

  const breadcrumbs = [
    {
      name: title,
      path: url,
    },
  ];

  /**
   * Get resources
   */
  const getResources = (params?: Partial<IFilter>) => {
    setIsLoading(true);

    const mergedFilter: IFilter = {
      ...filter,
      ...params,
    };

    // Remove empty/null values before sending request
    const requestParams = Object.fromEntries(
      Object.entries(mergedFilter).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined
      )
    );

    setFilter(mergedFilter);

    ApiRequest({
      url,
      method: "GET",
      params: requestParams,
    })
      .then((res: ListResponse<T>) => {
        setResources(res.data);
        setPagination(res.meta);
      })
      .catch((err) => {
        console.error("API Error:", err);

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

  /**
   * Reset filters
   */
  const handleReset = () => {
    setFilter(initial);

    setOrder(initial.order);
    setSort(initial.sort);
    setLimit(initial.limit);

    getResources(initial);
  };

  /**
   * Sorting
   */
  const handleOrderChange = (
    newSort: string,
    newOrder: "asc" | "desc"
  ) => {
    setSort(newSort);
    setOrder(newOrder);

    getResources({
      sort: newSort,
      order: newOrder,
      page: 1,
    });
  };

  /**
   * Pagination
   */
  const handleChangePage = (
    _: unknown,
    newPage: number
  ) => {
    getResources({
      page: newPage + 1,
    });
  };

  /**
   * Rows per page
   */
  const handlePerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = Number(event.target.value);

    setLimit(newLimit);

    getResources({
      page: 1,
      limit: newLimit,
    });
  };

  /**
   * Filters
   */
  const handleFilterChange = (
    params: Record<string, any>,
    advFilter?: Record<string, any>,
    advSearch: string | null = null
  ) => {
    const cleanedParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) =>
          value !== "" &&
          value !== null &&
          value !== undefined
      )
    );

    getResources({
      page: 1,
      filter:
        Object.keys(cleanedParams).length > 0
          ? JSON.stringify(cleanedParams)
          : null,
      advFilter:
        advFilter && Object.keys(advFilter).length > 0
          ? JSON.stringify(advFilter)
          : null,
      advSearch,
    });
  };

  /**
   * Clear resources
   */
  const clearResources = () => {
    setResources([]);

    setPagination({
      current_page: initial.page,
      last_page: 1,
      per_page: initial.limit,
      total: 0,
      path: "",
    });

    setFilter(initial);
    setIsLoading(false);
  };

  /**
   * Initial load
   */
  useEffect(() => {
    if (!initialLoad) {
      return;
    }

    getResources(initial);
  }, []);

  return {
    title,
    resources,
    breadcrumbs,
    getResources,
    handleChangePage,
    handlePerPageChange,
    pagination,
    isLoading,
    handleFilterChange,
    handleReset,
    defaultFilter: initial,
    handleOrderChange,
    order,
    sort,
    rowsPerPageOptions,
    url,
    clearResources,
  };
};

export default CrudList;