import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from '../redux/action';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled, { keyframes } from 'styled-components';
import { AiOutlineSwap } from 'react-icons/ai';
import GoldenButtonComponent from './GoldenButton';
import BuyButtonComponent from "./Buybuton"
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

const CryptoDetails = styled.div`
  flex-grow: 1;
`;
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


const CollectionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const GlassCard = styled.div`
  position: relative;
  width: 20%;
  margin: 1%;
  padding: 2%;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CryptoImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const CryptoInfo = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const LightningButton = styled.button`
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

const Crypto = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cryptoData, setCryptoData] = useState({});
  const [walletDetails, setWalletDetails] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [quantityToSwap, setQuantityToSwap] = useState('');

  const modalRef = useRef();

  const fetchDataAndWallet = async () => {
    dispatch(fetchDataRequest());
    try {
      const [cryptoResponse, walletResponse] = await Promise.all([
        axios.get('https://bitmosys-q423-server.onrender.com/api/v1/crypto/crypto'),
        axios.get('https://bitmosys-q423-server.onrender.com/api/v1/wallet/wallet'),
      ]);

      dispatch(fetchDataSuccess(cryptoResponse.data));
      setWalletDetails(walletResponse.data.walletDetails);
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };

  const fetchCryptoDetails = async (cryptoId) => {
    try {
      const response = await axios.get(`https://bitmosys-q423-server.onrender.com/api/v1/crypto/crypto/${cryptoId}`);
      setCryptoData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching crypto details:', error);
    }
  };

       const handleButtonClick = async (cryptoId) => {
    fetchCryptoDetails(cryptoId);

    
  };

  const handleMouseMove = (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    const card = e.currentTarget;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  };

  const closeModal = (e) => {
    // Check if the click event occurred inside the modal content
    if (modalRef.current && modalRef.current.contains(e.target)) {
      return; // Do not close the modal if clicking inside
    }
    setIsModalOpen(false);
  };

  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    const title = card.querySelector('.title');
    const sneaker = card.querySelector('.sneaker img');
    const description = card.querySelector('.info h3');
    const sizes = card.querySelector('.sizes');
    const purchase = card.querySelector('.purchase');
  
    if (title && sneaker && description && sizes && purchase) {
      card.style.transition = 'none';
      title.style.transform = 'translateZ(150px)';
      sneaker.style.transform = 'translateZ(200px) rotateZ(-45deg)';
      description.style.transform = 'translateZ(125px)';
      sizes.style.transform = 'translateZ(100px)';
      purchase.style.transform = 'translateZ(75px)';
    }
  };
  
  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const title = card.querySelector('.title');
    const sneaker = card.querySelector('.sneaker img');
    const description = card.querySelector('.info h3');
    const sizes = card.querySelector('.sizes');
    const purchase = card.querySelector('.purchase');
  
    if (title && sneaker && description && sizes && purchase) {
      card.style.transition = 'all 0.5s ease';
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
      title.style.transform = 'translateZ(0px)';
      sneaker.style.transform = 'translateZ(0px) rotateZ(0deg)';
      description.style.transform = 'translateZ(0px)';
      sizes.style.transform = 'translateZ(0px)';
      purchase.style.transform = 'translateZ(0px)';
    }
  };
  
  const handleSelectionChange = (e) => {
    e.stopPropagation();
    
    setSelectedCrypto(e.target.value);
    setQuantityToSwap(''); // Reset quantity when selecting a new coin
  };

  const handleSwap = async () => {
    try {
      const response = await axios.post('https://bitmosys-q423-server.onrender.com/api/v1/wallet/exchange', {
        quantity: quantityToSwap,
        destinationCryptoId: selectedCrypto, // Use selectedCrypto instead of destinationCryptoId
      });
  
      console.log('Swap success:', response.data);
    } catch (error) {
      console.error('Error swapping:', error);
    }
  };
  


  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
    fetchDataAndWallet();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <CollectionsContainer>
      {data.map((item) => (
        <GlassCard
          key={item.id}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-aos="fade-up"
        >
          <CryptoImage src={item.image} alt="" />
          <CryptoInfo>
            <span className="text-xs text-secondary">
              <span className="font-primary font-bold text-xl md:mr-1">{item.name}</span> -
              <span className="text-l">{item.symbol}</span>
            </span>
          </CryptoInfo>
          <div className="flex justify-center items-center mt-2">
            <LightningButton onClick={() => handleButtonClick(item._id)}>
              <AiOutlineSwap />
            </LightningButton>
          </div>
        </GlassCard>
      ))}
            {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent className="modal-content" ref={modalRef}>
            <CloseButton onClick={closeModal}>X</CloseButton>
            <CryptoItem>
              <CryptoDetails className="text-secondary">
                <CryptoLogo src={cryptoData.image} alt={`${cryptoData.name} Logo`} />
                <p>{cryptoData.symbol}</p>
              </CryptoDetails>
            </CryptoItem>
          
        
          </ModalContent>
        </ModalOverlay>
      )}
    </CollectionsContainer>
  );
};

export default Crypto;