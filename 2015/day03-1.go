package main

import (
	"fmt"
	"os"
	"strings"
)

type Coordinate struct {
	x int
	y int
}

func main() {
	content, _ := os.ReadFile("./data/input3.txt")
	directions := strings.Split(string(content), "")
	locations := make(map[Coordinate]int)

	current := Coordinate{x: 0, y: 0}
	locations[current]++

	for _, direction := range directions {
		switch direction {
		case "^":
			current.y++
		case "v":
			current.y--
		case ">":
			current.x++
		case "<":
			current.x--
		}
		locations[current]++
	}
	fmt.Println(len(locations))
}
