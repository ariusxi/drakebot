import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { LinkPreview } from '@dhaiwat10/react-link-preview'

const Chat = ({ messageList }) => {
    const chatListRef = useRef(null)

    useEffect(() => chatListRef.current.scrollIntoView({
        behavior: 'smooth',
    }), [messageList])

    return (
        <ChatWrapper>
            <ChatLinkContainer>
                {messageList.map((message, index) => (
                    <ChatMessage
                        personal={message.personal}
                        key={index}>
                        <p dangerouslySetInnerHTML={{ __html: message.content.text }}></p>
                        {console.log(message.content)}
                        {message.content.image ? (
                            <img 
                                src={message.content.image} 
                                alt={message.content.image}/>
                        ) : ''}
                        {message.content.links ? message.content.links.map((link, index) => (
                            <ChatLinkContainer key={index}>
                                <LinkPreview url={link}/>
                            </ChatLinkContainer>
                        )) : ''}
                    </ChatMessage>
                ))}
            </ChatLinkContainer>
            <ChatScroll ref={chatListRef}/>
        </ChatWrapper>
    )
}

const ChatWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    overflow-y: scroll;
    clear: both;
`

const ChatMessage = styled.div`
    clear: both;
    max-width: 65%;
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
        .Container {
            margin-top: 10px;
        }
    }
    img {
        width: 100%;
        margin-top: 10px;
        border-radius: 10px;
        box-shadow:
            0 6px 12px 2px rgb(0 0 0 / 14%), 
            0 3px 15px 5px rgb(0 0 0 / 12%), 
            0 4px 5px -5px rgb(0 0 0 / 10%);
    }
    a {
        color: #000;
    }
    ol {
        margin-left: 20px;
    }
    .Container {
        margin-top: 10px;
    }
`

const ChatLinkContainer = styled.div`
    width: 100%;
    display: block;
    position: relative;
    float: left;
`

const ChatScroll = styled.div`
    width: 100%;
    height: 1px;
    float: left;
    position: relative;
`

export default Chat