package fr.dev.map.controller;

import fr.dev.map.dto.PoiDto;
import fr.dev.map.service.PointOfInterestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/poi")
public class PointOfInterestController {

    private final PointOfInterestService pointOfInterestService;

    public PointOfInterestController(PointOfInterestService pointOfInterestService) {
        this.pointOfInterestService = pointOfInterestService;
    }

    @GetMapping("/search")
    public List<PoiDto> search(@RequestParam("q") String query) {
        return pointOfInterestService.search(query);
    }

    @PostMapping("/add")
    public boolean search(@RequestBody PoiDto poi) {
        return pointOfInterestService.add(poi);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable Long id) {
        return pointOfInterestService.delete(id);
    }
}
