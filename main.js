const addWordButton = document.getElementById("btn-add"),
      engInput = document.getElementById("eng-input"),
      rusInput = document.getElementById("rus-input"),
      inputs = document.querySelectorAll(".inputs");

const wordsListWrapper = document.getElementById("words-list-wrapper");

let wordsArray,
    wordsPairDivs,
    btnsDelete,
    checkboxInputs;

localStorage.length < 1 ? wordsArray = [] : wordsArray = JSON.parse(localStorage.getItem("words"));

class PairOfWords {
    constructor(index, className, engWord, rusWord) {
        this.id = index;
        this.className = className;
        this.engWord = engWord;
        this.rusWord = rusWord;
    }
};

const prepareToChange = () => {
    if (wordsArray.length > 0) {
        wordsPairDivs = document.querySelectorAll(".words-pair");
        btnsDelete = document.querySelectorAll(".btns-delete");
        radioInputs = document.querySelectorAll(".radio-inputs");

        btnsDelete.forEach(btn => {
            btn.addEventListener("click", (event) => {
                wordsPairDivs.forEach(div => {
                    if (event.target.dataset.index == div.dataset.index) {
                        div.remove();
                        const newArr = wordsArray.filter(word => word.id == div.dataset.index);
                        const indexToDelete = wordsArray.indexOf(...newArr);
                        wordsArray.splice(indexToDelete, 1);
                        localStorage.setItem("words", JSON.stringify(wordsArray));
                        prepareToChange();
                    }
                });
            });
        });

        radioInputs.forEach(input => {
            input.addEventListener("change", event => {
                wordsPairDivs.forEach(div => {
                    if (event.target.dataset.index == div.dataset.index) {
                        const newArr = wordsArray.filter(word => word.id == div.dataset.index);
                        const indexToChange = wordsArray.indexOf(...newArr);
                        switch (event.target.value) {
                            case "low":
                                div.setAttribute("class", "words-pair");
                                div.classList.add("low");
                                wordsArray[indexToChange].className = "low";
                                localStorage.setItem("words", JSON.stringify(wordsArray));
                                prepareToChange();
                                break;
                            case "middle":
                                div.setAttribute("class", "words-pair");
                                div.classList.add("middle");
                                wordsArray[indexToChange].className = "middle";
                                localStorage.setItem("words", JSON.stringify(wordsArray));
                                prepareToChange();
                                break;
                            case "hight":
                                div.setAttribute("class", "words-pair");
                                div.classList.add("hight");
                                wordsArray[indexToChange].className = "hight";
                                localStorage.setItem("words", JSON.stringify(wordsArray));
                                prepareToChange();
                                break;
                        }
                    }
                });
            });
        });
    }
};

const createElementOnThePage = word => {
    let style;

    switch (word.className) {
        case "low":
            style = "low";
            break;
        case "middle":
            style = "middle";
            break;
        case "hight":
            style = "hight";
            break;
        default:
            style = "";
    }

    const newDiv = `
        <div class="words-pair ${style}" data-index="${word.id}">
            <div class="words-wrapper">
                <div class="eng-word">${word.engWord}</div>
                <div class="rus-word">- ${word.rusWord}</div>
            </div>
            <div class="radio-wrapper">
                <input class="radio-inputs" type="radio" name="${word.engWord}" value="low" data-index="${word.id}">Слабо
                <input class="radio-inputs" type="radio" name="${word.engWord}" value="middle" data-index="${word.id}">Средне
                <input class="radio-inputs" type="radio" name="${word.engWord}" value="hight" data-index="${word.id}">Знаю
            </div>
            <button class="btns-delete" data-index="${word.id}">Удалить слово</button>
        </div>
    `;
    wordsListWrapper.innerHTML += newDiv;
    prepareToChange();
};

wordsArray.forEach(word => {
    createElementOnThePage(word);
});

addWordButton.addEventListener("click", () => {
    let indexId;
    if (
        engInput.value.length < 1 ||
        rusInput.value.length < 1 ||
        !isNaN(engInput.value) ||
        !isNaN(rusInput.value)
    ) {
        inputs.forEach(input => {
            input.classList.add("invalid");
        });
    } else {
        inputs.forEach(input => {
            input.classList.remove("invalid");
        });

        if (wordsArray.length > 0) {
            indexId = wordsArray[wordsArray.length - 1].id + 1;
        } else {
            indexId = wordsArray.length;
        }
        const newWord = new PairOfWords(indexId, "low", engInput.value, rusInput.value);
        wordsArray[wordsArray.length] = newWord;
        localStorage.setItem("words", JSON.stringify(wordsArray));
        createElementOnThePage(newWord);
        engInput.value = "";
        rusInput.value = "";
    }
});

prepareToChange();