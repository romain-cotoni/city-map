package fr.dev.map.controller;

import fr.dev.map.dto.RouteDto;
import fr.dev.map.enumeration.TransportModeEnum;
import fr.dev.map.service.RouteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/route")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @GetMapping("/")
    public ResponseEntity<RouteDto> findRoute(@RequestParam double fromLat, @RequestParam double fromLon, @RequestParam double toLat, @RequestParam double toLon,@RequestParam TransportModeEnum mode) {
        RouteDto dto = this.routeService.findRoute(fromLat, fromLon, toLat, toLon, mode);
        return ResponseEntity.ok(dto);
    }

}
