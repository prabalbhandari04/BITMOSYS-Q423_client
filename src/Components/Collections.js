import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from '../redux/action';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled, { keyframes } from 'styled-components';
import { AiOutlineSwap } from 'react-icons/ai';
import './style.css';

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


const CoinDetailsContainer = styled.div`
  flex-basis: 100%;
  margin-top: 20px;
`;

const CoinSelectionLabel = styled.p`
  margin-bottom: 10px;
`;

const CoinSelectionInput = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #fff; // Adjust as needed
  border-radius: 8px;
  background-color: transparent;
  color: #120230; // Adjust as needed
`;

const CoinQuantityInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #fff; // Adjust as needed
  border-radius: 8px;
  background-color: transparent;
  color: #fff; // Adjust as needed
`;

const InputContainer = styled.div`
  flex-basis: 50%; // Adjust as needed
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #fff; // Adjust as needed
  border-radius: 8px;
  background-color: transparent;
  color: #fff; // Adjust as needed
`;

const CoinSelectionContainer = styled.div`
  flex-basis: 50%; // Adjust as needed
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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

const Collections = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cryptoData, setCryptoData] = useState({});
  const [walletDetails, setWalletDetails] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  const modalRef = useRef();

  const fetchData = async () => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get('https://bitmosys-q423-server.onrender.com/api/v1/crypto/crypto');
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };

  const fetchWalletDetails = async () => {
    try {
      const response = await axios.get('https://bitmosys-q423-server.onrender.com/api/v1/wallet/wallet');
      setWalletDetails(response.data.walletDetails);
      console.log(walletDetails)
    } catch (error) {
      console.error('Error fetching wallet details:', error);
    }
  };
  fetchWalletDetails()
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
  

  const openModal = () => {
    setIsModalOpen(true);
  };


  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleSelectionChange = (e) => {
    // Stop event propagation to prevent closing the modal
    e.stopPropagation();
    setSelectedCrypto(e.target.value);
  };

  return (
    <div className="container mx-auto flex flex-wrap justify-center">
      {data.map((item) => (
       <div
       key={item.id}
       className="glass-card p-6 rounded-lg hover:scale-105 transition-all cursor-pointer mx-2 my-2 w-1/5"
       onMouseMove={handleMouseMove}
       onMouseEnter={handleMouseEnter}
       onMouseLeave={handleMouseLeave}
       data-aos="fade-up"
     >
          
          <img src={item.image} alt="" className="h-40 w-40 p-4 ml-4 object-cover rounded-md" />
          <div className="flex flex-col items-center mt-2">
            <span className="text-xs text-secondary">
              <span className="font-primary font-bold text-xl md:mr-1">{item.name}</span> -
              <span className="text-l">{item.symbol}</span>
            </span>
          </div>
          <div className="flex justify-center items-center mt-2">
            <LightningButton onClick={() => handleButtonClick(item._id)}>
              <AiOutlineSwap /> 
            </LightningButton>
          </div>
        </div>
      ))}
                {isModalOpen && (
      <ModalOverlay onClick={closeModal}>
        <ModalContent className="modal-content" ref={modalRef}>
          <CloseButton onClick={closeModal}>X</CloseButton>
          <CryptoItem>
            <CryptoDetails className="text-secondary">
            <CryptoLogo src={cryptoData.image} alt={`${cryptoData.name} Logo`} />
              <p>{cryptoData.symbol}</p>
                <p>Swap quantity:</p>
                <CoinQuantityInput
                  type="text"
                  value={walletDetails.coins.find((coin) => coin.crypto === selectedCrypto)?.quantity || ''}
                  readOnly
                />
            </CryptoDetails>
          </CryptoItem>
          <CoinDetailsContainer>
                <CoinSelectionLabel>Select a coin:</CoinSelectionLabel>
                <CoinSelectionInput
                  onChange={handleSelectionChange}
                  value={selectedCrypto}
                >
                  {walletDetails.coins.map((coin) => (
                    <option key={coin._id} value={coin.crypto}>
                      {coin.cryptoName} - {coin.cryptoSymbol}
                    </option>
                  ))}
                </CoinSelectionInput>
              </CoinDetailsContainer>
              <CoinDetailsContainer>
                <p>Swap quantity:</p>
                <CoinQuantityInput
                  type="text"
                  value={walletDetails.coins.find((coin) => coin.crypto === selectedCrypto)?.quantity || ''}
                  readOnly
                />
              </CoinDetailsContainer>
        </ModalContent>
      </ModalOverlay>
    )}


    </div>
  );
};


export default Collections;