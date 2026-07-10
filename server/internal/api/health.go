package api

import (
	"log/slog"
	"net/http"
	"time"
)

type healthResponse struct {
	Status  string `json:"status"`
	Time    string `json:"time"`
	Version string `json:"version"`
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	data := healthResponse{
		Status:  "ok",
		Time:    time.Now().UTC().Format(time.RFC3339),
		Version: version,
	}

	if err := writeJSON(w, http.StatusOK, data); err != nil {
		slog.Error("Failed to write health check response", "error", err)
	}
}
