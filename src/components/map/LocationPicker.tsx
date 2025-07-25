import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

interface LocationPickerProps {
  onLocationChange: (latlng: string) => void;
  initialPosition?: [number, number];
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationChange, initialPosition }) => {
  const [position, setPosition] = useState<[number, number] | null>(initialPosition || null);

  useMapEvents({
    click(e: LeafletMouseEvent) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onLocationChange(`${e.latlng.lat},${e.latlng.lng}`); // 緯度,経度を文字列で送る
    },
  });

  return position === null ? null : <Marker position={position} />;
};

export default LocationPicker;