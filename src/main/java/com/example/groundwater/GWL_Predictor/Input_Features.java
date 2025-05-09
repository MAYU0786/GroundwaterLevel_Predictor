package com.example.groundwater.GWL_Predictor;

public class Input_Features {
    private double rainfall;
    private double maxTemperature;
    private double minTemperature;
    private double morningHumidity;
    private double eveningHumidity;
    private double postMonsoon;
    private double preMonsoon;
    private String location;



    public Input_Features(double rainfall, double maxTemperature, double minTemperature, double morningHumidity,
                          double eveningHumidity, double postMonsoon, double preMonsoon, String location) {
        super();
        this.rainfall = rainfall;
        this.maxTemperature = maxTemperature;
        this.minTemperature = minTemperature;
        this.morningHumidity = morningHumidity;
        this.eveningHumidity = eveningHumidity;
        this.postMonsoon = postMonsoon;
        this.preMonsoon = preMonsoon;
        this.location = location;
    }

    // Getters and setters
    public double getRainfall() {
        return rainfall;
    }

    public void setRainfall(double rainfall) {
        this.rainfall = rainfall;
    }

    public double getMaxTemperature() {
        return maxTemperature;
    }

    public void setMaxTemperature(double maxTemperature) {
        this.maxTemperature = maxTemperature;
    }

    public double getMinTemperature() {
        return minTemperature;
    }

    public void setMinTemperature(double minTemperature) {
        this.minTemperature = minTemperature;
    }

    public double getMorningHumidity() {
        return morningHumidity;
    }

    public void setMorningHumidity(double morningHumidity) {
        this.morningHumidity = morningHumidity;
    }

    public double getEveningHumidity() {
        return eveningHumidity;
    }

    public void setEveningHumidity(double eveningHumidity) {
        this.eveningHumidity = eveningHumidity;
    }

    public double getPostMonsoon() {
        return postMonsoon;
    }

    public void setPostMonsoon(double postMonsoon) {
        this.postMonsoon = postMonsoon;
    }

    public double getPreMonsoon() {
        return preMonsoon;
    }

    public void setPreMonsoon(double preMonsoon) {
        this.preMonsoon = preMonsoon;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
