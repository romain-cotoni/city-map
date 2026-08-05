export const TRANSPORT_MODES = [
  { value: 'CAR'            , label: 'Voiture'                 , color: '#e76f51' },
  { value: 'BIKE'           , label: 'Vélo'                    , color: '#2a9d8f' },
  { value: 'BIKE_CYCLE_PATH', label: 'Vélo (pistes cyclables)' , color: '#0c4b3d' },
  { value: 'FOOT'           , label: 'À pied'                  , color: '#76066b' },
] as const;


export type TransportMode = typeof TRANSPORT_MODES[number]['value']; // 'CAR' | 'BIKE' | 'BIKE_CYCLE_PATH' | 'FOOT'