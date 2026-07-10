package api

import "gochessplusplus-server/internal/config"

const version = "0.0.1"

type Application struct {
	Config config.Config
}
