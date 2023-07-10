package conn

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v4/pgxpool"
)

var Connection *pgxpool.Pool

func Initialize() {
	connectionPath := "postgresql://postgres:12345@localhost:5432/postgres"

	poolConfig, err := pgxpool.ParseConfig(connectionPath)
	if err != nil {
		log.Println("Unable to parse DATABASE_URL", "error", err)
		os.Exit(1)
	}

	Connection, err = pgxpool.ConnectConfig(context.Background(), poolConfig)
	if err != nil {
		log.Println("Unable to create connection pool, error:", err)
		os.Exit(1)
	} else {
		log.Println("Database Connection Created")
	}
}
