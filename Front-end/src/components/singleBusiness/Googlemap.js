import React from "react";
import GoogleMapReact from 'google-map-react';
import Card from 'react-bootstrap/Card';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Googlemap({ business }) {
  const defaultProps = {
    center: {
      lat: 32.085300,
      lng: 34.781769
    },
    zoom: 13
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }

  return (
    <>
      <div style={styles.container}>
        <div style={{ height: '50vh', width: '50%' }}>
          <Card body>
            City: {business.city}<br/>
            Address: {business.address}<br />
            Phone: {business.phone}

          </Card>;
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={32.085300}
              lng={34.781769}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
}