package config

import "gochessplusplus-server/internal/env"

type Config struct {
	Addr string
	Env  string
}

func Load() Config {
	return Config{
		Addr: env.GetString("SERVER_ADDR", ":8080"),
		Env:  env.GetString("ENV", "development"),
	}
}
