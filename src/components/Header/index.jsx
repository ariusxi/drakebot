import React from 'react'
import styled from 'styled-components'

const Header = ({ botName, botIcon }) => {
    return (
        <HeaderWrapper>
            <HeaderIcon 
                src={botIcon} 
                alt={botName}/>
            <HeaderName>{botName}</HeaderName>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    background-color: var(--header-background-color);
    color: var(--header-text-color);
    padding: 10px;
    display: flex;
    border-radius: 10px 10px 0 0;
`

const HeaderIcon = styled.img`
    width: 65px;
    height: 65px;
    border-radius: 50%;
    margin-left: 10px;
    margin-top: 5px;
    border: 2px solid var(--header-icon-border-color);
    justify-content: flex-start;
`

const HeaderName = styled.label`
    justify-content: flex-start;
    line-height: 8vh;
    margin-left: 15px;
    text-transform: capitalize;
    font-weight: bold;
`

export default Header