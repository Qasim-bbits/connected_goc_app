import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, images, } from 'ionicons/icons';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Screens */
import Signup from './pages/Auth/Signup/Signup.utils';
import Login from './pages/Auth/Login/Login.utils';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword.utils';
import Home from './pages/Functional/Home/Home.utils';
import SelectPlate from './pages/Functional/SelectPlate/SelectPlate.utils';
import SelectParkingRate from './pages/Functional/SelectParkingRate/SelectParkingRate.utils';
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
            {/* <SelectPlate/> */}

    <IonReactRouter>

        <IonRouterOutlet>
          
                    <Route path="/home" component={Home} exact={true} />
                    <Route path="/selectPlate" component={SelectPlate} exact={true} />
                    <Route path="/selectParkingRate" component={SelectParkingRate} exact={true} />


                    <Redirect from="/" to="/home" exact />

        </IonRouterOutlet>
       
     
    </IonReactRouter>
  </IonApp>
);

export default App;
