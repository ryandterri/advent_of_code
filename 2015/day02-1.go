package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func handle_error(err error) {
	if err != nil {
		fmt.Println(err)
		return
	}
}

func main() {
	content, err := os.ReadFile("./data/input2.txt")
	handle_error(err)

	lines := strings.Split(string(content), "\n")
	total := 0
	for _, line := range lines[0 : len(lines)-1] {
		sides := make([]int, 3)
		parts := strings.Split(line, "x")
		length, err := strconv.Atoi(parts[0])
		handle_error(err)
		width, err := strconv.Atoi(parts[1])
		handle_error(err)
		height, err := strconv.Atoi(parts[2])
		handle_error(err)

		sides[0] = length * width
		sides[1] = width * height
		sides[2] = length * height

		min := sides[0]
		for _, side := range sides {
			if side < min {
				min = side
			}
		}
		paper_needed := 2*sides[0] + 2*sides[1] + 2*sides[2] + min

		total += paper_needed
	}
	fmt.Println(total)
}
