import React, { Component } from 'react';
import Header from './Header';
import Nav from './Nav';
import Meta from './Meta';
import styled, { ThemeProvider, injectGlobal, consolidateStreamedStyles } from 'styled-components';

const theme = {
    red: '#FF0000',
    black: '#333',
    grey: '#3A3A3A',
    blue: '#2c98f0',
    lightgrey: '#f2f3f7',
    offWhite: '#EDEDED',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
  };


const StyledPage = styled.div`
	background: white;
	color: ${props => props.theme.black};
`;
  
injectGlobal`
	html {
		box-sizing: border-box;
		font-size: 10px;

	}
	*, *:before, *:after {
		box-sizing: inherit;
	}
	body {
        padding: 0;
        width: 100%;
        height: 100%;
		margin: 0;
		font-size: 1.5rem;
		line-height: 2;
		font-family: Arial, sans-serif;
	}
	a {
		text-decoration: none;
		color: ${theme.black};
    }
    .left {
        width: 250px;
        display: inline-block;

    }
    .right { 
        vertical-align: top;
        width: calc(100% - 260px);
        display: inline-block;
        position: relative;
        top: 0;
        margin-top: -14px;
        padding-left: 5px;
    }
    h1, h2, h3, h4, h5, h6 {
        color: #000;
        font-family: Georgia, sans-serif;
        font-weight: 400;
        margin: 0 0 30px;
    }
`;


export default class Page extends Component { 
    render() {
        return (
            <ThemeProvider theme={theme}>
				<StyledPage>
					<Meta />
					<div className="left">
                        <Nav />
                    </div>
                    <div className="right">
                        {this.props.children}
                    </div>
				</StyledPage>
			</ThemeProvider>
        )
    }
}