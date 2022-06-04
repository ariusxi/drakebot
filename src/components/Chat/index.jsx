import React from 'react'
import styled from 'styled-components'

const Chat = ({ messageList }) => {
    return (
        <ChatWrapper>
            {messageList.map((message, index) => (
                <ChatMessage
                    personal={message.personal}
                    key={index}>
                    {message.content.text}
                    {message.content.image ? (
                        <img 
                            src={message.content.image} 
                            alt={message.content.image}/>
                    ) : ''}
                </ChatMessage>
            ))}
        </ChatWrapper>
    )
}

const ChatWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: block;
    overflow-y: scroll;
    clear: both;
`

const ChatMessage = styled.div`
    clear: both;
    float: ${(props) => props.personal ? 'right' : 'left'};
    padding: 6px 10px 7px;
    border-radius: ${(props) => props.personal ? '10px 10px 0 10px' : '10px 10px 10px 0'};
    background-color: ${(props) => props.personal ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.3)'};
    color: ${(props) => props.personal ? '#000' : '#fff'};
    margin: 5px 20px;
    font-size: 1.1rem;
    line-height: 1.4;
    position: relative;
    text-shadow: 0 1px 1px rgb(0 0 0 / 20%);
    animation: bounce 500ms linear both;
    p {
        width: 100%;
    }
    img {
        width: 50%;
        margin: 0 auto;
    }
    img {
        width: 100%;
        border-radius: 10px;
        box-shadow:
            0 6px 12px 2px rgb(0 0 0 / 14%), 
            0 3px 15px 5px rgb(0 0 0 / 12%), 
            0 4px 5px -5px rgb(0 0 0 / 10%);
    }
`

export default Chat