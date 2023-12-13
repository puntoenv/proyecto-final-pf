import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

/* PARA UTILIZAR ESTE COMPONENTE SOLO TIENEN QUE IMPORTARLO EN DONDE QUIERAN
Y PASARLE POR PROPS (coords={{lat:43.123, lng: -76.3839}}) Y LISTO
---------------------------------------------
POR EJEMPLO, SI LO VAN A UTILIZAR PARA EL DETALLE DE LA MASCOTA SOLO TIENEN QUE PASARLE LA PROPIEDAD LOCATION 
DE LA MASCOTA 
***********************************************
SI ES PARA EL ENVIO DEL PRODUCTO DE UN USUARIO DONDE NECESITAN GUARDAR LA INFO DE LA UBICACION
QUE EL USUARIO ELIJE SOLO DEBEN PASARLE POR PROPS (setLocationPet={props.setLocationPet}) EL 
METODO QUE SETEA SU ESTADO O PROPIEDAD, MAS ABAJO ESTA SEÑALADO DONDE Y COMO SE UTILIZA EL METODO
QUE LE PASAMOS PARA SETEAR PARA QUE TENGAN UNA IDEA DE COMO FUNCIONA ;) */

export default function Maps(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAefJK2BxtwD4TJT3JP-QG8Ej4YMhRTM-4",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Map
      setLocationPet={props.setLocationPet}
      COORDS={props.coords}
      search={props.search}
      setInput={props.setInput}
      input={props.input}
    />
  );
}
function Map({ setLocationPet, COORDS, setInput, input, search }) {
  const [center, setCenter] = useState({});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    selected && setLocationPet(selected); //********METODO QUE SETEA******* */
    if (COORDS) {
      console.log(COORDS);
      setCenter({ lat: COORDS.lat, lng: COORDS.lng });
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Not Available Google maps");
    }
  }, [selected]);

  return (
    <>
      {search && (
        <div className="places-container">
          <PlacesAutocomplete
            setSelected={setSelected}
            setInput={setInput}
            input={input}
          />
        </div>
      )}

      <GoogleMap
        zoom={13}
        center={selected || center}
        mapContainerClassName="map-container"
      >
        {(selected && <Marker position={selected} />) ||
          (center && <Marker position={center} />)}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected, setInput, input }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handlerSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    if (input) {
      if (input.directions.length < 3) {
        if (!input.directions.includes(address)) {
          setInput({
            ...input,
            directions: [...input.directions, address],
          });
        } else {
          setInput({
            ...input,
            directions: [...input.directions],
          });
        }
      }
    } else {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    }
  };

  return (
    <Combobox onSelect={handlerSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Ingresa la ubicacion de la mascota"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
