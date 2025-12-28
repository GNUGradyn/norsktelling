"use strict";

let num = 0;
let eng = "";
let no = "";
let mode = "seq";
let displayMode = "words";

const normalize = (str) => str
        .toLowerCase()
        .trim()
        .replace(/^en\s+/, "")
        .replaceAll(" ", "")
        .replaceAll("ett", "en")
        .replaceAll("syv", "sju")
        .replaceAll("tyve", "tjue")
        .replaceAll("aa", "å")
        .replaceAll("ae", "æ")
        .replaceAll("oe", "ø")
        .replaceAll("-", "")
        .replaceAll("–", "")
        .replaceAll("—", "")
        .replaceAll(",", "")
        .replace(/\bog\b/g, "")

const getRandInRange = () => Math.floor(Math.random() * 1000000);
const getModeButtons = () => document.getElementById("mode").getElementsByClassName("selector-button");
const getDisplayModeButtons = () => document.getElementById("display-mode").getElementsByClassName("selector-button");

const updateState = () => {
    eng = n2words(num, {lang: "en"});
    no = normalize(n2words(num, {lang: "nb"}));
    switch (displayMode) {
        case "words":
            document.getElementById("eng-num").innerText = eng;
            break;
        case "digits":
            document.getElementById("eng-num").innerText = num.toLocaleString('en-US');
            break;
    }

    Array.from(getModeButtons()).forEach((el) => {
        if (el.dataset.mode === mode) {
            el.classList = "selector-button selected"
        } else {
            el.classList = "selector-button";
        }
    });

    Array.from(getDisplayModeButtons()).forEach((el) => {
        if (el.dataset.mode === displayMode) {
            el.classList = "selector-button selected"
        } else {
            el.classList = "selector-button";
        }
    });
}

window.onload = () => {
    const noNum = document.getElementById("no-num");

    noNum.value = ""; // Prevent browser cache from preserving value
    noNum.focus();

    noNum.onkeyup = () => {
        if (normalize(noNum.value) === no) {
            noNum.value = "";
            switch (mode) {
                case "seq":
                    num++;
                    break;
                case "pot":
                    num = num * 10;
                    break;
                case "rand":
                    num = getRandInRange();
                    break;
            }
            updateState();
        }
    }

    Array.from(getModeButtons()).forEach((el) => {
        el.addEventListener("click", () => {
            mode = el.dataset.mode;
            switch (mode) {
                case "seq":
                    num = 0;
                    break;
                case "pot":
                    num = 1;
                    break;
                case "rand":
                    num = getRandInRange();
                    break;
            }
            updateState();
        })

        Array.from(getDisplayModeButtons()).forEach((el) => {
            el.addEventListener("click", () => {
                displayMode = el.dataset.mode;
                updateState();
            });
        });

        updateState();
    });
}