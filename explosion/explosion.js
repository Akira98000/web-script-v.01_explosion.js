// Variable pour démarrer/arrêter la simulation
let run = false;

// Constantes physiques du système
const n = 30; // nombre de boules
const frottement = 0.01; // coefficient de frottement
const d = 1; // densité des boules
const dt = 0.05; // intervalle de temps
const rmax = 30; // rayon maximum des boules
const g = 9.41; // accélération due à la gravité
const theta_max = Math.PI / 2; // angle maximum d'incidence
const vmax = 100; // vitesse maximum

// Initialisation des tableaux
let cx = Array(n).fill(0); 
/* 
-> positions horizontales des boules
-> position horizontale initiale de toutes les boules
*/

let cy = Array(n).fill(0); 
/* 
-> positions verticales des boules
-> position verticale initiale de toutes les boules
*/

let vx = Array(n); // vitesses horizontales des boules
let vy = Array(n); // vitesses verticales des boules
let r = Array(n); // rayons des boules
let c = Array(n); // coefficients de frottement des boules
let m = Array(n); // masses des boules

// Initialisation des boules
for(let i=0; i < n; i++){
    // Calcul d'une vitesse et d'un angle d'incidence aléatoires
    let v = Math.random() * vmax;
    let theta_i = Math.random() * 2 * theta_max - theta_max;

    // Assignation des vitesses initiales
    vx[i] = v * Math.sin(theta_i);
    vy[i] = v * Math.cos(theta_i);

    // Assignation des rayons, coefficients de frottement et masses
    r[i] = Math.random() * rmax;
    c[i] = frottement * r[i];
    m[i] = Math.PI * (r[i] * r[i] * d);
}

// Récupération du groupe contenant les boules
let boules = document.getElementById("boules");

// Ajout des cercles dans le groupe
for(let i=0; i < n; i++){
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx[i]);
    circle.setAttribute("cy", cy[i]);
    circle.setAttribute("vx", vx[i]);
    circle.setAttribute("vy", vy[i]);
    circle.setAttribute("r", r[i]);
    boules.append(circle);
}

 function update(){
    // Récupérer les éléments du groupe <g>
    let elements = boules.getElementsByTagName("circle");

    // Mettre à jour les coordonnées et les vitesses de chaque boule
    for(let i=0; i < n ; i++){
        // Mettre à jour les coordonnées x et y
        cx[i] += dt * vx[i];
        cy[i] += dt * vy[i];

        // Mettre à jour les vitesses selon les lois de la mécanique (conservation de l'énergie)
        vx[i] = Math.pow((1 + ((dt * c[i]) / m[i])), -1) * (vx[i] + (dt * 0));
        vy[i] = Math.pow((1 + ((dt * c[i]) / m[i])), -1) * (vy[i] + (dt * -g));

        // Mettre à jour les attributs des cercles correspondants
        elements[i].setAttribute("cx", cx[i]); // Mise à jour de la position x de la boule i
        elements[i].setAttribute("cy", cy[i]); // Mise à jour de la position y de la boule i
        elements[i].setAttribute("vx", vx[i]); // Mise à jour de la vitesse x de la boule i
        elements[i].setAttribute("vy", vy[i]); // Mise à jour de la vitesse y de la boule i

    }
    // Si la variable globale "run" est vraie, appeler la fonction update() toutes les 10 ms
    if(run) {
        setTimeout(update, 10);
    }
}

function stop_and_go(){
    // Inverser la valeur de la variable 'run'
    run = !run;
    // Si 'run' est vrai, lancer la fonction update()
    if (run){
        update();
    }
}
// Détecter un clic de souris, qui déclenchera la fonction stop_and_go
document.addEventListener("click", stop_and_go);