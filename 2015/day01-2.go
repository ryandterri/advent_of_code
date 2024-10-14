package main

import (
	"fmt"
	"os"
)

func main() {
	content, err := os.ReadFile("./data/input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}

	sum := 0
	for i := 0; i < len(content); i++ {
		if content[i] == 40 {
			sum++
		} else {
			sum--
		}

		if sum == -1 {
			fmt.Println(i + 1)
			break
		}

	}
}
