package main

import (
	"chrishayes042/pkg/model"
	"encoding/csv"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
)

// Main read method. This will get all of the data in the csv file
// and convert it to a JSON to be returned and picked up by the front end
func readCsvFile(w http.ResponseWriter, r *http.Request) {
	// open the csv
	f, err := os.Open("./data/tornados.csv")
	if err != nil {
		log.Fatal("Unable to read input file ", err)
	}
	defer f.Close()
	// read the csv
	csvReader := csv.NewReader(f)
	// put the data into a variable to be looped through
	records, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal("Unable to parse file as CSV for ", err)
	}
	// create a new type of array to create the JSON
	var tornados []model.TornadoData
	// loop through the csv data

	for _, line := range records {
		a := model.TornadoData{
			Id:                line[0],
			Year:              line[1],
			Month:             line[2],
			Day:               line[3],
			Date:              line[4],
			Time:              line[5],
			TimeZone:          line[6],
			DateTime:          line[7],
			State:             line[8],
			StateFip:          line[9],
			Magnitude:         line[10],
			Injuries:          line[11],
			Fatalities:        line[12],
			PropertyLoss:      line[13],
			StartingLongitude: line[14],
			StartingLatitude:  line[15],
			EndingLongitude:   line[16],
			EndingLatitude:    line[17],
			Length:            line[18],
			Width:             line[19],
			StatesAff:         line[20],
			StatesNumber:      line[21],
			FipsCdCounty1:     line[22],
			FipsCdCounty2:     line[23],
			FipsCdCounty3:     line[24],
			FipsCdCounty4:     line[25],
			MagnitudeEst:      line[26],
		}

		// append each loop of data to the types array
		tornados = append(tornados, a)

	}
	// CORS things
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	// create the json
	json.NewEncoder(w).Encode(tornados)
}
func getDecadeData(w http.ResponseWriter, r *http.Request) {
	// open the csv
	f, err := os.Open("decades.csv")
	if err != nil {
		log.Fatal("Unable to read input file ", err)
	}
	defer f.Close()
	// read the csv
	csvReader := csv.NewReader(f)
	// put the data into a variable to be looped through
	records, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal("Unable to parse file as CSV for ", err)
	}
	var decadeData []model.TornadoDecade
	for _, line := range records {
		a := model.TornadoDecade{
			Decade:       line[0],
			Fatalities:   line[1],
			Injuries:     line[2],
			PropertyLoss: line[3],
			AvgMagnitude: line[4],
		}
		decadeData = append(decadeData, a)
	}
	// CORS things
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	// create the json
	json.NewEncoder(w).Encode(decadeData)
}

func readStateData(w http.ResponseWriter, r *http.Request) {

	param1 := r.URL.Query().Get("state")

	if param1 != "" {
		f, err := os.Open("./data/stateData/" + param1 + ".csv")
		if err != nil {
			log.Fatal("Unable to open file")
		}
		csvReader := csv.NewReader(f)
		records, err := csvReader.ReadAll()
		if err != nil {
			log.Fatal("Unable to parse file")
		}
		var tornados []model.TornadoData
		// loop through the csv data
		// m := make(map[string][]model.TornadoData)
		for _, line := range records {
			a := model.TornadoData{
				Id:                line[0],
				Year:              line[1],
				Month:             line[2],
				Day:               line[3],
				Date:              line[4],
				Time:              line[5],
				TimeZone:          line[6],
				DateTime:          line[7],
				State:             line[8],
				StateFip:          line[9],
				Magnitude:         line[10],
				Injuries:          line[11],
				Fatalities:        line[12],
				PropertyLoss:      line[13],
				StartingLongitude: line[14],
				StartingLatitude:  line[15],
				EndingLongitude:   line[16],
				EndingLatitude:    line[17],
				Length:            line[18],
				Width:             line[19],
				StatesAff:         line[20],
				StatesNumber:      line[21],
				FipsCdCounty1:     line[22],
				FipsCdCounty2:     line[23],
				FipsCdCounty3:     line[24],
				FipsCdCounty4:     line[25],
				MagnitudeEst:      line[26],
			}

			// append each loop of data to the types array
			tornados = append(tornados, a)

		}

		// CORS things
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		// create the json
		json.NewEncoder(w).Encode(tornados)
	}
}
func main() {
	// create the http server
	mux := http.NewServeMux()
	// create the endpoint to hit to get the csv data
	mux.HandleFunc("/api/readAllData", readCsvFile)
	mux.HandleFunc("/api/getDecadeData", getDecadeData)
	mux.HandleFunc("/api/getStateData", readStateData)
	// mux.HandleFunc("/api/hello", getHello)
	// create the listener on port
	err := http.ListenAndServe(":3333", mux)
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("Server closed\n")

	} else if err != nil {
		fmt.Printf("error starting server :%s\n", err)
		os.Exit(1)
	}
}
