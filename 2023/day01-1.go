package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	content, _ := os.ReadFile("./data/input.txt")
	lines := strings.Split(string(content), "\n")
	r, _ := regexp.Compile(`\d`)
	total := 0
	for _, line := range lines {
		matches := r.FindAllString(line, -1)
		fmt.Println(matches)
		first := matches[0]
		last := matches[len(matches)-1]
		combined := fmt.Sprintf("%s%s", first, last)
		sum, _ := strconv.Atoi(combined)
		fmt.Println(sum)
		total += sum
	}
	fmt.Println(total)
}
