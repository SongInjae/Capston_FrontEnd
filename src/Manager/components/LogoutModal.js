import AskModal from './AskModal';

const LogoutModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <AskModal
      visible={visible}
      title="바보"
      description="포스트를 정말 삭제하시겠습니까?"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default LogoutModal;
