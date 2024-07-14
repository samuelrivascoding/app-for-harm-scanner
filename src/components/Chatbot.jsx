import { useState, useEffect, useRef } from "react";
import "../components/Chatbot.css";
import fetch from 'isomorphic-fetch';



const Chatbot = () => {
  const [userMessage, setUserMessage] = useState(""); // State to store user message
  const [chatMessages, setChatMessages] = useState([
    { message: "Hi there! 👋 Ask any question about a product label or your health and I can help you!", type: "incoming" },
  ]);
  const chatInputRef = useRef(null);
  const chatboxRef = useRef(null);


  /*const isLocal = import.meta.env.VITE_VERCEL_URL === "local";
  const vercelUrl = import.meta.env.VITE_VERCEL_URL
  const domain = isLocal ? 'localhost:3000' : vercelUrl;
  const protocol = isLocal ? 'http://' : 'https://';

  const createUrl = (route) => {
    const baseUrl = `${protocol}${domain}`;
    return `${baseUrl}${route}`;
  };

  const url = createUrl('/api/virtualAssistant');*/
  

  useEffect(() => {
    chatInputRef.current.style.height = "auto"; // Restore default height
    chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`;
  }, [userMessage]);

  useEffect(() => {
    // Move scroll down when adding a new message
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [chatMessages]);

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendChat();
    }
  };

  const handleSendChat = () => {
    if (!userMessage.trim()) return;

    console.log("Sending user message:", userMessage); // Log the message here

    const updatedMessages = [
      ...chatMessages,
      { message: userMessage, type: "outgoing" },
    ];
    setChatMessages(updatedMessages);
    setUserMessage("");

    const thinkingMessage = {
      message: "( Thinking... )",
      type: "incoming",
      blinking: true,
    };
    setChatMessages((prevMessages) => [...prevMessages, thinkingMessage]);

    setTimeout(() => {
      generateResponse(userMessage);
    }, 1000);
  };

  const generateResponse = async (userMessage) => {
    console.log("Received user message:", userMessage); // Log inside generateResponse
    
    //console.log(url)

    try {

      
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Accept', 'application/json');

      const response = await fetch('/api/virtualassistant', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ message: userMessage }),
        redirect: "follow"
      });

      console.log(response.status)
  
      if (!response.ok) {
        throw new Error('Failed to fetch response. Request failed with status ${response.status}');
      }
  
      const responseData = await response.json();
      const generatedText = responseData.text; // Access the text from the response object
      
      console.log(generatedText);

      // Delete the message "( Thinking... )" and add the response
      setChatMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.message !== "( Thinking... )")
      );

      // Server response
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { message: generatedText, type: "incoming" },
      ]);
    } catch (error) {
      // Error message
      console.error("Error:", error);
      const errorMessage =
        "Sorry. Something went wrong. Please try again later.";

      // Remove "( Thinking... )" message and add error message
      setChatMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.message !== "( Thinking... )")
      );
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { message: errorMessage, type: "error" },
      ]);
    }
  };

  return (
    <>
      <button
        className="chatbot-toggler"
        onClick={() => document.body.classList.toggle("show-chatbot")}
      >
        <span class="material-symbols-outlined">
        chat_bubble
        </span>
        <span className="material-symbols-outlined close-btn">close</span>
      </button>
      <div className="chatbot">
        <header>
          <h2>Virtual AI Assistant</h2>
          <span
            className="close-btn material-symbols-outlined"
            onClick={() => document.body.classList.remove("show-chatbot")}
          >
            close
          </span>
        </header>
        <ul className="chatbox" ref={chatboxRef}>
          {chatMessages.map((msg, index) => (
            <li key={index} className={`chat ${msg.type}`}>
              {msg.type === "outgoing" ? (
                <p>{msg.message}</p>
              ) : (
                <>
                  <span className={`${msg.blinking ? "blinking" : ""}`}>
                    <img
                      src={
                        msg.message === "( Thinking... )"
                          ? "\\bot_msg.jpg"
                          : "\\bot_happy.jpg" && msg.type === "error"
                          ? "\\bot_error.jpg"
                          : "\\bot_happy.jpg"
                      }
                      alt="Luna BraveBot"
                      className={msg.type === "error" ? "error" : ""}
                    />
                  </span>
                  <p className={msg.type === "error" ? "error" : ""}>
                    {msg.message}
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="chat-input">
          <textarea
            id="chat-input"
            ref={chatInputRef}
            placeholder="Enter a message..."
            required
            value={userMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onInput={() => {
              chatInputRef.current.style.height = "auto"; // Restore default height
              chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`;
            }}
          />
          <span className="material-symbols-outlined" onClick={handleSendChat}>
            send
          </span>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
