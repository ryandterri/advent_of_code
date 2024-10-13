package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	content, err := os.ReadFile("./data/input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	input := string(content)
	ups := strings.Count(input, "(")
	downs := strings.Count(input, ")")
	fmt.Printf("Ups: %d\n", ups)
	fmt.Printf("Downs: %d\n", downs)
	fmt.Printf("Ups - Downs: %d", (ups - downs))
}
