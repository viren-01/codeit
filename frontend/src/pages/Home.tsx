import { useEffect, useRef, useState } from 'react';
import Editor from '../components/Editor';
import Navbar from '../components/Navbar';
import '../home.css';
import { io } from 'socket.io-client';
import React from 'react';
import Popup from '../components/Popup';
import ConnectModal from '../components/connectModal';
import { useDispatch } from 'react-redux';
import { setTerminalVisibility } from '../store/slices';
import Common from '../service/Common';
import { BASE_URL } from '../config/constant';
import ReactSelect from '../components/ReactSelect';

const socket = io(BASE_URL + "/")

function Home() {
    const [text, setText] = useState<string>('//write your code here...')
    const [showInvitePopup, setShowInvitePopup] = useState<boolean>(false)
    const [showConnectModal, setShowConnectModal] = useState<boolean>(false)
    const [connectionRequest, setConnectionRequest] = useState<{ parent: string | undefined, child: string }>({ parent: '', child: '' })
    const isConnected = useRef<boolean>(false)
    const dispatch: any = useDispatch()
    const [response, setResponse] = useState<any>("")
    const [codeLanguageOptions, setCodeLanguageOptions] = useState<any>([{ label: 'NodeJS', value: 'NodeJS' }]) // eslint-disable-line

    useEffect(() => {
        let connDetails: any = null
        socket.on('connect', () => {
            console.log(socket.id)
        })

        //to check for new incoming connections
        socket.on('new-con', (data: any) => {
            if (data.child === socket.id) {
                setConnectionRequest(data)
                console.log("Setting it true")
                setShowConnectModal(true)
            }
        })

        socket.on('con-detail', (msg: { parent: string, child: string, status: string }) => {
            //check if parent            
            if (msg.parent === socket.id) {
                if (msg.status === 'accept') {
                    connDetails = msg
                    alert('Connection Accepted')
                    isConnected.current = true
                } else {
                    isConnected.current = false
                    alert('Connection Rejected')
                }
            }
        })

        //code changes
        socket.on('code', (data: any) => {
            let { child } = connDetails || {}
            if (connDetails && child !== data.child) {
                return
            }

            if (isConnected.current && (data.parent === socket.id || data.child === socket.id)) {
                setText(data.data)
            }
        })

        socket.on('ex-response', (data: any) => {
            let { socket_id } = data
            if (socket.id === socket_id) {
                setResponse(data?.data?.data)
            }
        })

        return () => {
            socket.disconnect()
            isConnected.current = false
        }
    }, [])

    const handleInviteClick = (type?: any) => {
        if (type === 'connectModal') {
            setShowConnectModal(!showConnectModal)
            socket.emit('con-detail', { ...connectionRequest, status: 'reject' })
        } else {
            setShowInvitePopup(!showInvitePopup)
        }
    }

    const handleTextChange = (text: string) => {
        setText(text)
        if (isConnected) {
            socket.emit('message', { ...connectionRequest, data: text })
        }
    }

    const handleInvite = (inviteId: string) => {
        let proceed = true
        if (connectionRequest.child && isConnected.current) {
            proceed = window.confirm('This will close your current connection')
        }

        if (!proceed) return

        let inviteObj = {
            parent: socket.id,
            child: inviteId
        }

        setConnectionRequest(inviteObj)
        socket.emit('invite', inviteObj)
        setShowInvitePopup(false)
    }

    const handleConnectSuccess = () => {
        let connObj = {
            ...connectionRequest,
            status: 'accept'
        }
        socket.emit('con-detail', connObj)
        socket.emit('message', text)
        setShowConnectModal(false)
        isConnected.current = true
    }

    const handleExecute = async () => {
        dispatch(setTerminalVisibility(true))
        await Common.executeClientCode({ text, from: socket.id })
    }

    return (
        <>
            <div className='home'>
                <div className='one'>
                    <Navbar />
                </div>
                <div className='two'>
                    <Editor text={text} handleTextChange={handleTextChange} output={response} />
                </div>
                <div className='three'>
                    <div className='dropdown'>
                        <ReactSelect options={codeLanguageOptions} value={codeLanguageOptions[0]} onChange={() => { }} />
                    </div>
                    <div className='btn-1'>
                        <button className="equal-width-buttons" onClick={handleInviteClick}>Invite</button>
                    </div>
                    <div className='btn-2'>
                        <button className="equal-width-buttons" onClick={handleExecute}>Execute</button>
                    </div>
                </div>
                <div className='four'></div>
            </div>
            {
                showInvitePopup && <Popup onCancel={handleInviteClick} inviteId={socket.id} onInvite={handleInvite} />
            }
            {
                showConnectModal && <ConnectModal onCancel={() => handleInviteClick('connectModal')} onSuccess={handleConnectSuccess} inviteId={connectionRequest.parent} />
            }
        </>
    )
}


export default React.memo(Home)