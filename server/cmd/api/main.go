package main

import (
	"gochessplusplus-server/internal/api"
	"gochessplusplus-server/internal/config"
	"log/slog"
	"os"
)

func main() {
	cfg := config.Load()
	app := &api.Application{
		Config: cfg,
	}

	mux := app.Mount()
	if err := app.Run(mux); err != nil {
		slog.Error("Server stopped", "error", err)
		os.Exit(1)
	}
}
