package fr.dev.map.service;

import fr.dev.map.dto.RouteDto;
import fr.dev.map.enumeration.TransportModeEnum;

public interface RouteService {

    RouteDto findRoute(double fromLat, double fromLon, double toLat, double toLon, TransportModeEnum mode);

}
