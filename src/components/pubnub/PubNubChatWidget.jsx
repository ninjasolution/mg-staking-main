import { useEffect, useState } from 'react'
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";
const currentChannel = "Default"

export default function PubNubChatWidget() {
    const [isOpen, setIsOpen] = useState(false)

    const open = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <div 
                className='bg-primary'
                style={{
                    position: 'fixed',
                    zIndex: 999,
                    width: 300,
                    height: 400,
                    bottom: 30, 
                    right: 80,
                    color: "white",
                    borderRadius: 5,
                    flexDirection: 'column',
                    display: isOpen ? 'flex' : 'none'
                }}
            >                      
                <div className='DFlex color-white justify-content-center align-items-center' style={{height: 50}}>
                    
                    <span>Chat With MegaFans</span>
                    <button onClick={open} style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        position: 'absolute',
                        right: 12
                    }}>
                        <span>&#10006;</span>  
                    </button>
                </div>
                {isOpen ? (
                    <Chat {...{currentChannel}}>        
                        <MessageList />
                        <MessageInput />
                    </Chat>
                ) : null}
            </div>   
                <div          
                    onClick={open}   
                    hidden={isOpen}
                    className='bg-light flex justify-content-center align-items-center'
                    style={{
                        position: 'fixed',
                        zIndex: 999,
                        width: 250,
                        height: 35,
                        bottom: 30, 
                        right: 80,
                        color: "darkblue",
                        borderRadius: 15,
                        cursor: 'pointer',
                        display: isOpen ? 'none' : 'flex'
                    }}
                >        
                    <span style={{color: 'green'}}>●</span>&nbsp;&nbsp;                        
                    <span>We are online!  Chat Now </span>
                    <i className="icofont-ui-chat"></i>
                </div>    
        </>   
    )
}