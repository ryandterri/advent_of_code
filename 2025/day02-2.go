package main

import (
	"fmt"
	"math"
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
	stringNum := strconv.Itoa(num)
	stringLength := len(stringNum)
	divisors := getDivisors(stringLength)

	for _, divisor := range divisors {
		repeat := stringLength / divisor
		if repeat > 1 {
			pattern := stringNum[:divisor]
			valid := true
			for i := 1; i < repeat; i++ {
				start := i * divisor
				end := start + divisor
				if stringNum[start:end] != pattern {
					valid = false
					break
				}
			}
			if valid == true {
				return true
			}
		}
	}

	return false
}

func getDivisors(num int) []int {
	result := []int{}
	limit := int(math.Sqrt(float64(num)))
	for i := 1; i <= limit; i++ {
		if num%i == 0 {
			result = append(result, i)
			other := num / i
			if other != i && other != num {
				result = append(result, other)
			}
		}
	}
	return result
}
