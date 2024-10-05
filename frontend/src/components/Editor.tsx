import { useEffect, useState } from 'react';
import '../editor.css';
import { useDispatch, useSelector } from 'react-redux';
import { setTerminalVisibility } from '../store/slices';

export default function Editor(props: any) {
    const [codeText, setCodeText] = useState("//write your code here...\n")
    const [showTerminal, setShowTerminal] = useState<boolean>(false)
    const mainState: any = useSelector((state: any) => state.index)
    const dispatch: any = useDispatch()

    useEffect(() => {
        if (props.text) {
            setCodeText(props.text)
        } else {
            setCodeText("//write your code here...\n")
        }
    }, [props.text])

    useEffect(() => {
        setShowTerminal(mainState.terminalVisibilty)
    }, [mainState.terminalVisibilty])

    const handleTextChange = (text: string) => {
        setCodeText(text)
        props.handleTextChange(text)
    }

    const changeTerminalVisibility = () => {
        setShowTerminal(!showTerminal)
        dispatch(setTerminalVisibility(false))
    }

    return (
        <>
            <div className="editor">
                <textarea className='editor-text' defaultValue={codeText} value={codeText} onInput={(e: any) => handleTextChange(e.target.value)}></textarea>
            </div>
            {
                showTerminal
                    ?
                    <div className='terminal'>
                        <h3 className='terminal-heading'>Output:</h3>
                        {
                            props?.output?.split('\n').map((line: any, index: number) => {
                                return (
                                    <>
                                    <span key={line?.[0] + "_" + index} className='terminal-content'>{line}</span><br></br>
                                    </>
                                )
                            })
                        }
                        <button className="close-button" onClick={changeTerminalVisibility}>
                            &times;
                        </button>
                    </div>
                    : undefined
            }
        </>
    )
}