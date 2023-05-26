import AskModal from './AskModal';

const LogoutModal = ({ visible, title, description, onConfirm, onCancel }) => {
  return (
    <AskModal
      visible={visible}
      title={title}
      description={description}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default LogoutModal;
