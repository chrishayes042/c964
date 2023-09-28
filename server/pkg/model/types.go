package model

type TornadoData struct {
	Id                string `json:"id"`
	Year              string `json:"year"`
	Month             string `json:"month"`
	Day               string `json:"day"`
	Date              string `json:"date"`
	Time              string `json:"time"`
	TimeZone          string `json:"timezone"`
	DateTime          string `json:"dateTime"`
	State             string `json:"state"`
	StateFip          string `json:"stateFip"`
	Magnitude         string `json:"magnitude"`
	Injuries          string `json:"injuries"`
	Fatalities        string `json:"fatalities"`
	PropertyLoss      string `json:"propertyLoss"`
	StartingLongitude string `json:"slong"`
	StartingLatitude  string `json:"slat"`
	EndingLongitude   string `json:"elong"`
	EndingLatitude    string `json:"elat"`
	Length            string `json:"length"`
	Width             string `json:"width"`
	StatesAff         string `json:"statesAff"`
	StatesNumber      string `json:"statesNum"`
	FipsCdCounty1     string `json:"fipsCdCounty1"`
	FipsCdCounty2     string `json:"fipsCdCounty2"`
	FipsCdCounty3     string `json:"fipsCdCounty3"`
	FipsCdCounty4     string `json:"fipsCdCounty4"`
	MagnitudeEst      string `json:"manitudeEst"`
}

type TornadoDecade struct {
	Decade       string `json:"decade"`
	Fatalities   string `json:"fatalities"`
	Injuries     string `json:"injuries"`
	PropertyLoss string `json:"propertyLoss"`
	AvgMagnitude string `json:"avgMagnitude"`
}

type TornadoStateTotals struct {
	Injuries     string `json:"injuries"`
	Fatalities   string `json:"fatalities"`
	PropertyLoss string `json:"propertyLoss"`
}

type StateDecadeTotals struct {
	Decade       string `json:"decade"`
	AvgMagnitude string `json:"avgMagnitude"`
	Injuries     string `json:"injuries"`
	Fatalities   string `json:"fatalities"`
	PropertyLoss string `json:"propertyLoss"`
	Length       string `json:"length"`
	Width        string `json:"width"`
}
