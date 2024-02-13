const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

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

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

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
  {
    id: 4,
    text: 'You die to bite caused by a mysterious entity',
    options: [
      {
        text: 'Restart?',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 
  }
]
startGame()