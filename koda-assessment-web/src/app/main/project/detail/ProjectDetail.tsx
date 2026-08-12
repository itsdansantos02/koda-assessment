import Button from "../../../../app/shared-components/button/Button";
import CrudDetail from "../../../../app/shared-components/crud/detail/CrudDetail";
import CrudField from "../../../../app/shared-components/crud/field/CrudField";
import PanelHeader from "../../../../app/shared-components/panel-header/PanelHeader";
import Panel from "../../../../app/shared-components/panel/Panel";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import LoadingWrapper from "../../../../app/shared-components/loading/LoadingWrapper";
import { ProjectService } from "../service/ProjectService";
import ModalConfirmation from "../../../../app/shared-components/modal-confirmation/ModalConfirmation";
import { useState } from "react";

function ProjectDetail() {
  // get params id
  const { id } = useParams();
  const { title, resource, isLoading, breadcrumbs, getResource } =
    CrudDetail<any>({
      resourceName: "projects",
    });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteRecord = async () => {
    if (!id) return;

    try {
      await ProjectService.delete(id);

      setShowDeleteModal(false);

      // Go back to project list
      window.location.href = "/projects";
    } catch (error) {
      console.error("Project delete failed:", error);
    }
  };

  return (
    <PanelHeader
      title={title}
      breadcrumbs={breadcrumbs}
      headerContent={
        <div className="flex gap-8">
          <Button
            variant="outlined"
            type="button"
            color="danger"
            label="Delete"
            onClick={() => setShowDeleteModal(true)}
          />
          <Link
            to={`/projects/${resource?.id}/edit`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="outlined"
              type="button"
              color="primary"
              label="Edit"
            />
          </Link>
        </div>
      }
    >
      {showDeleteModal && (
        <ModalConfirmation
          title="Delete Project"
          confirmText="Delete"
          confirmColor="danger"
          onConfirm={deleteRecord}
          onCancel={() => setShowDeleteModal(false)}
        >
          Are you sure you want to delete this project?
        </ModalConfirmation>
      )}
      <LoadingWrapper isLoading={isLoading}>
        <div className="w-full flex flex-col gap-20 p-8">
          <Panel title="Project Details" className="w-full">
            <div className="p-5">
              <div className="flex flex-row gap-10 justify-between w-full">
                <div className="flex-1 flex flex-col gap-2">
                  <CrudField label="Project Name">
                    {resource?.project_name}
                  </CrudField>
                  <CrudField label="Client Name">
                    {resource?.client_name}
                  </CrudField>
                  <CrudField label="Status">{resource?.status}</CrudField>
                  <CrudField label="Priority">{resource?.priority}</CrudField>
                  <CrudField label="Description">
                    {resource?.description}
                  </CrudField>
                  <CrudField label="Start Date">
                    {resource?.start_date}
                  </CrudField>
                  <CrudField label="Due Date">{resource?.due_date}</CrudField>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </LoadingWrapper>
    </PanelHeader>
  );
}

export default ProjectDetail;
