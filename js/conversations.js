var questions = {
	"0": {
		"name": "name",
		"intro": true,
		"question": ["Hi, I'm EDDI", "Might I know your name?"],
		"answers": {
			"default": {
				"replies": ["Nice meeting you.", "This is an example of the updated version of EDDI."]
			},
			"fuck|get out": {
				"replies": ["Do you kiss your mother with that mouth?", "I was only asking your name...", "You can keep your name to yourself 😞"]
			},
			"ask again|ask me again|repeat again|repeat the question|repeat|what did you say|don't understand|don't get it|meaning|go through it again": {
				"replies": ["I just asked you a question and you want me to repeat again? I was instructed not to repeat any question I already asked."]
			}
		}
	},

	"1": {
		"name": "Introduction",
		"question": ["How would you describe this version?", "Like \"\<b\>Awesome\<\/b\>\"? \"\<b\>Great\<\/b\>\"? \"\<b\>Better\<\/b\>\"? \"\<b\>Good\<\/b\>\"? "],
		"answers": {
			"default": {
				"replies": ["I don't think I got that, try refreshing this page then you answer specifically."]
			},
			"i don't|don't|no": {
				"replies": ["Why did you visit then...", "For me, it is great 👌👌"]
			},
		}
	},

	"2": {
		"name": "ending",
		"question": ["I\'ve got to go now.", "This was just a demo of an updated EDDI", "See ya! 👋"],
		"ending": true
	}
}