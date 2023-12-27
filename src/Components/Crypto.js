import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from '../redux/action';
import axios from 'axios';
import styled from 'styled-components';

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
  top: 50%;
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

const CryptoImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const CryptoInfo = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  width: 30%;
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
    return <p>Loading...</p>;
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
    </CollectionsContainer>
  );
};

export default Crypto;
