import React, { Component } from 'react'
import styled from 'styled-components'

import Header from './../components/Header'
import Chat from './../components/Chat'
import MessageInput from './../components/MessageInput'

import BotIcon from './../assets/imgs/bot_icon.png'

class Main extends Component {

    state = {
        messageList: [{
            personal: false,
            content: {
                text: 'Olá mundo'
            },
        }, {
            personal: true,
            content: {
                text: 'Aqui está uma resposta',
            }
        }],
    }


    constructor(props) {
        super(props)

        this.sendMessage = this.sendMessage.bind(this)
    }

    sendMessage(messageText) {
        if (messageText === '') return

        this.setState((prevState) => ({
            messageList: [...prevState.messageList, ...[{
                personal: true,
                content: {
                    text: messageText,
                }
            }]]
        }))
    }

    render() {
        const { messageList } = this.state

        return (
            <MainWrapper>
                <Header botName="Drake" botIcon={BotIcon}/>
                <Chat messageList={messageList}/>
                <MessageInput sendMessage={this.sendMessage}/>
            </MainWrapper>
        )
    }

}

const MainWrapper = styled.div`
    width: 80vw;
    height: 86vh;
    margin: 4vh auto;
    display: grid;
    grid-template-columns: repeat(1, 100%);
    grid-template-rows: 1fr 78% 10% 10%;
    box-shadow:
        0 16px 24px 2px rgb(0 0 0 / 14%), 
        0 6px 30px 5px rgb(0 0 0 / 12%), 
        0 8px 10px -5px rgb(0 0 0 / 20%);
    @media screen and (max-width: 610px) {
        width: 100vw;
        height: 100vh;
        margin: 0;
    }
`

export default Main