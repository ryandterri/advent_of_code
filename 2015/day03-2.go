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

	santa := Coordinate{x: 0, y: 0}
	robo_santa := Coordinate{x: 0, y: 0}

	locations[santa]++
	locations[robo_santa]++

	for i, direction := range directions {
		var current *Coordinate
		if i%2 == 0 {
			current = &santa
		} else {
			current = &robo_santa
		}
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
		locations[*current]++
	}
	fmt.Println(len(locations))
}
