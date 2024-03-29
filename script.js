const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}
//starts game sets state as an empty object
function startGame() {
  state = {}
  showTextNode(1)
}

//Displays the text for a specific node and creates buttons for available options
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }
//traverses each object in the "option" array and creates a button for each option
  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

//Checks if the option should be shown based on the current game state
function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

//continues to next piece of text based on what option is selected
function selectOption(option) {
  const nextTextNodeId = option.nextText 
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState) //sets state to the new state
  showTextNode(nextTextNodeId)
}
//array of objects that contain the text for each node and the options available to the player
const textNodes = [
  {
    id: 1,
    text: 'You woke up and found yourself in what seems to be the entrance at the temple… ',
    options: [
      {
        text: 'Go in?',
        nextText: 2
      }
    ]
  },
  //story
  {
    id: 2,
    text: 'You head inside and spot a big statue of some sort of animal that resembles that of a fluffy creature. A quick shine reeled your attention and you saw a gold plate which stated, “Find the spirit and a path will be unleashed.” At that moment, the entrance behind you caves in leaving you with two stone hallways on both your left and right.',
    options: [
      {
        //death
        text: 'Left?',
        nextText: 4
      },
      {
        //continues story
        text: 'Right?',
        nextText: 3
      }
    ]
  },
  //story
  {
    id: 3,
    text: 'As you enter through the hallway, the ambient noises of the wind seem to come to a halt. You become weary, fear conquering your mind then suddenly – Woooosh. A distinct ghost like animal came out of the cracks on the floor. It had brownish red colored fur on its body, a line of brown fur crawling from underneath each eye almost as if it was crying, and a tail with a black and orange stripe pattern. The spirit spoke. \“Hellooooo, my name is Authgor! The wanderer of the temple! You seem lost… I can help you find a way out!\”',
    options: [
      {
        //continues
        text: 'Accept the offer?',
        nextText: 5
      },
      {
        //death
        text: 'Decline the offer?',
        nextText: 6
      }
    ]
  },
  //death
  {
    id: 4,
    text: 'You die to bite caused by a mysterious entity',
    options: [
      {
        //restarts game
        text: 'Restart?',
        nextText: -1
      }
    ]
  },
  //story
  {
    id: 5,
    text: '\“Come on, follow me!\” You follow the spirit down the long, still silent, ominous hallway until you reach a lever huddled right next to a enormous pair of doors. \“You have to pull this lever at a certain speed – although I forgot whether it was fast or slow…\” ',
    options: [
      {
        text: 'Pull the lever fast?',
        nextText: 7
      },
      {
        text: 'Pull the lever slowly?',
        nextText: 8
      }
    ]
  },
  //death
  {
    id: 6,
    text: 'You ignore the spirit as if it wasn’t there. You seemed to have infuriated the spirit. Within a blink of an eye, you found yourself passing out never to be woken again.',
    options: [
      {
        text: 'Restart?',
        nextText: -1
      }
    ]
  },
  //story
  {
    id: 7,
    text:'You yank the lever down and the doors start to open creating a huge echo throughout the temple. You walk through relieved at the sight of your environment. You wave to the spirit as you walk out of the temple, finally enjoying the freedom that you have – only to black out and wake up to your bedroom. Guess it was all a dream :)',
    options: [
      {
        text: "The End",
        nextText: -1
      }
    ]
  },
  //death
  {
    id: 8,
    text: 'You gently pull the lever at a slow pace, though nothing seems to be happening. When you finally finished pulling the lever, the spirit spoke. \“Oh! I forgot if you pull the lever once and fail, the doors will permanently stay locked. I guess you’re stuck with me MUAHAHAHHAHAHA.\”',
    options: [
      {
        text: 'Restart?',
        nextText: -1
      }
    ]
  }
]
startGame()