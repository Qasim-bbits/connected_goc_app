import { Route } from 'react-router-dom';
import { CapacitorStripeProvider } from '@capacitor-community/stripe/dist/esm/react/provider';

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

import UserDetailsProvider from './context/GlobalStateProvider';

/* Screens */
import Signup from './pages/Auth/Signup/Signup.utils';
import Login from './pages/Auth/Login/Login.utils';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword.utils';
import ChangePassword from './pages/Auth/ChangePassword/ChangePassword.utils';
import Home from './pages/Home/Home.utils';
import SelectPlate from './pages/SelectPlate/SelectPlate.utils';
import SelectParkingRate from './pages/SelectParkingRate/SelectParkingRate.utils';
import SelectTariff from "./pages/SelectTariff/SelectTariff.utils";
import PurchaseReceipt from "./pages/PurchaseReceipt/PurchaseReceipt";
import History from "./pages/Auth/History/History.utils";
import HistoryReceipt from "./pages/Auth/HistoryReceipt/HistoryReceipt.utils";
import Stripe from "./pages/Stripe/Stripe.utils";

import Payment from "./pages/SelectTariff/Payment/PaymentForm.js";
setupIonicReact();



const App: React.FC = () => (
  //  <CapacitorStripeProvider
  //   publishableKey="pk_test_51JDF8yFMPgCzegFZyQVzPTBid8gLHHR1j67hjQM1sLSmbYBONnQ12xgq3Oz8DeRuezJYM1qds3IuQh7EZsw8r1wq00ms9dzlAA"
  //   // fallback={<p>Loading...</p>}
  // >
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <UserDetailsProvider>
          <Route path="/signup" component={Signup} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/home" component={Home} exact={true} />
          <Route path="/selectPlate" component={SelectPlate} exact={true} />
          <Route path="/selectParkingRate" component={SelectParkingRate} exact={true} />
          <Route path="/selectTariff" component={SelectTariff} exact={true} />
          <Route path="/forgotPassword" component={ForgotPassword} exact={true} />
          <Route path="/purchaseReceipt" component={PurchaseReceipt} exact={true} />
          <Route path="/changePassword" component={ChangePassword} exact={true} />
          <Route path="/history" component={History} exact={true} />
          <Route path="/historyReceipt" component={HistoryReceipt} exact={true} />
          <Route path="/stripePage" component={Stripe} exact={true} />


          <Route path="/" component={Payment} exact={true} />
        </UserDetailsProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  // </CapacitorStripeProvider>
);

export default App;
