/*===============================================================
# Author: Md. Foysal Mahmud

# Description: This component call all 3 main components and 
               cover those component with Context api                                     
                                           
===================================================================*/

import Header from "./header/Header";
import Body from "./body/Body";
import Footer from "./footer/Footer";
import StoreContextProvider from "../storeContext/StoreContext";

const MainComponent = () => {
  return (
    <div>
      <StoreContextProvider>
        <Header />
        <Body />
        <Footer />
      </StoreContextProvider>
    </div>
  );
};

export default MainComponent;
