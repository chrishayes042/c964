package main

import (
	"chrishayes042/pkg/model"
	"chrishayes042/pkg/regression"
	"encoding/csv"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"strconv"
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

	if param1 != "ALL" {
		f, err := os.Open("./data/stateData/" + param1 + ".csv")
		if err != nil {
			fmt.Println("Unable to open file")
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
func readStateTotalsData(w http.ResponseWriter, r *http.Request) {

	param1 := r.URL.Query().Get("state")

	if param1 != "" {
		f, err := os.Open("./data/stateData/totals/" + param1 + "_Tot.csv")
		if err != nil {
			fmt.Print("Unable to open file")
		}
		csvReader := csv.NewReader(f)
		records, err := csvReader.ReadAll()
		if err != nil {
			fmt.Println("Unable to parse file")
		}
		// var tornados []model.TornadoStateTotals
		var b model.TornadoStateTotals
		// loop through the csv data
		// m := make(map[string][]model.TornadoData)
		for _, line := range records {
			a := model.TornadoStateTotals{
				Injuries:     line[0],
				Fatalities:   line[1],
				PropertyLoss: line[2],
			}

			// append each loop of data to the types array
			b = a

		}

		// CORS things
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		// create the json
		json.NewEncoder(w).Encode(b)
	}
}
func readStateDecadeTotals(w http.ResponseWriter, r *http.Request) {
	param1 := r.URL.Query().Get("state")
	if param1 != "" {
		f, err := os.Open("./data/stateData/decadeTotals/" + param1 + "_Decades.csv")
		if err != nil {
			fmt.Println("unable to open file")
		}
		csvReader := csv.NewReader(f)
		records, err := csvReader.ReadAll()
		if err != nil {
			fmt.Println("Unable to parse file")
		}

		var tList []model.StateDecadeTotals
		for _, line := range records {
			a := model.StateDecadeTotals{
				Decade:       line[0],
				AvgMagnitude: line[1],
				Injuries:     line[2],
				Fatalities:   line[3],
				PropertyLoss: line[4],
				Length:       line[5],
				Width:        line[6],
			}
			tList = append(tList, a)
		}

		// CORS things
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		// create the json
		json.NewEncoder(w).Encode(tList)
	}
}
func regressionMag(records [][]string) []float64 {
	var magList []float64
	r := new(regression.Regression)
	r.SetObserved("Avg Mag")

	r.SetVar(0, "Avg Len")
	r.SetVar(1, "Avg Wid")
	// var tList []string
	for _, line := range records {

		l := string(line[5])
		w := string(line[6])
		m := string(line[1])
		if l != "NA" && w != "NA" && m != "NA" {

			pl, err := strconv.ParseFloat(l, 64)
			if err != nil {
				fmt.Print("Unable to parse string" + err.Error())
			}

			wy, err := strconv.ParseFloat(w, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			am, err := strconv.ParseFloat(m, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			r.Train(
				regression.DataPoint(am, []float64{pl, wy}),
			)
		}
	}

	r.Run()
	// var propLosslist []float64
	list := r.Predictions()
	fmt.Println(r.String())
	magList = append(magList, list...)

	return magList
}
func regressionWidth(records [][]string) []float64 {
	var widList []float64
	r := new(regression.Regression)
	r.SetObserved("width")

	r.SetVar(0, "Avg Len")
	r.SetVar(1, "Avg Mag")
	// var tList []string
	for _, line := range records {

		l := string(line[5])
		w := string(line[6])
		m := string(line[1])
		if l != "NA" && w != "NA" && m != "NA" {

			pl, err := strconv.ParseFloat(l, 64)
			if err != nil {
				fmt.Print("Unable to parse string" + err.Error())
			}

			wy, err := strconv.ParseFloat(w, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			am, err := strconv.ParseFloat(m, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			r.Train(
				regression.DataPoint(wy, []float64{pl, am}),
			)
		}
	}

	r.Run()
	// var propLosslist []float64
	list := r.Predictions()
	fmt.Println(r.String())
	widList = append(widList, list...)

	return widList
}
func regressionLength(records [][]string) []float64 {
	var lenList []float64
	r := new(regression.Regression)
	r.SetObserved("Length")

	r.SetVar(0, "Avg Wid")
	r.SetVar(1, "Avg Mag")
	// var tList []string
	for _, line := range records {

		l := string(line[5])
		w := string(line[6])
		m := string(line[1])
		if l != "NA" && w != "NA" && m != "NA" {

			pl, err := strconv.ParseFloat(l, 64)
			if err != nil {
				fmt.Print("Unable to parse string" + err.Error())
			}

			wy, err := strconv.ParseFloat(w, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			am, err := strconv.ParseFloat(m, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			r.Train(
				regression.DataPoint(pl, []float64{wy, am}),
			)
		}
	}

	r.Run()
	// var propLosslist []float64
	list := r.Predictions()
	fmt.Println(r.String())
	lenList = append(lenList, list...)

	return lenList
}
func regressionFatalities(records [][]string) []float64 {
	var fatalList []float64
	r := new(regression.Regression)
	r.SetObserved("Fatalities")

	r.SetVar(0, "Avg Len")
	r.SetVar(1, "Avg Wid")
	r.SetVar(2, "Avg Mag")
	// var tList []string
	for _, line := range records {
		p := string(line[3])
		l := string(line[5])
		w := string(line[6])
		m := string(line[1])
		if p != "NA" && l != "NA" && w != "NA" && m != "NA" {

			pl, err := strconv.ParseFloat(p, 64)
			if err != nil {
				fmt.Print("Unable to parse string" + err.Error())
			}
			lm, err := strconv.ParseFloat(l, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			wy, err := strconv.ParseFloat(w, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			am, err := strconv.ParseFloat(m, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			r.Train(
				regression.DataPoint(pl, []float64{lm, wy, am}),
			)
		}
	}

	r.Run()
	// var propLosslist []float64
	list := r.Predictions()
	fmt.Println(r.String())
	fatalList = append(fatalList, list...)

	return fatalList
}
func regressionInjuries(records [][]string) []float64 {
	var injuryList []float64
	r := new(regression.Regression)
	r.SetObserved("Injuries")

	r.SetVar(0, "Avg Len")
	r.SetVar(1, "Avg Wid")
	r.SetVar(2, "Avg Mag")
	// var tList []string
	for _, line := range records {
		p := string(line[2])
		l := string(line[5])
		w := string(line[6])
		m := string(line[1])
		if p != "NA" && l != "NA" && w != "NA" && m != "NA" {

			pl, err := strconv.ParseFloat(p, 64)
			if err != nil {
				fmt.Print("Unable to parse string" + err.Error())
			}
			lm, err := strconv.ParseFloat(l, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			wy, err := strconv.ParseFloat(w, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			am, err := strconv.ParseFloat(m, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			r.Train(
				regression.DataPoint(pl, []float64{lm, wy, am}),
			)
		}
	}

	r.Run()
	// var propLosslist []float64
	list := r.Predictions()
	fmt.Println(r.String())
	injuryList = append(injuryList, list...)

	return injuryList
}
func regressionsPropLoss(records [][]string) []float64 {
	var propLossList []float64

	r := new(regression.Regression)
	r.SetObserved("Property Loss")

	r.SetVar(0, "Avg Len")
	r.SetVar(1, "Avg Wid")
	r.SetVar(2, "Avg Mag")
	// var tList []string
	for _, line := range records {
		p := string(line[4])
		l := string(line[5])
		w := string(line[6])
		m := string(line[1])
		if p != "NA" && l != "NA" && w != "NA" && m != "NA" {

			pl, err := strconv.ParseFloat(p, 64)
			if err != nil {
				fmt.Print("Unable to parse string" + err.Error())
			}
			lm, err := strconv.ParseFloat(l, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			wy, err := strconv.ParseFloat(w, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			am, err := strconv.ParseFloat(m, 64)
			if err != nil {
				fmt.Print("Unable to parse string")
			}
			r.Train(
				regression.DataPoint(pl, []float64{lm, wy, am}),
			)
		}
	}

	r.Run()
	fmt.Print(r.String())
	// var propLosslist []float64
	list := r.Predictions()
	// fmt.Println(r.GetPredictData())
	propLossList = append(propLossList, list...)

	return propLossList
}
func getAllRegression(w http.ResponseWriter, r *http.Request) {
	param1 := r.URL.Query().Get("state")
	if param1 != "" {
		f, err := os.Open("./data/stateData/decadeTotals/" + param1 + "_Decades.csv")
		if err != nil {
			fmt.Println("unable to open file")
		}
		csvReader := csv.NewReader(f)
		records, err := csvReader.ReadAll()
		if err != nil {
			fmt.Println("Unable to parse file")
		}
		injList := regressionInjuries(records)
		magList := regressionMag(records)
		fatalList := regressionFatalities(records)
		lenList := regressionLength(records)
		widList := regressionWidth(records)
		propLossList := regressionsPropLoss(records)
		var yearList = [12]string{"2030", "2040", "2050", "2060", "2070", "2080", "2090", "3000", "3010", "3020", "3040", "3050"}
		var predicions []model.Predictions
		for i := 0; i < len(lenList); i++ {
			b := model.Predictions{
				Decade:     yearList[i],
				Length:     lenList[i],
				Width:      widList[i],
				AvgMag:     magList[i],
				PropLoss:   math.Ceil(propLossList[i]),
				Fatalities: math.Ceil(fatalList[i]),
				Injuries:   math.Ceil(injList[i]),
			}

			predicions = append(predicions, b)
		}

		// CORS things
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		// create the json
		json.NewEncoder(w).Encode(predicions)
	}
}

func main() {
	// create the http server
	// Test()
	mux := http.NewServeMux()
	// create the endpoint to hit to get the csv data
	mux.HandleFunc("/api/readAllData", readCsvFile)
	mux.HandleFunc("/api/getDecadeData", getDecadeData)
	mux.HandleFunc("/api/getStateData", readStateData)
	mux.HandleFunc("/api/getStateTotals", readStateTotalsData)
	mux.HandleFunc("/api/getStateDecadeTotals", readStateDecadeTotals)
	mux.HandleFunc("/api/getPredictionTotals", getAllRegression)
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
