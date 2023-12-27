import React, { useState, useEffect , useRef} from 'react';
import styled, { keyframes } from 'styled-components';
import { AiOutlineSwap } from 'react-icons/ai';
import anime from 'animejs';


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
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;

  &:hover {
    color: #333;
    &:before {
      animation: ${shimmerAnimation} 1.5s infinite;
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

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  color: #ffffff;
  transition: color 0.3s ease;
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

const BuyButtonComponent= () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);
  const modalRef = useRef();

  const handleHover = () => {
    anime({
      targets: '.golden-button',
      filter: ['hue-rotate(20deg)', 'hue-rotate(0deg)'],
      duration: 300,
      easing: 'easeOutQuad',
    });
  };

  


  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
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
      <GoldenButton onClick={openModal}>
        <AiOutlineSwap />
      </GoldenButton>

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
        </ModalOverlay>
      )}
    </>
  );
};

export default BuyButtonComponent;