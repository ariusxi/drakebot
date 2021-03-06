import React, { useState } from 'react'
import styled from 'styled-components'

import Icon from './../Icon'

const MessageInput = ({ sendMessage, inputType, buttons = [] }) => {
    const [message, setMessage] = useState('')

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage(message)
            setMessage('')
        }
    }

    const handleClickSend = () => {
        sendMessage(message)
        setMessage('')
    }

    return (
        <MessageInputWrapper>
            {inputType === 'textfield' ? (
                <>
                    <MessageInputField 
                        type="text"
                        placeholder="Digite aqui sua mensagem..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}/>
                    <MessageButtonSend onClick={() => handleClickSend()}>
                        <Icon iconText="send"/>
                    </MessageButtonSend>
                </>
            ) : ''}
            {inputType === 'buttons' ? (
                <>
                    {buttons.map((button, index) => (
                        <MessageButtonOption
                            key={index}
                            width={100 / buttons.length}
                            onClick={() => sendMessage(button.text)}>
                            {button.text}
                        </MessageButtonOption>
                    ))}
                </>
            ) : ''}
        </MessageInputWrapper>
    )
}

const MessageInputWrapper = styled.div`
    background-color: var(--message-input-background-color);
    color: var(--message-input-text-color);
    padding: 10px;
    display: flex;
    border-radius: 0 0 10px 10px;
`

const MessageInputField = styled.input`
    width: 97%;
    margin-left: 10px;
    border: none;
    background-color: transparent;
    color: var(--message-input-field-text-color);
    font-size: 1.2rem;
    font-weight: 200;
    border-bottom: 1px solid var(--message-input-field-border-color);
    outline: none;
    justify-content: flex-start;
    animation: bounce 500ms linear both;
`

const MessageButtonOption = styled.button`
    outline: none;
    border: none;
    width: ${(props) => props.width}%;
    cursor: pointer;
    margin: 0 10px;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 5px;
    background-color: var(--message-input-button-background-color);
    color: var(--message-input-button-text-color);
    transition: all .2s;
    box-shadow:
        0 16px 24px 2px rgb(0 0 0 / 14%), 
        0 6px 30px 5px rgb(0 0 0 / 12%), 
        0 8px 10px -5px rgb(0 0 0 / 20%);

    &:hover{
        background-color: rgba(0, 0, 0, 0.5);
    }
`

const MessageButtonSend = styled.button`
    width: 50px;
    height: 50px;
    margin-top: 3px;
    justify-content: flex-end;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background-color: var(--message-input-button-background-color);
    color: var(--message-input-button-text-color);
    transition: all .2s;
    animation: bounce 500ms linear both;
    box-shadow:
        0 16px 24px 2px rgb(0 0 0 / 14%), 
        0 6px 30px 5px rgb(0 0 0 / 12%), 
        0 8px 10px -5px rgb(0 0 0 / 20%);
    
    &:hover{
        background-color: rgba(0, 0, 0, 0.5);
    }
`

export default MessageInput