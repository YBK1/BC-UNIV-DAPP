import { EthProvider } from "./contexts/EthContext";
import React, { useState } from 'react';
import Navbar from './components/UI/Navbar';
import Mains from './components/UI/Mains';
import Footer from './components/UI/Footer';
import styles from "./App.module.css";

function App() {
  const [page, setPage] = useState('home');

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <EthProvider>
        <div className = {styles.all}>
          <Navbar onChange={handlePageChange} />
          <div className = {styles.body}>
            <div className = {styles.mainbox}>
              <Mains page={page} />
            </div>
            <Footer />
          </div>
        </div>
      </EthProvider>
    </>
  );
}

export default App;
