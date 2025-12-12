package main

import (
	"fmt"
	"os"
	"strings"
)

type Grid [][]string

func (grid Grid) Print() {
	for _, row := range grid {
		for _, cell := range row {
			fmt.Print(cell)
		}
		fmt.Print("\n")
	}
}

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
	grid := make(Grid, len(rows))

	for i, row := range rows {
		grid[i] = strings.Split(row, "")
	}

	total := 0

	for {
		removed := ProcessGrid(grid, directions)
		if removed == 0 {
			break
		}
		total += removed
	}

	fmt.Println(total)
	grid.Print()
}

func ProcessGrid(grid [][]string, directions [][2]int) int {
	yMax := len(grid) - 1
	xMax := len(grid[0]) - 1
	total := 0
	coords := [][2]int{}
	for i, row := range grid {
		for j, cell := range row {
			adjacentCount := 0
			if cell == "." {
				continue
			}
			for _, dir := range directions {
				x, y := j+dir[0], i+dir[1]
				if Invalid(x, y, xMax, yMax) {
					continue
				}
				if grid[y][x] == "@" {
					adjacentCount++
				}
			}
			if adjacentCount < 4 {
				total++
				coords = append(coords, [2]int{i, j})
			}
		}
	}
	for _, coord := range coords {
		grid[coord[0]][coord[1]] = "."
	}
	return total
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
