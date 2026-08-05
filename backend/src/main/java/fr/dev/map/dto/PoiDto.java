package fr.dev.map.dto;

import fr.dev.map.entity.PointOfInterest;

public record PoiDto(Long id, double lat, double lon, String label, String description) {

    public static PoiDto from(PointOfInterest pointOfInterest) {
        return new PoiDto(
                pointOfInterest.getId(),
                pointOfInterest.getCoordinates().getY(),
                pointOfInterest.getCoordinates().getX(),
                pointOfInterest.getLabel(),
                pointOfInterest.getDescription()
                );
    }

}
