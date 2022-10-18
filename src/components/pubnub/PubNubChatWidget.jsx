import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";
import PubNub, { generateUUID } from "pubnub"
import {PubNubProvider} from "pubnub-react";
import { instance } from 'index';

export default function PubNubChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { auth } = useSelector((state) => state);

    const open = () => {
        setIsOpen(!isOpen);
    }

    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    const myUser = {
        id: `User-${genRanHex(4)}`,
        name: auth?.user?.username,
        profileUrl: auth?.user?.image,
    };

    const pubnub = new PubNub({
        publishKey: "pub-c-dfdb0a08-9c55-4eef-87b6-e0646f8fad7a",
        subscribeKey: "sub-c-437a17ff-2298-45ba-a5bd-90732ad0c726",
        uuid: myUser.id,
    });

    return (
        <>
            <PubNubProvider client={pubnub}>
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
                        <Chat currentChannel="Default" users={[myUser]}>        
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
            </PubNubProvider>
        </>   
    )
}