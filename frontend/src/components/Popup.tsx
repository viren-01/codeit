import { useState } from 'react';
import '../Popup.css';

const Popup = (props: any) => {
    let { onCancel, onInvite, inviteId } = props
    const [inviteText, setInviteText] = useState<string>('')

    const handleInvite = () => {
        onInvite(inviteText)
    }

    return (
    <div className="popup-overlay">
        <div className="popup">
            <label>{`Your Invite Id is ${inviteId}`}</label>
            <textarea placeholder={"Enter Invite Id"} value={inviteText} onInput={(e: any) => setInviteText(e.target.value)}></textarea>
            <div className="button-container">
                <button onClick={onCancel}>Cancel</button>
                <button onClick={handleInvite}>Invite</button>
            </div>
        </div>
    </div>
  );
};

export default Popup;
