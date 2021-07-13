/*===============================================================
## Project Name: Planet Travel
# Author: Md. Foysal Mahmud

# Description: Root Component.
              - Calling MainComponent.js                                     
                                           
===================================================================*/

import { BrowserRouter } from "react-router-dom";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
