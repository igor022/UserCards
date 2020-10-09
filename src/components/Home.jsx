import React from 'react';
import Header from './Header';
import Cards from './Cards';


function Home() {
  return (
    <div>
      <Header />
      <Cards cardsAmount={3}/>
    </div>
  );
}

export default Home;