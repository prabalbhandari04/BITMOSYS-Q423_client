import React, { useState } from 'react';
import anime from 'animejs';
import styled, { keyframes } from 'styled-components';

const shimmerAnimation = keyframes`
  0% {
    transform-origin: bottom right;
    transform: scaleX(0);
  }
  50% {
    transform-origin: bottom left;
    transform: scaleX(1);
  }
  100% {
    transform-origin: bottom right;
    transform: scaleX(0);
  }
`;

const GoldenButton = styled.button`
  background-color: gold;
  color: #333;
  border: none;
  padding: 10px 10px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;

  &:hover {
    color: #333;
    &:before {
      animation: ${shimmerAnimation} 1.5s infinite; /* Adjust the duration as needed */
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: black;
    background: linear-gradient(45deg, #fff, rgba(255, 255, 255, 0) 35%);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 10%;
  left: 10%;
  width: 70%;
  height: 70%;
  background: rgba(153, 124, 180, 0.5);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(28.7px);
  -webkit-backdrop-filter: blur(28.7px);
  backdrop-filter: blur(70px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: xl;
  cursor: pointer;
  color: #ffffff;
`;

const WalletContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WalletModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [cryptoCoins, setCryptoCoins] = useState(10); // Example: Set initial number of crypto coins

  const handleWalletClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleHover = () => {
    anime({
      targets: '.golden-button',
      filter: ['hue-rotate(20deg)', 'hue-rotate(0deg)'],
      duration: 300,
      easing: 'easeOutQuad',
    });
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      handleCloseModal();
    }
  };

  return (
    <>
      <GoldenButton className="golden-button" onMouseEnter={handleHover} onClick={handleWalletClick}>
        Wallet
      </GoldenButton>

      {isModalOpen && (
        <Modal className="modal-overlay" onClick={handleModalClick}>
          <CloseButton onClick={handleCloseModal}>X</CloseButton>
          <WalletContent>
            <h2>Your Crypto Wallet</h2>
            <p>You have {cryptoCoins} crypto coins</p>
            {/* Add more wallet-related information and actions as needed */}
          </WalletContent>
        </Modal>
      )}
    </>
  );
};

export default WalletModal;
