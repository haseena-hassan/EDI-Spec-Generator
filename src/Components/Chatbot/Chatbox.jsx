import React, { Component } from 'react'
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';


const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#21212a',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#21212a',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };


const steps = [
    {
      id: '0',
      message: 'Welcome to EDI Spec Guide!',
      trigger: '1'
    },
    {
      id: '1',
      message: 'Name?',
      trigger: '2'
    },
    {
        id: '2',
        user: true,
        trigger: '3'
    },
    {
      id: '3',
      message: 'Hi {previousValue}',
      end: true
    }
  ];

const Chatbox = () => (
        <ThemeProvider theme={theme}>
            <ChatBot steps={steps} />
        </ThemeProvider>
    )

export default Chatbox;


