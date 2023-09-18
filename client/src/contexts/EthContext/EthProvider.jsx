import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifacts => {
      if (artifacts && Array.isArray(artifacts)) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();

        const contracts = artifacts.map(artifact => {
          const { abi } = artifact;
          let address, contract;
          try {
            address = artifact.networks[networkID].address;
            contract = new web3.eth.Contract(abi, address);
          } catch (err) {
            console.error(err);
          }
          return contract;
        });

        dispatch({
          type: actions.init,
          data: { artifacts, web3, accounts, networkID, contracts }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact1 = require("../../contracts/DidRegistry.json");
        const artifact2 = require("../../contracts/HashContainer.json");
        const artifact3 = require("../../contracts/CidContainer.json");

        init([artifact1, artifact2, artifact3]);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifacts);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifacts]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
