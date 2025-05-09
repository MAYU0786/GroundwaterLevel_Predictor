package com.example.groundwater.GWL_Predictor;

import java.io.IOException;
import java.util.List;

import com.example.groundwater.history.HistoryService;
import com.example.groundwater.history.PredictionHistory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ControllerGWL {

    private PredictionService predictionService;

    private HistoryService historyService;

    public ControllerGWL(PredictionService predictionService , HistoryService historyService) {
        super();
        this.predictionService = predictionService;
        this.historyService = historyService;
    }

    @PostMapping(value = "/gwl", consumes = "application/json")
    public String predictGWl(@RequestBody Input_Features features) throws IOException , InterruptedException{
        String prediction = predictionService.predictGWL(features);
        historyService.AddHistory(features, prediction);
        return prediction;
    }

    @GetMapping("/history/{userId}")
    public List<PredictionHistory> history(@PathVariable int userId) throws Exception{
        return historyService.PredictionHistory((long) userId);
    }
}

