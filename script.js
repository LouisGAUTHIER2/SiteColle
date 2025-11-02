//objet
//div
const DivIntro = document.getElementById("DivIntro")
const DivExo = document.getElementById("DivExo")
const DivDemanderSolu = document.getElementById("DivDemanderSolu")
const DivResultat = document.getElementById("DivResultat")

//bouton
const ButDebuter1 = document.getElementById("ButDebuter1")
const ButDebuter2 = document.getElementById("ButDebuter2")
const ButValider = document.getElementById("ButValider")
const ButReussi = document.getElementById("ButReussi")
const ButEchec = document.getElementById("ButEchec")
const ButRedo = document.getElementById("ButRedo")

//image
const ImgConsigne = document.getElementById("ImgConsigne")
const ImgSolution = document.getElementById("ImgSolution")

//texte
const TextTauxReussite = document.getElementById("TextTauxReussite")

//variables globales
var NUM_EXO = 61
var COLLE_NUM = 1
var lastExo = []
var exoDone = 0
var exoCorrect = 0

//initialisation
ButDebuter1.addEventListener("click",function(){
    //on cache l'écran de démmarrage et on affiche le reste
    DivIntro.hidden = true
    COLLE_NUM = 1
    NUM_EXO = 61

    //on lance les events
    SetupMainEvent()
})

ButDebuter2.addEventListener("click",function(){
    //on cache l'écran de démmarrage et on affiche le reste
    DivIntro.hidden = true
    COLLE_NUM = 2
    NUM_EXO = 43

    //on lance les events
    SetupMainEvent()
})

//pour tout relancer
ButRedo.addEventListener("click", function() {
    ButRedo.hidden = true
    TextTauxReussite.hidden = true

    exoDone = 0
    exoCorrect = 0
    lastExo = []

    DivExo.hidden = false

    GetExo()
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
    TextTauxReussite.textContent = "Taux de réussite : " + taux + "% avec "+exoDone+" exercices faits sur "+NUM_EXO
}

function GetExo() {
    if (lastExo.length >= NUM_EXO) {
        ButRedo.hidden = false

        ButValider.hidden = true
        DivExo.hidden = true
        DivResultat.hidden = true

        return
    }

    //on increment le nombre d'exo fait
    exoDone++

    //on cherche un exo random et on met l'image exo + solu
    var randExo
    
    do {
        randExo = GetRandInt(NUM_EXO)
    } while (isInList(lastExo, randExo))
    
    
    lastExo.push(randExo)

    //on affiche tout
    ImgConsigne.src = "image/"+COLLE_NUM+"/Exo/"+randExo+".png"
    ImgSolution.src = "image/"+COLLE_NUM+"/Solu/"+randExo+".png"

    ImgConsigne.hidden = false
    ImgSolution.hidden = true

    DivResultat.hidden = true
    DivDemanderSolu.hidden = false

    DivExo.hidden = false
    ButValider.hidden = false
}

function GetRandInt(max) {
    //on cherche un entier aléatoire entre 1 et max
    return Math.floor(Math.random() * max) + 1
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