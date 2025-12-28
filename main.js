"use strict";

let num = 0;
let eng = "zero";
let no = "null";
const normalize = (str) => str
    .toLowerCase()
    .trim()
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
    .replaceAll("og", ""); // Allow omitting og

const updateState = () => document.getElementById("eng-num").innerText = eng;

window.onload = () => {
    const noNum = document.getElementById("no-num");

    noNum.value = ""; // Prevent browser cache from preserving value
    noNum.focus();

    noNum.onkeyup = () => {
        if (normalize(noNum.value) === no) {
            noNum.value = "";
            num++;
            eng = n2words(num, {lang: "en"});
            no = normalize(n2words(num, {lang: "nb"}));
            updateState();
        }
    }
}