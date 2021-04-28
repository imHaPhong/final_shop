import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Header from "./Header";
import {getNearRestaurant} from '../../middlerware/userMiddlerware'
import { connect } from "react-redux";

const GetNearRestaurant = ({getNearRestaurant}) => {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const [listRestaurant, setListRestaurant] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const data = await getNearRestaurant( {lnt: position.coords.latitude, long: position.coords.longitude});
      setListRestaurant(data);
      console.log(listRestaurant);
    });
  },[])

  const K_WIDTH = 50;
  const K_HEIGHT = 50;

  const greatPlaceStyle = {
    position: "",
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,
  };

  const MyGreatPlace = ({ text }) => {
    return (
      <div style={{ width: "30wh", height: "70vh", position: "relative" }}>
      {/* <div style={{fontSize: "10rem", color: "red", position:"fixed", top:"0"}}>
         Back to 
       </div> */}
        <div style={greatPlaceStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            width="80%"
            height="80%"
            src="https://www.freepngimg.com/download/map/82037-map-google-maps-line-maker-red.png"
            alt=""
            srcset=""
          />
        </div>
      </div>
     </div>
    );
  };

  const UserLocation = ({ text }) => {
    return (
      <div style={greatPlaceStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            width="70%"
            height="70%"
            src="https://cdn.iconscout.com/icon/free/png-256/restaurant-1495593-1267764.png"
            alt=""
            srcset=""
          />
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAxR3LHnfydboky_mz3-mJwDCQbWCX5fdE" }}
        defaultCenter={{ lat: 21.126393099999998, lng: 105.88355039999999 }}
        yesIWantToUseGoogleMapApiInternals={true}
        defaultZoom={16}
      >
        <MyGreatPlace
          lat={21.126393099999998}
          lng={105.88355039999999}
          text={"A"} /* Kreyser Avrora */
        />
        {listRestaurant.length > 0 && listRestaurant.map(el => {
            return <UserLocation
            lat={el.location[0]}
            lng={el.location[1]}
            text={"A"} 
          />
        })}
      
      </GoogleMapReact>
    </div>
  );
};

export default connect(null, {getNearRestaurant})(GetNearRestaurant);

// import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
// import { Component } from "react";

// export class GetNearRestaurant extends Component {
//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         zoom={14}
//         initialCenter={{
//           lat: 21.126393099999998,
//           lng: 105.88355039999999,
//         }}
//       >
//         <Marker
//           position={{ lat: 21.12914891142176, lng: 105.87915076098241 }}
//           title={"The marker`s title will appear as a tooltip."}
//           name={"Current location"}
//         />
//         <Marker
//           position={{ lat: 21.22914891142176, lng: 105.87915076098241 }}
//           title={"The marker`s title will appear as a tooltip."}
//           name={"Current location"}
//         />
//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAxR3LHnfydboky_mz3-mJwDCQbWCX5fdE",
// })(GetNearRestaurant);
