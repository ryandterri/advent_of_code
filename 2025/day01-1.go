package main

import (
	"os"
	"strconv"
	"strings"
)

func main() {
	answer := 0
	dial := 50
	data, err := os.ReadFile("./data/input1.txt")
	content := strings.TrimSpace(string(data))
	if err != nil {
		panic(err)
	}
	instructions := strings.SplitSeq(content, "\n")
	for instruction := range instructions {
		direction := instruction[0]
		qty, err := strconv.Atoi(instruction[1:])
		if err != nil {
			panic(err)
		}
		if direction == 'R' {
			dial += qty
		} else {
			dial -= qty
		}
		dial = dial % 100

		if dial < 0 {
			dial = 100 + dial
		}
		println(direction, qty, dial)
		if dial == 0 {
			answer++
		}
	}
	println(answer)
}
