import React, { useState, useEffect } from 'react';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [chatResponses, setChatResponses] = useState([]);

    useEffect(() => {
        const fetchChatResponses = async () => {
            try {
                const response = await fetch('https://6478b937362560649a2e5ab6.mockapi.io/api/v1/poweebot');
                const data = await response.json();
                const chatResponses = data[0].data;
                setChatResponses(chatResponses);
            } catch (error) {
                console.error('Error fetching chat responses:', error);
            }
        };
        fetchChatResponses();
    }, []);

    useEffect(() => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { content: "Hi! I am Pawee, your online consultation assistant. How can I help you today?", sender: 'bot' }
        ]);
    }, []);

    const handleMessageSubmit = (event) => {
        event.preventDefault();
        const userInput = event.target.elements.userInput.value;
        setMessages((prevMessages) => [...prevMessages, { content: userInput, sender: 'user' }]);

        setTimeout(() => {
            const botResponse = generateBotResponse(userInput);
            setMessages((prevMessages) => [...prevMessages, { content: botResponse, sender: 'bot' }]);
        }, 1000); // Delay of 1 second (1000 milliseconds)

        event.target.elements.userInput.value = '';
    };

    const generateBotResponse = (userInput) => {
        const trimmedUserInput = userInput.trim().toLowerCase();
        const matchedResponse = chatResponses.find((message) => message.text.toLowerCase() === trimmedUserInput);

        if (matchedResponse) {
            const responses = matchedResponse.responses;
            const randomIndex = Math.floor(Math.random() * responses.length);
            return responses[randomIndex].text;
        } else {
            return "I'm sorry, I couldn't understand. Can you please rephrase your question?";
        }
    };

    return (
        <div className='chatbot-container'>
            <div className="chatbot">
                <div className="chatbot__messages">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message message--${message.sender === 'user' ? 'user' : 'bot'}`}
                        >
                            {message.content}
                        </div>
                    ))}
                </div>
                <form className="chatbot__input" onSubmit={handleMessageSubmit}>
                    <input type="text" name="userInput" placeholder="Type your message..." />
                    <button type="submit" className='button'>Send</button>
                </form>
            </div>
        </div>
    );
}

export default Chatbot;