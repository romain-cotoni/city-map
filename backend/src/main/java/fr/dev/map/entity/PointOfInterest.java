package fr.dev.map.entity;

import jakarta.persistence.*;
import org.locationtech.jts.geom.Point;

@Entity
@Table(name = "coordinates")
public class PointOfInterest {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "coordinates_seq")
    @SequenceGenerator(name = "coordinates_seq", sequenceName = "coordinates_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "coordinates", columnDefinition = "geometry(Point,4326)", nullable = false)
    private Point coordinates;

    @Column(name = "label", nullable = false)
    private String label;

    @Column(name = "description", length = 500)
    private String description;

    protected PointOfInterest() {
        // requis par JPA
    }

    public PointOfInterest(Point coordinates) {
        this.coordinates = coordinates;
    }

    public Long getId() {
        return id;
    }

    public Point getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(Point coordinates) {
        this.coordinates = coordinates;
    }

    public String getLabel() {
        return label;
    }

    public String getDescription() {
        return description;
    }

    public void setLabel(String label) { this.label = label; }

    public void setDescription(String description) { this.description = description; }



}
