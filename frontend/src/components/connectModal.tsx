import '../Popup.css';

const ConnectModal = (props: any) => {
    let { onCancel, onSuccess, inviteId } = props
    
    return (
    <div className="popup-overlay">
        <div className="popup">
            <label>{`${inviteId ?? ''} Sent you a connection request`}</label>
            <div className="button-container">
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onSuccess}>Accept</button>
            </div>
        </div>
    </div>
  );
};

export default ConnectModal;
