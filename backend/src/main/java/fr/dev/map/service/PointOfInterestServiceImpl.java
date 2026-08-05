package fr.dev.map.service;

import fr.dev.map.dto.PoiDto;
import fr.dev.map.entity.PointOfInterest;
import fr.dev.map.repository.PointOfInterestRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PointOfInterestServiceImpl implements PointOfInterestService {

    private final PointOfInterestRepository pointOfInterestRepository;

    public PointOfInterestServiceImpl(PointOfInterestRepository pointOfInterestRepository) {
        this.pointOfInterestRepository = pointOfInterestRepository;
    }

    @Override
    public List<PoiDto> search(String query) {
        if (query == null || query.isBlank()) {
            return List.of();
        }
        return pointOfInterestRepository.findByLabelContainingIgnoreCase(query).stream()
                .map(PoiDto::from)
                .toList();
    }

    @Override
    public boolean add(PoiDto poi) {
        try {
            // Création de l'entité à partir du DTO
            GeometryFactory geometryFactory = new GeometryFactory();
            PointOfInterest pointOfInterest = new PointOfInterest(geometryFactory.createPoint(new Coordinate(poi.lon(), poi.lat()))
            );

            pointOfInterest.setLabel(poi.label());
            pointOfInterest.setDescription(poi.description());

            pointOfInterestRepository.save(pointOfInterest);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean delete(Long id) {
        if (!pointOfInterestRepository.existsById(id)) {
            return false;
        }
        pointOfInterestRepository.deleteById(id);
        return true;
    }

}
