import React, { Component } from 'react'
import styled from 'styled-components'

import Header from './../components/Header'
import Chat from './../components/Chat'
import MessageInput from './../components/MessageInput'

import DecisionTree from './../data/tree.json'

import BotIcon from './../assets/imgs/bot_icon.png'

class Main extends Component {

    state = {
        treeIndex: 0,
        inputType: "textfield",
        buttons: [],
        optionsAvailable: [],
        errorMessages: [],
        messageList: [],
    }

    constructor(props) {
        super(props)

        this.sendMessage = this.sendMessage.bind(this)
        this.showWelcomeChat()
    }

    componentDidMount() {
        document.title = 'Drakebot'
    }

    showWelcomeChat(messageText = null) {
        const self = this

        setTimeout(() => {
            const messageList = DecisionTree[0].messages.map((message) => ({
                personal: false,
                content: {
                    text: message.text,
                    links: message.links,
                    image: message.image,
                },
            }))

            const previousMessage = []
            if (messageText) {
                previousMessage.push({
                    personal: true,
                    content: {
                        text: messageText,
                    },
                })
            }

            self.setState({
                isRestartChat: false,
                messageList: [...previousMessage, ...messageList],
                optionsAvailable: DecisionTree[0].options,
                errorMessages: DecisionTree[0].errorMessages,
            })
        }, 500)
    }

    showMessage(messageContent, timeout = 500) {
        const self = this
        for (const message of messageContent) {
            setTimeout(() => self.setState((prevState) => ({
                messageList: [
                    ...prevState.messageList,
                    ...[message],
                ],
            })), timeout)
        }

    }

    sendMessage(messageText) {
        const { 
            optionsAvailable, 
            errorMessages, 
            isRestartChat,
        } = this.state

        if (messageText === '') return

        if (isRestartChat) return this.showWelcomeChat(messageText)

        this.showMessage([{
            personal: true,
            content: {
                text: messageText,
            },
        }], 0)

        let gotoCode = null
        for (const option of optionsAvailable) {
            if (option.texts.includes(messageText.toLowerCase())) {
                gotoCode = option.goto
            }
        }

        if (!gotoCode) {
            for (const error of errorMessages) {
                this.showMessage([{
                    personal: false,
                    content: {
                        text: error.text,
                    }
                }], 1000)
            }
            return
        }

        const nextIndexTree = DecisionTree.findIndex((branch) => branch.code === gotoCode)

        const messageList = DecisionTree[nextIndexTree].messages.map((message) => ({
            personal: false,
            content: {
                text: message.text,
                links: message.links,
            },
        }))

        const nextOptions = DecisionTree[nextIndexTree].options

        this.showMessage(messageList, 1000)
        this.setState({
            optionsAvailable: nextOptions,
            treeIndex: optionsAvailable.length > 0 ? nextIndexTree : 0,
            isRestartChat: DecisionTree[nextIndexTree].isRestartChat,
            buttons: DecisionTree[nextIndexTree].buttons,
            inputType: DecisionTree[nextIndexTree].inputType,
            errorMessages: DecisionTree[nextIndexTree].errorMessages,
        })
    }

    render() {
        const { messageList, inputType, buttons } = this.state

        return (
            <MainWrapper>
                <Header botName="Drake" botIcon={BotIcon}/>
                <Chat messageList={messageList}/>
                <MessageInput 
                    sendMessage={this.sendMessage}
                    inputType={inputType}
                    buttons={buttons}/>
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