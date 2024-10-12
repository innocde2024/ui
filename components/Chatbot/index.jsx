/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { chatCompletion } from "../../utils/openAi";
import { ThemeProvider } from "styled-components";

const Chatbot = () => {
  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#EF6C00",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#EF6C00",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };
  const [count, setCount] = useState(1);

  const ChatBotStep = ({ steps, triggerNextStep }) => {
    const fetchAnswer = async () => {
      const userMessage = steps.userInput.value;
      const answer = await chatCompletion(userMessage);
      setCount(count + 1);
      triggerNextStep({ value: answer });
    };

    useState(() => {
      fetchAnswer();
    }, []);

    return null;
  };

  const ChatBotStepWrapper = (props) => <ChatBotStep {...props} />;

  // Function to generate steps dynamically
  const generateSteps = (numSteps) => {
    const steps = [];
    for (let i = 1; i <= numSteps; i++) {
      const stepId = `${i}`;
      steps.push({
        id: stepId,
        message: "Xin chào, mời bạn đặt câu hỏi.",
        trigger: `userInput${stepId}`,
      });
      steps.push({
        id: `userInput${stepId}`,
        user: true,
        trigger: `fetchResponse${stepId}`,
      });
      steps.push({
        id: `fetchResponse${stepId}`,
        component: <ChatBotStepWrapper id={`userInput${stepId}`} />,
        waitAction: true,
        trigger: `displayResponse${stepId}`,
      });
      steps.push({
        id: `displayResponse${stepId}`,
        message: ({ previousValue }) => {
          return typeof previousValue === "string"
            ? previousValue
            : JSON.stringify(previousValue);
        },
        trigger: i < numSteps ? `${i + 1}` : "end",
      });
      steps.push({
        id: "end",
        message: "Cảm ơn bạn đã dành thời gian. Phiên bản miễn phí đã hết",
        end: true,
      });
    }
    return steps;
  };

  const steps = generateSteps(20); // Generate 20 steps

  return (
    <ThemeProvider theme={theme}>
      <ChatBot floating steps={steps} />
    </ThemeProvider>
  );
};

export default Chatbot;
