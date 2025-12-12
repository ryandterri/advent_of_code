package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type stack[T any] []T

func (s *stack[T]) Push(v T) {
	*s = append(*s, v)
}

func (s *stack[T]) Pop() T {
	l := len(*s)
	v := (*s)[l-1]
	*s = (*s)[:l-1]
	return v
}

func (s stack[T]) Top() T {
	return s[len(s)-1]
}

func (s stack[T]) NotEmpty() bool {
	return len(s) > 0
}

func main() {
	data, err := os.ReadFile("./data/input3.txt")
	if err != nil {
		panic(err)
	}
	content := strings.TrimSpace(string(data))

	banks := strings.SplitSeq(content, "\n")
	answer := 0

	for bank := range banks {
		result := make(stack[rune], 0)
		result.Push(rune(bank[0]))
		numToDelete := len(bank) - 2

		for _, joltage := range bank[1:] {
			for numToDelete > 0 && result.NotEmpty() && result.Top() < joltage {
				result.Pop()
				numToDelete--
			}
			result.Push(joltage)
		}
		for i := 0; i < numToDelete; i++ {
			result.Pop()
		}
		largest, _ := strconv.Atoi(string(result))
		answer += largest
	}
	fmt.Println("Answer: ", answer)
}
