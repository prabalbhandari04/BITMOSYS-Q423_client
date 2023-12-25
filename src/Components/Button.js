import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { AiOutlineSwap } from 'react-icons/ai';
import anime from 'animejs';

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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(153, 124, 180, 0.5);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(28.7px);
  -webkit-backdrop-filter: blur(28.7px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(to right, #6c0691, #040881);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  position: relative;
  animation: ${keyframes`
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  `} 0.3s ease-out;
`;

const CryptoItem = styled.div`
  flex-basis: calc(33.33% - 20px);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CryptoLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
`;

const CryptoDetails = styled.div`
  flex-grow: 1;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      // Animation using animejs
      anime({
        targets: '.modal-content',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 300,
        easing: 'easeOut',
      });
    }
  }, [isModalOpen]);

  return (
    <>
      <LightningButton onClick={openModal}>
        <AiOutlineSwap />
      </LightningButton>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
        </ModalOverlay>
      )}
    </>
  );
};

export default LightningButtonComponent;