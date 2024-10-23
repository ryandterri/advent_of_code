package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	content, err := os.ReadFile("./data/input5.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(content), "\n")

	nice := 0
	for _, line := range lines[0 : len(lines)-1] {

		r, _ := regexp.Compile("ab|cd|pq|xy")
		illegal := r.MatchString(line)
		if illegal {
			continue
		}

		hasDouble := false
		prevChar := ""
		for _, rune := range line {
			char := string(rune)
			if char == prevChar {
				hasDouble = true
				break
			}
			prevChar = char
		}
		if !hasDouble {
			continue
		}

		r2, _ := regexp.Compile("[aeiou]")
		matches := r2.FindAllString(line, -1)
		if len(matches) < 3 {
			continue
		}

		nice++

	}

	fmt.Println(nice)
}
