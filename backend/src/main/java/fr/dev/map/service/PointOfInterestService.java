package fr.dev.map.service;

import fr.dev.map.dto.PoiDto;

import java.util.List;

public interface PointOfInterestService {

    List<PoiDto> search(String query);

    boolean add(PoiDto poi);

    boolean delete(Long id);
}
