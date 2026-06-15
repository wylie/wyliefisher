---
title: "Spooktober"
order: 8
heroImage: "/src/assets/images/projects/spooktober.png"
tags: ["Python"]
url: "https://github.com/wylie/spooktober"
snippet: "Spooktober is a simple Python script that asks if you want a trick or a treat. Choose 'trick' for a ghostly 'BOO' or 'treat' for a sweet Halloween message. 🎃👻🍫"
---
This is a very small <a href="https://github.com/wylie/spooktober" target="_blank">repo</a> that I created for a contest on Codecademy.

The objective was to create a Halloween themed something.

I was coming late to the competition so I decided to write a simple script in python. Basically taking the age-old question of "Trick or Treat?" and asking the user. It's so small in fact that I may as well paste it here!

````python
import random
while True:
    t_or_t = input("🎃 Trick or Treat? ").lower()
    if t_or_t == "trick":
        print("👻 B", end="")
        print("".join(random.choice(["O", "o"]) for _ in range(100)))
        break
    elif t_or_t == "treat":
        print("🍫 Happy Halloween! Have some candy 🍫")
        break
    else:
        print("💀 Hey, that's not an option!")
        continue