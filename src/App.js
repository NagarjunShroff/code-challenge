import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  height: 100vh; 
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  overflow-x: auto;
`;

const CardContent = styled.div`
  width: 200px;
  height: 200px;
  margin-left: 24px;
  box-sizing: border-box;
  background: ${props => props.color ? "#ccc" : "#fff"};
  border: solid 1px #000;
  display: inline-block;
  font-size: 12px;
  margin-top: 24px;
`;

/**
 * This method takes API data(array) as input and returns an object 
 * with default values(i.e. false) for each card.
 * @param {*} cardDetails 
 * @returns 
 */
const getInitialState = (cardDetails) => {
  let obj = {};
  return cardDetails.map(c => obj = { ...obj, [c.cardName]: false });
};


const App = () => {
  const [backgroundState, setBackgroundState] = useState({});
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //Call API to fetch data here.
    //Now reading the data from the json file(data.json) available in the public folder 
    //and store the same in the state variable(apiData).
    async function fetcData() {
      await fetch('./data.json').then((res) => res.json()).then((data) => setApiData(data.data));
    };
    fetcData();
    setIsLoading(false);
    //Using API data to create an initial state and store initialState object in state variable(background).
    setBackgroundState(getInitialState(apiData));
  }, []);

  /**
   * This method takes name of the card as input and update that specfic card background state to true or false.
   * @param {*} cardName 
   */
  const toggle = (cardName) => {
    let stateObj = backgroundState;
    apiData.map(card => {
      if (card.cardName === cardName) {
        stateObj = { ...stateObj, [cardName]: !backgroundState[card.cardName] };
      }
    });
    setBackgroundState(stateObj);
  };

  return (
    <PageContainer>
      {!isLoading
        ? <CardContainer>
          {apiData && apiData.map(card =>
            <CardContent color={backgroundState[card.cardName] ? 1 : 0} key={card.cardName}>
              <div>
                <div>
                  <h1>{card.heading}</h1>
                </div>
                <div>
                  <h2>{card.subheading}</h2>
                </div>
                <div>
                  <button onClick={() => toggle(card.cardName)}>Change background</button>
                </div>
              </div>
            </CardContent>)
          }
        </CardContainer> : <div>Loading...</div>}
    </PageContainer>
  );
}

export default App;
