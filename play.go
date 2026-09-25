// You can edit this code!
// Click here and start typing.
package main

import (
	"flag"
	"fmt"
)

func main() {
	name := flag.String("name", "小明", "你的名字")
	flag.Parse()

	fmt.Println(*name) // 注意此处返回指针，应该有个 *，否则直接打印对应地址(e.g. 0xc0000aa050)
}
