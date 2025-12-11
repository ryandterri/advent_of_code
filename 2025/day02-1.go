package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	data, err := os.ReadFile("./data/input2.txt")
	if err != nil {
		panic(err)
	}
	content := strings.TrimSpace(string(data))

	ranges := strings.SplitSeq(content, ",")
	answer := 0
	for rng := range ranges {
		invalidIds, err := getInvalidIds(rng)
		if err != nil {
			panic(err)
		}
		fmt.Println(invalidIds)
		if len(invalidIds) > 0 {
			for _, invalidId := range invalidIds {
				answer += invalidId
			}
		}
	}

	fmt.Println(answer)
}

func getInvalidIds(rng string) ([]int, error) {
	rangeValues := strings.Split(rng, "-")
	min, err := strconv.Atoi(rangeValues[0])
	if err != nil {
		return []int{}, err
	}
	max, err := strconv.Atoi(rangeValues[1])
	if err != nil {
		return []int{}, err
	}

	result := []int{}

	for i := min; i <= max; i++ {
		invalid := isInvalid(i)
		if invalid {
			result = append(result, i)
		}
	}
	return result, nil
}

func isInvalid(num int) bool {
	strMin := strconv.Itoa(num)
	strMinLen := len(strMin)
	if strMinLen%2 == 0 {
		half := strMinLen / 2
		first := strMin[:half]
		last := strMin[half:]
		if first == last {
			return true
		}
	}
	return false
}
