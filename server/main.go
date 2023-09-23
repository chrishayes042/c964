package main

import (
	"encoding/csv"
	"encoding/json"
	// "encoding/json"
	"chrishayes042/pkg/model"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
)

func readCsvFile(w http.ResponseWriter, r *http.Request) {
	f, err := os.Open("tornados.csv")
	if err != nil {
		log.Fatal("Unable to read input file ", err)
	}
	defer f.Close()

	csvReader := csv.NewReader(f)
	records, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal("Unable to parse file as CSV for ", err)
	}

	// tData := mapRecords(records)
	// tornado := model.TornadoData
	var tornados []model.TornadoData
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
		tornados = append(tornados, a)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(tornados)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/singleDayStock", readCsvFile)
	// mux.HandleFunc("/api/hello", getHello)

	err := http.ListenAndServe(":3333", mux)
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("Server closed\n")

	} else if err != nil {
		fmt.Printf("error starting server :%s\n", err)
		os.Exit(1)
	}
}

// func mapRecords(records [][]string) model.TornadoData {
// 	tornado := new(model.TornadoData)

// 	for _, line := range records {
// 			tornado.Id =  line[0],
// 			tornado.Year ==              line[1],
// 			tornado.Month ==            line[2],
// 			tornado.Day ==               line[3],
// 			tornado.Date ==               line[4],
// 			tornado.Time ==              line[5],
// 			tornado.TimeZone ==          line[6],
// 			tornado.State ==             line[7],
// 			tornado.StateFip ==          line[8],
// 			tornado.Magnitude ==        line[9],
// 			tornado.Injuries==          line[10],
// 			tornado.Fatalities ==        line[11],
// 			tornado.PropertyLoss ==      line[12],
// 			tornadoStartingLongitude == line[13],
// 			tornado.StartingLatitude ==  line[14],
// 			tornado.EndingLongitude ==   line[15],
// 			tornado.EndingLatitude ==    line[16],
// 			tornado.Length ==            line[17],
// 			tornado.Width ==             line[18],
// 			tornado.StatesAff ==          line[19],
// 			tornado.StatesNumber ==      line[20],
// 			tornado.FipsCdCounty1 ==     line[21],
// 			tornado.FipsCdCounty2 ==     line[22],
// 			tornado.FipsCdCounty3 ==     line[23],
// 			tornado.FipsCdCounty4 ==     line[24],
// 			tornado.MagnitudeEst ==      line[25],
// 		}
// 		return *tornado
// 	}
