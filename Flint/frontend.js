// frontend/src/App.js
import React, { useState, useEffect } from 'react';

const App = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [nativeTokenInfo, setNativeTokenInfo] = useState(null);

  const fetchNativeTokenInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3001/getNativeTokenInfo?contractAddress=${contractAddress}`);
      const data = await response.json();
      setNativeTokenInfo(data);
    } catch (error) {
      console.error('Error fetching native token info:', error);
    }
  };

  useEffect(() => {
    if (contractAddress) {
      fetchNativeTokenInfo();
    }
  }, [contractAddress]);

  return (
    <div>
      <h1>Native Token Balance</h1>
      <label>Enter Contract Address: </label>
      <input type="text" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
      
      {nativeTokenInfo && (
        <div>
          <p>Current Balance: {nativeTokenInfo.currentBalance}</p>
          <p>Percentage Change: {nativeTokenInfo.percentageChange}%</p>
        </div>
      )}
    </div>
  );
};

export default App;