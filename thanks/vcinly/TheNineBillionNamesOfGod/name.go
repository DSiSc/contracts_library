package main

import "fmt"
import "time"
import "strings"

var bannedsequences = []string{"AAAA", "BBBB", "CCCC", "DDDD", "EEEE", "FFFF", "GGGG", "HHHH", "IIII", "JJJJ", "KKKK", "LLLL", "MMMM", "NNNN", "OOOO", "PPPP", "QQQQ", "RRRR", "SSSS", "TTTT", "UUUU", "VVVV", "WWWW", "XXXX", "YYYY", "ZZZZ"}

var name = "AAABAAAAZ"
var count = 0
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

func alpha_increment(x string) string {
	if x != "" {
		if string(x[len(x)-1]) == "Z" {
			x = alpha_increment(x[0:len(x)-1]) + "A"
		} else {
			x = string(x[0:len(x)-1]) + string(alphabet[(strings.Index(alphabet, string(x[len(x)-1]))+1)])
		}
	}
	return x
}

// func next_name() {
// 	name = alpha_increment(name)
// 	var banned = false
// 	for x := 0; x < len(bannedsequences); x++ {
// 		if strings.Index(name, bannedsequences[x]) > 1 {
// 			banned = true
// 		}
// 	}
// 	if !banned {
// 		count++
// 		fmt.Printf("%s \n", name)
// 	}
// 	if name != "ZZZYZZZYZ" {
// 		next_name()
// 	}

// }

func main() {
	fmt.Println(time.Now().Format(time.RFC850))

	for {
		name = alpha_increment(name)
		var banned = false
		for x := 0; x < len(bannedsequences); x++ {
			if strings.Index(name, bannedsequences[x]) > 1 {
				banned = true
			}
		}
		if !banned {
			count++
			if count%10000000 == 0 {
				fmt.Printf("%s \n", name)
				// fmt.Printf("%d \n", count)
				// fmt.Println(time.Now().Format(time.RFC850))
			}
		}
		if name == "ZZZYZZZYZ" {
			fmt.Printf("%d \n", count)
			break
		}
	}
}
