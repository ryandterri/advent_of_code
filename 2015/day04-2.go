package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"strings"
)

func main() {
	key := "iwrupvqb"

	i := 1
	for {
		data := fmt.Sprintf("%s%d", key, i)
		hash := md5.Sum([]byte(data))
		hexString := string(hex.EncodeToString(hash[:]))
		// fmt.Println(hexString)
		if strings.HasPrefix(hexString, "000000") {
			break
		}
		i++
	}

	fmt.Println(i)
}
