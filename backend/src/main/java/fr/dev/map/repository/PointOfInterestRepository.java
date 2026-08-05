package fr.dev.map.repository;

import fr.dev.map.entity.PointOfInterest;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointOfInterestRepository extends JpaRepository<PointOfInterest, Long> {

    List<PointOfInterest> findByLabelContainingIgnoreCase(String label);
}
