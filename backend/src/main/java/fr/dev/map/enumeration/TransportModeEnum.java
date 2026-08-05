package fr.dev.map.enumeration;

public enum TransportModeEnum {
    CAR("cost_car", "reverse_cost_car"),
    BIKE("cost_bike", "reverse_cost_bike"),
    BIKE_CYCLE_PATH("cost_bike_path", "reverse_cost_bike_path"),
    FOOT("cost_foot", "reverse_cost_foot");

    private final String costColumn;
    private final String reverseCostColumn;

    TransportModeEnum(String costColumn, String reverseCostColumn) {
        this.costColumn = costColumn;
        this.reverseCostColumn = reverseCostColumn;
    }

    public String costColumn() { return costColumn; }
    public String reverseCostColumn() { return reverseCostColumn; }
}
