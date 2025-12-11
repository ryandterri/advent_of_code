package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	data, err := os.ReadFile("./data/input3.txt")
	if err != nil {
		panic(err)
	}
	content := strings.TrimSpace(string(data))

	banks := strings.SplitSeq(content, "\n")
	answer := 0
	for bank := range banks {
		joltages := strings.Split(bank, "")
		leftMax := joltages[0]
		rightMax := "0"
		maxIndex := len(joltages) - 2
		for i, joltage := range joltages[1:] {
			value := joltage
			if rightMax < value {
				rightMax = value
			}
			if i < maxIndex && leftMax < value {
				leftMax = value
				rightMax = "0"
			}
		}
		highest, _ := strconv.Atoi(leftMax + rightMax)
		fmt.Println(leftMax, rightMax, highest)
		answer += highest
	}
	fmt.Println("Answer: ", answer)
}
