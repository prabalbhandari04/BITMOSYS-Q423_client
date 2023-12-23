import React from 'react';
import styled, { keyframes } from 'styled-components';
import anime from 'animejs';
import { AiOutlineSwap } from 'react-icons/ai';

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-3px);
  }
  90% {
    transform: translateX(3px);
  }
`;

const lightningCrackle = keyframes`
  0% {
    filter: hue-rotate(0deg);
  }
  25% {
    filter: hue-rotate(20deg);
  }
  50% {
    filter: hue-rotate(0deg);
  }
  75% {
    filter: hue-rotate(10deg);
  }
  100% {
    filter: hue-rotate(0deg);
  }
`;

const LightningButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #120230;
  background-color: #e0e8ef;
  border-style: solid;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.333);
  border-radius: 40px;
  padding: 10px;
  transform: translate(0px, 0px) rotate(0deg);
  transition: 0.2s;
  position: relative;

  &:hover {
    color: #442e75;
    background-color: #e5edf5;
    box-shadow: -2px -1px 8px 0px #e5edf5, 2px 1px 8px 0px rgba(47, 2, 101, 0.48);
    animation: ${shake} 0.3s ease-in-out infinite, ${lightningCrackle} 0.3s ease-out infinite;
  }

  &:active {
    box-shadow: none;
  }
`;

const LightningButtonComponent = () => {
  return (
    <LightningButton>
      <AiOutlineSwap />
    </LightningButton>
  );
};

export default LightningButtonComponent;
