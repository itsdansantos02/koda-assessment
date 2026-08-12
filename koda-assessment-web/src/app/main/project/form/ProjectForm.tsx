import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../../app/shared-components/button/Button";
import CrudForm from "../../../../app/shared-components/crud/form/CrudForm";
import PanelHeader from "../../../../app/shared-components/panel-header/PanelHeader";
import Panel from "../../../../app/shared-components/panel/Panel";
import TextArea from "../../../../app/shared-components/text-area/TextArea";
import SelectInput from "../../../../app/shared-components/select-input/SelectInput";
import DatePicker from "../../../../app/shared-components/date-picker/DatePicker";
import TextInput from "../../../../app/shared-components/text-input/TextInput";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import LoadingWrapper from "../../../../app/shared-components/loading/LoadingWrapper";
import { ProjectStatus, ProjectPriority } from "../enum/ProjectEnum";

const defaultValues = {
  project_name: "",
  client_name: "",
  description: "",
  status: "",
  priority: "",
  start_date: "",
  due_date: "",
};

export default function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, onSubmit, title, breadcrumbs, resource, onBack } =
    CrudForm<any>({
      resourceName: "projects",
      onComplete: (data: any) => {
        navigate(`/projects/${data.data.id}`);
      },
    });

  const schema = yup.object().shape({
    project_name: yup.string().required("Project name is required"),

    client_name: yup.string().required("Client name is required"),

    description: yup.string().nullable(),

    priority: yup.string().required("Priority is required"),

    status: yup.string().required("Status is required"),

    start_date: yup.string().required("Start date is required"),

    due_date: yup
      .string()
      .required("Due date is required")
      .test(
        "due-date-after-start-date",
        "Due date cannot be earlier than the start date",
        function (dueDate) {
          const { start_date } = this.parent;

          if (!start_date || !dueDate) {
            return true;
          }

          return new Date(dueDate) >= new Date(start_date);
        },
      ),
  });
  const projectStatusOptions = Object.values(ProjectStatus).map((value) => ({
    label: value,
    value: value,
  }));
  const projectpriorityOptions = Object.values(ProjectPriority).map(
    (value) => ({
      label: value,
      value: value,
    }),
  );

  const { control, setValue, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const initForm = () => {
    if (!resource) return;
    setValue("project_name", resource?.project_name);
    setValue("client_name", resource?.client_name);
    setValue("description", resource?.description);
    setValue("priority", resource?.priority);
    setValue("status", resource?.status);
    setValue("start_date", resource?.start_date);
    setValue("due_date", resource?.due_date);
  };

  useEffect(() => {
    if (resource) {
      initForm();
    }
  }, [resource]);

  return (
    <PanelHeader title={title} breadcrumbs={breadcrumbs}>
      <LoadingWrapper isLoading={isLoading}>
        <div className="w-full p-8 flex flex-col gap-20">
          <form
            onSubmit={handleSubmit((values: { [key: string]: any }) => {
              const newValues = {
                ...values,
              };
              onSubmit(newValues);
            })}
            className="w-full flex flex-col"
          >
            <Panel title="Project Form" className="w-full">
              <div className="p-5">
                <div className="w-1/2 flex flex-row justify-between gap-10">
                  <div className="flex-1 flex flex-col gap-5">
                    <Controller
                      name="project_name"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextInput
                          value={field.value}
                          onChange={field.onChange}
                          label="Project Name"
                          errorMessage={fieldState.error?.message}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="client_name"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextInput
                          value={field.value}
                          onChange={field.onChange}
                          label="Client Name"
                          errorMessage={fieldState.error?.message}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <SelectInput
                          id="status"
                          {...field}
                          placeholder="Status"
                          label="Status"
                          options={projectStatusOptions}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="priority"
                      control={control}
                      render={({ field }) => (
                        <SelectInput
                          id="status"
                          {...field}
                          placeholder="Priority"
                          label="Priority"
                          options={projectpriorityOptions}
                          onChange={field.onChange}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="description"
                      control={control}
                      render={({ field, fieldState }) => (
                        <div>
                          <TextArea
                            {...field}
                            label="Description (Optional)"
                            placeholder=""
                            errorMessage={fieldState.error?.message}
                            rows={4}
                          />
                        </div>
                      )}
                    />
                    <Controller
                      name="start_date"
                      control={control}
                      render={({ field, fieldState }) => (
                        <DatePicker
                          label="Start Date"
                          value={field.value}
                          onChange={field.onChange}
                          errorMessage={fieldState.error?.message}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="due_date"
                      control={control}
                      render={({ field, fieldState }) => (
                        <DatePicker
                          label="Due Date"
                          value={field.value}
                          onChange={field.onChange}
                          errorMessage={fieldState.error?.message}
                          required
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </Panel>
            <div className="flex ml-auto space-x-10 w-fit mt-24">
              <Button
                type="button"
                variant="contained"
                className="w-full"
                label="Cancel"
                onClick={() => onBack()}
              />

              {resource ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full"
                  label="Update"
                />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full"
                  label="Submit"
                />
              )}
            </div>
          </form>
        </div>
      </LoadingWrapper>
    </PanelHeader>
  );
}
