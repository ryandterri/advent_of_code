package main

import (
	"os"
	"strconv"
	"strings"
)

func main() {
	content, _ := os.ReadFile("./data/input2.txt")
	lines := strings.Split(string(content), "\n")
	for _, line := range lines[0 : len(lines)-1] {
		parts := strings.Split(line, ":")
		// gameId := parts[0]
		data := parts[1]
		pulls := strings.Split(data, ";")

		for _, pull := range pulls {
			counts := strings.Split(pull, ",")
			for _, count := range counts {
				values := strings.Split(strings.TrimSpace(count), " ")
				amount, _ := strconv.Atoi(values[0])
				color := values[1]
			}
		}
	}
}
