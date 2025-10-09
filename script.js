//constante
const NUM_EXO = 15

//objet
//div
const DivIntro = document.getElementById("DivIntro")
const DivExo = document.getElementById("DivExo")
const DivDemanderSolu = document.getElementById("DivDemanderSolu")
const DivResultat = document.getElementById("DivResultat")

//bouton
const ButDebuter = document.getElementById("ButDebuter")
const ButValider = document.getElementById("ButValider")
const ButReussi = document.getElementById("ButReussi")
const ButEchec = document.getElementById("ButEchec")

//image
const ImgConsigne = document.getElementById("ImgConsigne")
const ImgSolution = document.getElementById("ImgSolution")

//texte
const TextTauxReussite = document.getElementById("TextTauxReussite")

//variables globales
var lastExo = []
var exoDone = 0
var exoCorrect = 0

for (var i = 1; i <= 15; i++) {
    console.log("git mv image/Exo/"+i+".PNG image/Exo/"+i+".png")
}

//initialisation
ButDebuter.addEventListener("click",function(){
    //on cache l'écran de démmarrage et on affiche le reste
    DivIntro.hidden = true
    DivExo.hidden = false
    DivDemanderSolu.hidden = false

    //on lance les events
    SetupMainEvent()
})

//on met en place toutes les events après que le bouton "ButDebuter" ait été cliquer
function SetupMainEvent() {
    //initialisation
    GetExo()

    ButValider.addEventListener("click", function() {
        //on affiche la solution
        ImgSolution.hidden = false
        DivResultat.hidden = false
        DivDemanderSolu.hidden = true
    })

    ButReussi.addEventListener("click", function() {
        exoCorrect++
        UpdateTauxReussite()
        GetExo()
    })

    ButEchec.addEventListener("click", function() {
        UpdateTauxReussite()
        GetExo()
    })
}

function UpdateTauxReussite() {
    var taux = Math.floor(exoCorrect/exoDone * 100)

    TextTauxReussite.hidden = false
    TextTauxReussite.textContent = "Taux de réussite : " + taux + "%"
}

function GetExo() {
    //on increment le nombre d'exo fait
    exoDone++

    //on cherche un exo random et on met l'image exo + solu
    var randExo
    
    do {
        randExo = GetRandInt(NUM_EXO)
    } while (isInList(lastExo, randExo))
    
    if (lastExo.length >= NUM_EXO - 2) {
        lastExo = []
    }
    else {
        lastExo.push(randExo)
    }

    //on affiche tout
    ImgConsigne.src = "image/Exo/"+randExo+".png"
    ImgSolution.src = "image/Solu/"+randExo+".png"

    ImgConsigne.hidden = false
    ImgSolution.hidden = true

    DivResultat.hidden = true
    DivDemanderSolu.hidden = false
}

function GetRandInt(max) {
    //on cherche un entier aléatoire entre 1 et max
    return Math.floor(Math.random() * (max - 1)) + 1
}

function isInList(list, element) {
    var result = false

    for (var i = 0; i < list.length; i++) {
        if (list[i] == element) {
            result = true
            break
        }
    }

    return result
}