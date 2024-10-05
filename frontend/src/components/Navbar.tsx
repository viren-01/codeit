import '../navbar.css';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation()
    const currentPath = location.pathname
    return (
        <div className="navbar">
            <span className='logo'>
                <img className="icon-logo" src="./icons/logo.png" alt="Logo" />
            </span>
            <div className='list'>
                <ul className='icon-list'>
                    <li>
                        <img className={`icon-logo ${currentPath === '/' ? 'active' : ''}`} src="./icons/chat.png" alt="chat-icon" />
                    </li>
                    {/* <li>
                        <img className="icon-logo" src="./icons/chat.png" alt="chat-icon" />
                    </li> */}
                </ul>
            </div>
        </div>
    )
}
