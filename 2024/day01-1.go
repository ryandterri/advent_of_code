package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	content, _ := os.ReadFile("./data/input.txt")
	lines := strings.Split(string(content), "\n")

	line_count := len(lines) - 1
	lefts := make([]int, 0, line_count)
	rights := make([]int, 0, line_count)

	for _, line := range lines[0:line_count] {
		nums := strings.Split(line, " ")
		fmt.Println(len(nums))
		left, _ := strconv.Atoi(nums[0])
		right, _ := strconv.Atoi(nums[3])
		lefts = append(lefts, left)
		rights = append(rights, right)
	}

	sort.Ints(lefts)
	sort.Ints(rights)

	total := 0
	for i := 0; i < line_count; i++ {

		diff := lefts[i] - rights[i]
		if diff < 0 {
			diff = -diff
		}

		fmt.Println(diff)
		total += diff
	}

	fmt.Println(total)
}
