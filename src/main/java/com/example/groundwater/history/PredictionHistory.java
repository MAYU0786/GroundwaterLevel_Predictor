package com.example.groundwater.history;

import java.time.LocalDateTime;

import com.example.groundwater.User.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "prediction_history")
public class PredictionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int predictionId;

    @ManyToOne
    @JoinColumn(name = "id" , nullable = false)
    private User user;

    private LocalDateTime  timestamp;
    private String location;
    private String prediction;
    private double rainfall;
    private double maxTemperature;
    private double minTemperature;
    private double morningHumidity;
    private double eveningHumidity;
    private double postMonsoon;
    private double preMonsoon;

    public PredictionHistory() {

    }

    public PredictionHistory(int predictionId, User user, String location, LocalDateTime timeStamp, String prediction,
                             double rainfall, double maxTemperature, double minTemperature, double morningHumidity,
                             double eveningHumidity, double postMonsoon, double preMonsoon) {
        super();
        this.predictionId = predictionId;
        this.user = user;
        this.location = location;
        this.timestamp = timeStamp;
        this.prediction = prediction;
        this.rainfall = rainfall;
        this.maxTemperature = maxTemperature;
        this.minTemperature = minTemperature;
        this.morningHumidity = morningHumidity;
        this.eveningHumidity = eveningHumidity;
        this.postMonsoon = postMonsoon;
        this.preMonsoon = preMonsoon;
    }

    public int getPredictionId() {
        return predictionId;
    }
    public void setPredictionId(int predictionId) {
        this.predictionId = predictionId;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    public String getPrediction() {
        return prediction;
    }
    public void setPrediction(String prediction) {
        this.prediction = prediction;
    }
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





}
