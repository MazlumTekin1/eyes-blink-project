package router

import (
	"graduation-project/controllers"

	"github.com/gofiber/fiber/v2"
)

func Routing(app *fiber.App) {
	app.Get("/getAllData", controllers.GetAllDataFromBlinkLogs)
}
