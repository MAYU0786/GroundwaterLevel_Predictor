package com.example.groundwater.GWL_Predictor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;

import org.springframework.stereotype.Service;

@Service
public class PredictionService {

    static HashMap<Integer, String> map = new HashMap<>();

    static {
        map.put(1, "0 to 2");
        map.put(2, "2 to 5");
        map.put(3, "5 to 10");
        map.put(4, "10 to 20");
        map.put(5 , "20 to 40");
        map.put(6, ">40");
    }

    public String predictGWL(Input_Features features) throws IOException, InterruptedException{
        String rainfall = String.valueOf(features.getRainfall());
        String maxTemperature = String.valueOf(features.getMaxTemperature());
        String minTemperature = String.valueOf(features.getMinTemperature());
        String morningHumidity = String.valueOf(features.getMorningHumidity());
        String eveningHumidity = String.valueOf(features.getEveningHumidity());
        String postMonsoon = String.valueOf(features.getPostMonsoon());
        String preMonsoon = String.valueOf(features.getPreMonsoon());

        ProcessBuilder pb = new ProcessBuilder("python",
                "E:\\GWL Project\\Model\\Maharastra_Predict.py",
                rainfall, maxTemperature, minTemperature, morningHumidity, eveningHumidity,postMonsoon, preMonsoon);

        Process process = pb.start();

        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line;
        StringBuilder output = new StringBuilder();

        while((line = reader.readLine()) != null) {
            output.append(line);
        }
        process.waitFor();

        if(output.toString().trim().isEmpty()) {
            throw new RuntimeException("Empty output from python script");
        }
        System.out.println(output);

        int res = Integer.parseInt(output.toString().trim());


        return map.get(res);

    }


}
