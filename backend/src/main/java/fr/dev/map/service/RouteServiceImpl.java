package fr.dev.map.service;

import fr.dev.map.dto.RouteDto;
import fr.dev.map.enumeration.TransportModeEnum;
import fr.dev.map.repository.RouteRepository;
import org.springframework.stereotype.Service;

@Service
public class RouteServiceImpl implements RouteService {

    private final RouteRepository routeRepository;

    public RouteServiceImpl(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public RouteDto findRoute(double fromLat, double fromLon, double toLat, double toLon, TransportModeEnum mode) {
        Long sourceId = routeRepository.findNearestNode(fromLat, fromLon, mode);
        Long targetId = routeRepository.findNearestNode(toLat, toLon, mode);

        if (sourceId == null || targetId == null) {
            throw new IllegalStateException("Aucun nœud trouvé à proximité des coordonnées fournies");
        }
        if (sourceId.equals(targetId)) {
            throw new IllegalArgumentException("Le départ et l'arrivée correspondent au même nœud");
        }

        return routeRepository.findWay(sourceId, targetId, mode);
    }

}
