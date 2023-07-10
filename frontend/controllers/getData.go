package controllers

import (
	"context"
	"graduation-project/conn"
	"graduation-project/model"
	"log"

	"github.com/gofiber/fiber/v2"
)

func GetAllDataFromBlinkLogs(ctx *fiber.Ctx) error {
	res := model.GetAllDataFromBlinkLogsResponse{}
	qGetAllData := `SELECT bl.id, bl.blink_type_id, bt.blink_type 
					FROM public.blink_logs as bl
					INNER JOIN public.blink_log_blink_type as bt ON bt.id = bl.blink_type_id 
					ORDER BY id DESC
					LIMIT 1`
	rows, err := conn.Connection.Query(context.Background(), qGetAllData)
	if err != nil {
		log.Println("GetAllDataFromBlinkLogs GetAllData qGetAllData error: ", err)
		GetAllDataFromBlinkLogsSetResponse("Error", err.Error(), &res)
		return ctx.JSON(&res)
	}
	for rows.Next() {
		row := model.GetAllDataFromBlinkLogsDataList{}
		err := rows.Scan(
			&row.Id,
			&row.BlinkTypeId,
			&row.BlinkType,
		)
		if err != nil {
			log.Println("GetAllDataFromBlinkLogs rows.Scan error: ", err)
			GetAllDataFromBlinkLogsSetResponse("Error", err.Error(), &res)
			return ctx.JSON(&res)
		}
		res.Result = append(res.Result, row)
	}
	GetAllDataFromBlinkLogsSetResponse("Success", "", &res)
	return ctx.JSON(&res)
}

func GetAllDataFromBlinkLogsSetResponse(Status string, Message string, res *model.GetAllDataFromBlinkLogsResponse) {
	res.Status.Result = Status
	res.Status.Message = Message
}
