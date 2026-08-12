import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import Button from "../../../app/shared-components/button/Button";
import CrudList from "../../../app/shared-components/crud/list/CrudList";
import NoDataMessage from "../../../app/shared-components/no-data/NoData";
import PanelFilter from "../../../app/shared-components/panel-filter/PanelFilter";
import PanelHeader from "../../../app/shared-components/panel-header/PanelHeader";
import SelectInput from "../../../app/shared-components/select-input/SelectInput";
import Status from "../../../app/shared-components/status/Status";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ProjectStatus, ProjectPriority } from "./enum/ProjectEnum";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingWrapper from "../../../app/shared-components/loading/LoadingWrapper";

export default function Project() {
  const {
    title,
    resources,
    handleChangePage,
    pagination,
    handlePerPageChange,
    handleFilterChange,
    handleReset,
    handleOrderChange,
    order,
    sort,
    breadcrumbs,
    rowsPerPageOptions,
    isLoading,
  } = CrudList<any>({
    resourceName: "projects",
  });

  const schema = yup.object().shape({
    status: yup.string(),
    priority: yup.string(),
    search: yup.string(),
  });

  const defaultValues = {
    status: "",
    priority: "",
    search: "",
  };

  const { control, reset, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const columns = [
    {
      id: "project_name",
      label: "PROJECT NAME",
      sortable: true,
    },
    {
      id: "client_name",
      label: "CLIENT NAME",
      sortable: true,
    },
    {
      id: "status",
      label: "STATUS",
      sortable: true,
    },
    {
      id: "priority",
      label: "PRIORITY",
      sortable: true,
    },
    {
      id: "start_date",
      label: "START DATE",
      sortable: true,
    },
    {
      id: "due_date",
      label: "DUE DATE",
      sortable: true,
    },
  ];

  const statusOptions = Object.values(ProjectStatus).map((value) => ({
    label: value,
    value: value,
  }));
  const priorityOptions = Object.values(ProjectPriority).map((value) => ({
    label: value,
    value: value,
  }));

  return (
    <PanelHeader
      breadcrumbs={breadcrumbs}
      title={title}
      headerContent={
        <Link to="/projects/create" style={{ textDecoration: "none" }}>
          <Button label="Create Project" color="primary" type="button" />
        </Link>
      }
    >
      <div className="w-full p-8">
        <div className="mb-8">
          <PanelFilter
            onSearch={() => {
              handleSubmit(handleFilterChange)();
            }}
            control={control}
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <SelectInput
                  value={field.value}
                  id="status"
                  name="status"
                  placeholder="Status"
                  options={statusOptions}
                  className="w-[200px]"
                  optionLabel="label"
                  optionValue="value"
                  onChange={(value) => {
                    field.onChange(value);

                    handleSubmit((res: { [key: string]: any }) => {
                      handleFilterChange({
                        ...res,
                        status: value,
                      });
                    })();
                  }}
                />
              )}
            />
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <SelectInput
                  value={field.value}
                  id="priority"
                  name="priority"
                  placeholder="Priority"
                  options={priorityOptions}
                  className="w-[200px]"
                  optionLabel="label"
                  optionValue="value"
                  onChange={(value) => {
                    field.onChange(value);

                    handleSubmit((res: { [key: string]: any }) => {
                      handleFilterChange({
                        ...res,
                        priority: value,
                      });
                    })();
                  }}
                />
              )}
            />

            <Button
              label="Reset"
              variant="text"
              color="primary"
              onClick={() => {
                handleReset();
                reset(defaultValues);
              }}
            />
          </PanelFilter>
        </div>
        <LoadingWrapper isLoading={isLoading}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      sortDirection={sort === column.id ? order : false}
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {column.sortable ? (
                        <TableSortLabel
                          active={sort === column.id}
                          direction={sort === column.id ? order : "asc"}
                          onClick={() => {
                            handleOrderChange(
                              column.id,
                              order === "asc" ? "desc" : "asc",
                            );
                          }}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {resources.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <NoDataMessage />
                    </TableCell>
                  </TableRow>
                ) : (
                  resources.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Link
                          to={`/projects/${row.id}`}
                          className="text-blue-600 no-underline hover:text-blue-700 hover:underline"
                        >
                          {row?.project_name}
                        </Link>
                      </TableCell>
                      <TableCell>{row?.client_name}</TableCell>
                      <TableCell>
                        <Status label={row?.status.toUpperCase()} />
                      </TableCell>
                      <TableCell>{row?.priority}</TableCell>
                      <TableCell>{row?.start_date}</TableCell>
                      <TableCell>{row?.due_date}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={pagination.total}
              rowsPerPage={pagination.per_page}
              page={pagination.current_page - 1}
              onPageChange={handleChangePage}
              rowsPerPageOptions={rowsPerPageOptions}
              onRowsPerPageChange={handlePerPageChange}
            />
          </TableContainer>
        </LoadingWrapper>
      </div>
    </PanelHeader>
  );
}
