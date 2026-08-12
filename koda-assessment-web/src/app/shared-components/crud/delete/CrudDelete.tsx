import ModalConfirmation from 'app/shared-components/modal-confirmation/ModalConfirmation';
import { useAppDispatch } from 'app/store';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiRequest } from 'src/app/service/Api.service';

interface CrudDeleteProps {
  resourceName: string;
  id?: string;
}

const CrudDelete = ({ resourceName, id }: CrudDeleteProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onBack = () => {
    navigate(-1);
  };

  const onClose = () => {
    dispatch(closeDialog());
  };

  const onConfirm = () => {
    setIsLoading(true);

    ApiRequest({
      url: `/${resourceName}/${id}`,
      method: 'DELETE',
    })
      .then(() => {
        dispatch(showMessage({ message: 'Deleted successfully', variant: 'success' }));
        onClose();
        onBack();
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(showMessage({ message: err.message, variant: 'error' }));
        setIsLoading(false);
      });
  };

  const onDelete = () => {
    dispatch(
      openDialog({
        children: (
          <ModalConfirmation
            onConfirm={onConfirm}
            onCancel={onClose}
            title='Delete'
          >
            Are you sure you want to delete this?
          </ModalConfirmation>
        ),
      })
    );
  };

  return {
    isLoading,
    onBack,
    onDelete,
  };
};

export default CrudDelete;
