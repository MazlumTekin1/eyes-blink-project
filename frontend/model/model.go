package model

type ResponseStatus struct {
	Result  string
	Message string
}

type GetAllDataFromBlinkLogsResponse struct {
	Status ResponseStatus
	Result []GetAllDataFromBlinkLogsDataList
}

type GetAllDataFromBlinkLogsDataList struct {
	Id          int
	BlinkTypeId int
	BlinkType   string
}
