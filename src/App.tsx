import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

/* Screens */
import Signup from './pages/Auth/Signup/Signup.utils';
import Login from './pages/Auth/Login/Login.utils';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword.utils';
import Home from './pages/Functional/Home/Home.utils';
import SelectPlate from './pages/Functional/SelectPlate/SelectPlate.utils';
import SelectParkingRate from './pages/Functional/SelectParkingRate/SelectParkingRate.utils';
import SelectTariffUtils from "./pages/Functional/SelectTariff/SelectTariff.utils";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/signup" component={Signup} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/home" component={Home} exact={true} />
        <Route path="/selectPlate" component={SelectPlate} exact={true} />
        <Route path="/selectParkingRate" component={SelectParkingRate} exact={true} />
        <Route path="/selectTariff" component={SelectTariffUtils} exact={true} />
        <Route path="/forgetPassword" component={ForgotPassword} exact={true} />

        <Redirect from="/" to="/login" exact />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
