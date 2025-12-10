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
		count := qty / 100
		rem := qty % 100

		if direction == 'R' {
			if dial != 0 && rem >= 100-dial {
				count++
			}
			dial += qty
		} else {
			if dial != 0 && rem >= dial {
				count++
			}
			dial -= qty
		}
		dial = dial % 100

		if dial < 0 {
			dial = 100 + dial
		}
		println(direction, qty, dial, count, rem)
		answer += count
	}
	println(answer)
}
