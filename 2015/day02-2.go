package main

import (
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

func main() {
	content, _ := os.ReadFile("./data/input2.txt")
	lines := strings.Split(string(content), "\n")
	total := 0
	for _, line := range lines[0 : len(lines)-1] {
		split := strings.Split(line, "x")
		dimensions := make([]int, len(split))
		for i, item := range split {
			dimensions[i], _ = strconv.Atoi(item)
		}
		slices.Sort(dimensions)

		ribbon_total := (2 * dimensions[0]) + (2 * dimensions[1]) + (dimensions[0] * dimensions[1] * dimensions[2])
		total += ribbon_total
	}

	fmt.Println(total)
}
