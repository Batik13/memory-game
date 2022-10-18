const
  amount = 12,
  icons = [9786, 9728, 9729, 9730, 9733, 9742],
  classes = {
    cardsList: 'cards-list',
    card: 'card',
    cardContainer: 'card-container',
    cardBack: 'card-back',
    cardFace: 'card-face',
    isFlip: 'is-flip'
  },
  cardsListNode = document.getElementById(classes.cardsList),
  randomArr = (() => {
    let randomArr = [];
    for (let i = 0; i < amount / 2; i++) {
      randomArr.push(i);
      randomArr.push(i);
    }
    return randomArr.sort(() => Math.random() - 0.5);
  })();

let
  tmpId = '',
  tmpIcon = '',
  cardNode,
  cardBackNode,
  cardFaceNode;

for (let i = 0; i < amount; i++) {
  createCard(i, icons, randomArr);
}

function createCard(i, icons, randomArr) {
  cardNode = document.createElement('div');
  cardNode.className = classes.card;
  cardNode.addEventListener('click', function () {
    flipped.call(this, i);
  })
  //card back
  cardBackNode = document.createElement('div');
  cardBackNode.className = `${classes.cardContainer} ${classes.cardBack}`;
  cardBackNode.innerHTML = `&#${icons[randomArr[i]]};`;
  //card face
  cardFaceNode = document.createElement('div');
  cardFaceNode.className = `${classes.cardContainer} ${classes.cardFace}`;
  //whole card
  cardNode.appendChild(cardBackNode);
  cardNode.appendChild(cardFaceNode);
  cardsListNode.appendChild(cardNode);
}

function flipped(i) {
  if (!this.classList.contains(classes.isFlip)) {
    this.classList.add(classes.isFlip);
    let icon = this.childNodes[0].innerText;

    if (!tmpIcon) {
      tmpIcon = icon;
      tmpId = i;
    } else {
      if (tmpIcon !== icon) {
        (new Promise(resolve => {
          setTimeout(() => {
            this.classList.remove(classes.isFlip);
            document.querySelectorAll(`.${classes.card}`)[tmpId]
              .classList.remove(classes.isFlip);
            resolve();
          }, 500);
        })).then(
          result => {
            cleareTmp();
          }
        )
      } else {
        cleareTmp();
      }
    }
  }
}

function cleareTmp() {
  tmpId = '';
  tmpIcon = '';
}