package com.example.groundwater.history;


import java.time.LocalDateTime;
import java.util.List;

import com.example.groundwater.GWL_Predictor.Input_Features;
import com.example.groundwater.User.User;
import com.example.groundwater.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
public class HistoryService {
    private UserRepository userRepo;
    private PredictionHistoryRepo historyRepo;

    public HistoryService(UserRepository userRepo, PredictionHistoryRepo historyRepo) {
        super();
        this.userRepo = userRepo;
        this.historyRepo = historyRepo;
    }

    public void AddHistory(Input_Features features , String prediction) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(user == null){
            throw new RuntimeException("Invalid user");
        }
        LocalDateTime now = LocalDateTime.now();

        PredictionHistory history = new PredictionHistory();
        history.setEveningHumidity(features.getEveningHumidity());
        history.setMorningHumidity(features.getMorningHumidity());
        history.setMaxTemperature(features.getMaxTemperature());
        history.setMinTemperature(features.getMinTemperature());
        history.setPreMonsoon(features.getPreMonsoon());
        history.setPostMonsoon(features.getPostMonsoon());
        history.setRainfall(features.getRainfall());
        history.setLocation(features.getLocation());
        history.setPrediction(prediction);
        history.setTimestamp(now);
        history.setUser(user);

        historyRepo.save(history);
    }

    public List<PredictionHistory> PredictionHistory(Long userId) throws Exception{
        User user = userRepo.findById( userId).orElse(null);
        if(user == null) {
            throw new RuntimeException("User not found");
        }
        List<PredictionHistory> history = historyRepo.findByUser_UserId(Math.toIntExact(userId));
        return history;
    }

}
