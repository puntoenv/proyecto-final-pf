import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Maps(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAefJK2BxtwD4TJT3JP-QG8Ej4YMhRTM-4",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map lat={props.lat} lng={props.lng} />;
}

function Map(lat, lng) {
  return (
    <GoogleMap
      zoom={10}
      center={{ lat, lng }}
      mapContainerClassName="map-container"
    ></GoogleMap>
  );
}
