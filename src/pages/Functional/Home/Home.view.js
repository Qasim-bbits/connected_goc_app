import React, { Fragment} from 'react';

import '../../../assets/styles/home.css';


// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { IonSearchbar, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonMenuButton, IonButtons, IonMenuToggle, IonPage, IonButton, IonModal, IonLabel,IonInput, IonIcon,IonRow, IonGrid, IonCol, IonFooter,IonCard,IonCardContent,IonCardSubtitle,IonCardHeader,IonCardTitle} from '@ionic/react';

// import { OverlayEventDetail } from '@ionic/core/components';


import Map from '../../../components/map';
import plates from '../../../components/plates';


// const theme = createTheme();
const themeLight = createTheme({
  palette: {
    background: {
      default: "#ffffff"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

export default function Home(props) {

  const [centerProp,setCenterProp] = React.useState(null);
  // const activeSearchRef = React.useRef(null);

  const [cities, setCities] = React.useState([
    {id: 1, name: 'Ottawa', polygon:[
      {lat: 45.415421753842104, lng: -76.35184636553302},
      {lat: 44.95758775225658, lng: -75.82429385901366},
      {lat: 45.241046984450755, lng: -75.11170427931212},
      {lat: 45.759814362346, lng: -75.49752626169197},
      {lat: 45.415421753842104, lng: -76.35184636553302},
    ]},
    {id: 1, name: 'Toronto', polygon:[
      {lat: 45.415421753842104, lng: -76.35184636553302},
      {lat: 44.95758775225658, lng: -75.82429385901366},
      {lat: 45.241046984450755, lng: -75.11170427931212},
      {lat: 45.759814362346, lng: -75.49752626169197},
      {lat: 45.415421753842104, lng: -76.35184636553302},
    ]},
  ]);

  const [zones, setZones] = React.useState([
    {id: 1, name: 'zone1', polygon:[
      {lat: 45.415421753842104, lng: -76.35184636553302},
      {lat: 44.95758775225658, lng: -75.82429385901366},
      {lat: 45.241046984450755, lng: -75.11170427931212},
      {lat: 45.759814362346, lng: -75.49752626169197},
      {lat: 45.415421753842104, lng: -76.35184636553302},
    ]},
    {id: 1, name: 'zone2', polygon:[
      {lat: 45.415421753842104, lng: -76.35184636553302},
      {lat: 44.95758775225658, lng: -75.82429385901366},
      {lat: 45.241046984450755, lng: -75.11170427931212},
      {lat: 45.759814362346, lng: -75.49752626169197},
      {lat: 45.415421753842104, lng: -76.35184636553302},
    ]},
  ]);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredSearch, setFilteredSearch] = React.useState([
  {
    id: "",
    name: "",
    polygon: [],
    
  }]);
  // const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    let tempSearchResult = cities.filter(ele => ele.name.includes(searchQuery));
    setFilteredSearch([...tempSearchResult]);
},[searchQuery,cities])

  
  return (

    <IonPage>
          <ThemeProvider theme={themeLight}>
   
            <IonHeader >
                <IonToolbar text-center class="ion-text-center new-background-color" >
                  <IonButtons slot="end" >
                    <IonMenuButton ></IonMenuButton>
                  </IonButtons>
                  <IonTitle id='title'></IonTitle>
                </IonToolbar>
                <IonToolbar>
                          <IonSearchbar placeholder='Search' value={searchQuery} onIonChange={e => setSearchQuery(e.detail.value) }>
                            
                          </IonSearchbar>
                        </IonToolbar>
              </IonHeader>
              

            <IonContent>

                  <IonMenu side="end" menuId="first" swipeGesture='true' contentId='menuContent' >
                      <IonHeader>
                        <IonToolbar color="primary">

                          <img src={require('../../../assets/logo/goc_logo.svg').default} width='70%' height='70%' alt='error'></img>
                          {/* <IonTitle>GOC Logo</IonTitle> */}

                        </IonToolbar>
                        
                      </IonHeader>
                      <IonContent>
                        <IonList>
                          <IonItem>Pay for Parking</IonItem>
                          <IonItem>Pay for Infraction</IonItem>
                          <IonItem>History</IonItem>
                        </IonList>
                      </IonContent>
                      <IonRouterOutlet></IonRouterOutlet>
                    </IonMenu>

                    <IonRouterOutlet id='menuContent'></IonRouterOutlet>
                  

                  <IonGrid>
                      <IonRow>
                        {filteredSearch.map((search) => (
                          <IonCol
                            // size="12"
                            // size-xs="12"
                            // size-sm="6"
                            // size-md="4"
                            // size-lg="4"
                            key={search.id}
                          >
                            <IonCard  button onclick={console.log("hello")}> 
                              <IonCardHeader>
                                <IonCardTitle>City</IonCardTitle>
                                {/* <IonCardSubtitle>{cities.name}</IonCardSubtitle> */}
                              </IonCardHeader>
                                <IonCardContent>{search.name}</IonCardContent>

                              {/* <IonCardContent>{search.polygon.map(e => <div>{e.lat}</div>)}</IonCardContent> */}

                            </IonCard>
                          </IonCol>
                        ))}
                        
                      </IonRow>
                </IonGrid>

                                  
                    <Map center={centerProp}/>
                    {/* <Map center={cities[0].polygon[3]}/> */}
            
              </IonContent>

          
          </ThemeProvider>            

    </IonPage>

  );
}
