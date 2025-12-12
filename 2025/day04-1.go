package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	data, err := os.ReadFile("./data/input4.txt")
	if err != nil {
		panic(err)
	}
	content := strings.TrimSpace(string(data))

	directions := [][2]int{
		{-1, -1},
		{-1, 0},
		{-1, 1},
		{0, -1},
		{0, 1},
		{1, -1},
		{1, 0},
		{1, 1},
	}

	rows := strings.Split(content, "\n")
	total := 0
	yMax := len(rows) - 1
	for i, row := range rows {
		xMax := len(row) - 1
		for j, cell := range row {
			adjacentCount := 0
			if cell == '.' {
				continue
			}
			for _, dir := range directions {
				x, y := j+dir[0], i+dir[1]
				if Invalid(x, y, xMax, yMax) {
					continue
				}
				if rows[y][x] == '@' {
					adjacentCount++
				}
			}
			if adjacentCount < 4 {
				total++
			}
		}
	}
	fmt.Print(total)
}

func Invalid(x int, y int, xMax int, yMax int) bool {
	if x < 0 || y < 0 {
		return true
	}

	if x > xMax || y > yMax {
		return true
	}
	return false
}
