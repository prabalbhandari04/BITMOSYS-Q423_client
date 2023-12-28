import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from '../redux/action';
import axios from 'axios';
import styled,{keyframes} from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AiOutlineSwap } from 'react-icons/ai';
import BuyButton from "./Buybuton"
import toast from 'react-hot-toast';
import { MutatingDots } from 'react-loader-spinner'; 


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

const electricCrackle = keyframes`
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
`;

const pulsingBlue = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
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
  position: relative;
  overflow: hidden;

  &:hover {
    color: #442e75;
    background-color: #e5edf5;
    box-shadow: -2px -1px 8px 0px #e5edf5, 2px 1px 8px 0px rgba(47, 2, 101, 0.48);
    animation: ${shake} 0.3s ease-in-out infinite, ${electricCrackle} 0.5s ease-in-out infinite;
  }

  &:active {
    box-shadow: none;
  }

  &:before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: linear-gradient(90deg, transparent, rgba(0, 0, 255, 0.2), transparent);
    top: 0;
    left: 0;
    pointer-events: none;
    animation: ${pulsingBlue} 1s linear infinite;
  }
`;


const FullScreenLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #2a0238, #0a0b31);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
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

const CryptoDetails = styled.div`
  flex-grow: 1;
`;

const ModalContent = styled.div`
  background: linear-gradient(to right, #6c0691, #040881);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
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
  margin-bottom: 20px;
`;

const CryptoLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const CoinSelectionLabel = styled.p`
  margin-bottom: 10px;
  color: #fff;
`;

const CoinInputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CoinSelectionInput = styled.select`
  width: 50%;
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 8px;
  background-color: transparent;
  color: #120230;
`;

const CenteredModalContent = styled(ModalContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CryptoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CryptoDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const CoinQuantityInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 8px;
  background-color: transparent;
  color: #fff;
`;

const InputContainer = styled.div`
  flex-basis: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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

const CollectionsContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GlassCard = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  width: 20%;
  padding: 2%;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease-in-out;
  transform: translate(-50%, -50%) rotateY(${(props) => props.rotation}deg) translateZ(300px);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
  z-index: ${(props) => (props.isVisible ? 2 : 1)};
`;

const BuyButtonContainer = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CryptoImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 8px;
`;

const CryptoInfo = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 40%;
  width: 35%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
`;

const Button = styled.button`
  background-color: ${(props) => (props.secondary ? '#6c0691' : 'gold')};
  color: #333;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  pointer-events: auto;
`;

const Crypto = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state);
  const [selectedCard, setSelectedCard] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cryptoData, setCryptoData] = useState({});
  const [walletDetails, setWalletDetails] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [quantityToSwap, setQuantityToSwap] = useState();
  const [selectedCoin, setSelectedCoin] = useState(null);
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
  
      // Assuming that selectedCard represents the index of the selected cryptocurrency
      const selectedCardIndex = selectedCard >= 0 && selectedCard < cryptoResponse.data.length
        ? selectedCard
        : 0; // Default to 0 if selectedCard is out of bounds
  
      setCryptoData(cryptoResponse.data[selectedCardIndex]);
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
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
  
 


  const handleSwap = async (coinId) => {
    if (!selectedCoin) {
      console.error('No coin selected');
      return;
    }

    try {
      const response = await axios.post(
        `https://bitmosys-q423-server.onrender.com/api/v1/wallet/exchange/${selectedCrypto}`,
        {
          quantity: Number(quantityToSwap),
          destinationCryptoId: coinId
        }
      );
      alert('Swap success:', response.data)
      console.log('Swap success:', response.data);
      setIsModalOpen(false)
    } catch (error) {
      alert('Error swapping:', error)
      console.error('Error swapping:', error);
      setIsModalOpen(false)
    }
  };

  


  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSelectionChange = (e) => {
    const selectedCryptoId = e.target.value;
    setSelectedCrypto(selectedCryptoId);
  
    // Find the selected coin details
    const selectedCoinDetails = walletDetails.coins.find((coin) => coin.crypto === selectedCryptoId);
    setSelectedCoin(selectedCoinDetails);
  
    setQuantityToSwap(''); // Reset quantity when selecting a new coin
  };
  
  const handleQuantityChange = (e) => {
    setQuantityToSwap(e.target.value);
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
    fetchDataAndWallet();
  }, [selectedCard]); 


  const handleButtonClick = (direction) => {
    setSelectedCard((prevSelectedCard) => {
      let newSelectedCard = prevSelectedCard + direction;
      if (newSelectedCard < 0) {
        newSelectedCard = data.length - 1;
      } else if (newSelectedCard >= data.length) {
        newSelectedCard = 0;
      }
      return newSelectedCard;
    });
  };

  const handleBuy = async (coinId) => {
    if (!selectedCrypto) {
      console.error('No crypto selected');
      return;
    }

    try {
      const response = await axios.post(
        `https://bitmosys-q423-server.onrender.com/api/v1/wallet/buy/${coinId}`,
        {
          quantity: Number(quantityToSwap),
        }
      );

      // Use react-hot-toast for success notification
      toast.success(response.data.message);

      console.log('Buy success:', response.data);
      setIsModalOpen(false);
    } catch (error) {
      // Use react-hot-toast for error notification
      toast.error(error.message);

      console.error('Error buying:', error.message);
      setIsModalOpen(false);
    }
  };
  

  useEffect(() => {
    dispatch(fetchDataRequest());
    const fetchData = async () => {
      try {
        const cryptoResponse = await axios.get('https://bitmosys-q423-server.onrender.com/api/v1/crypto/crypto');
        dispatch(fetchDataSuccess(cryptoResponse.data));
      } catch (error) {
        dispatch(fetchDataFailure(error.message));
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <FullScreenLoader>
        <MutatingDots
  visible={true}
  height="100"
  width="100"
  color="#ffffff"
  secondaryColor="#ffffff"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </FullScreenLoader>
    );
  }


  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <CollectionsContainer>
      <ButtonContainer>
        <Button onClick={() => handleButtonClick(-1)} secondary>
          {'<'}
        </Button>
        <Button onClick={() => handleButtonClick(1)} secondary>
          {'>'}
        </Button>
      </ButtonContainer>
      {data.map((item, index) => (
        <GlassCard
          onClick={() => {
            setSelectedCrypto(item);
            openModal();
          }}
          key={item.id}
          rotation={(index - selectedCard) * 45}
          isVisible={index === selectedCard}
        >
          <CryptoImage src={item.image} alt="" />
          <CryptoInfo>
            <span className="text-xs text-secondary">
              <span className="font-primary font-bold text-xl md:mr-1">{item.name}</span> -
              <span className="text-l">{item.symbol}</span>
            </span>
          </CryptoInfo>
        </GlassCard>
      ))}
        {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <CenteredModalContent className="modal-content" ref={modalRef}>
            <CloseButton onClick={closeModal}>X</CloseButton>
            <CryptoItemWrapper>
              <CryptoItem>
                <CryptoDetailsContainer className="text-secondary">
                  <CryptoLogo src={cryptoData.image} alt={`${cryptoData.name} Logo`} />
                  <p>{cryptoData.symbol}</p>
                </CryptoDetailsContainer>
              </CryptoItem>
            </CryptoItemWrapper>
            <CryptoItemWrapper>
                <CoinQuantityInput
                  type="number"
                  placeholder="Enter quantity"
                  value={quantityToSwap}
                  onChange={handleQuantityChange}
                />
            </CryptoItemWrapper>
            <div>
              <LightningButton onClick={() => handleBuy(cryptoData._id)}>Buy</LightningButton>
            </div>
          </CenteredModalContent>
        </ModalOverlay>
      )}
    </CollectionsContainer>
  );
};

export default Crypto;