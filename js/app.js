

//vars
var ancho = 700;
var alto = 300;
var canvas, ctx;




// init program
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    cargarImg();

// borrar canvas

function borrarCanvas(){
    canvas.width = ancho;
    canvas.height = alto;
}

// buble principal  

var FPS = 40;

setInterval(function(){
    principal();
},1000/FPS);
    
function principal(){
    console.log('principal');
    borrarCanvas();
    dibujaAvatar();
    gravedad();
    dibujaObstaculo();
    logicaObstaculo();
    dibujaSuelo();
    logicaSuelog()
    colision();
    puntuacion();
    
}

// cargar imagenes

var imgAvatar, imgFloor, imgObstaculo;

function cargarImg(){
    imgAvatar = new Image();
    imgFloor = new Image();
    imgObstaculo = new Image();



    imgAvatar.src = './assets/popo.png'
    imgFloor.src = './assets/piso.png'
    imgObstaculo.src = './assets/obstaculoGabriel.png'
}


// Objetos

// Objeto avatar
const suelo = 190;
const avatar = {
    y: suelo,
    vy: 0,
    gravedad: 2,
    salto: 28,
    vymax: 9,
    saltando: false
}

// Objeto nivel

const nivel = {
    velocidad: 9,
    marcador: 0,
    muerte: false
};

// Obstaculo

const obstaculo = {
    x: ancho + 100,
    y: suelo - 20
}

// const suelografico

const suelog = {
    x: 0,
    y: 240
}

// dibujar al Avatar

function dibujaAvatar(){
    // posicion del cliping los parametros despues de la img,
    // los otros 2 parametros son el tamaño img
    // los otros 2 parame
    ctx.drawImage(imgAvatar, 0, 0, 65, 65, 100, avatar.y, 50, 50,);
} 

// logica del Avatar
// saltar  
function saltar(){
    avatar.saltando = true;
    avatar.vy = avatar.salto;
}
// gravedad
function gravedad(){
    if(avatar.saltando){
        if(avatar.y - avatar.vy - avatar.gravedad > suelo){
            //hace que vuela a donde estaba
            avatar.saltando = false;
            avatar.vy = 0;
            // lo dejams en su posicion
            avatar.y = suelo;
        }else{
        avatar.vy -= avatar.gravedad;
        avatar.y -= avatar.vy;
        }   
    }
}

// dibujar al obstaculo
function dibujaObstaculo(){
    ctx.drawImage(imgObstaculo, 0, 0, 65, 65, obstaculo.x, obstaculo.y, 65, 75);
}

// Logica del Obstaculo
 function logicaObstaculo(){
     if(obstaculo.x < -100){
         obstaculo.x = ancho + 100;
         nivel.marcador += 1;
     }else{
         obstaculo.x -= nivel.velocidad;
     }
 }

 // Cliping es para recortar la img, y empience desde una parte
 // dibujar el piso
function dibujaSuelo(){
    ctx.drawImage(imgFloor, suelog.x, 0, 700, 150, 0, suelog.y, 700, 150);
}

// Logica del piso
 function logicaSuelog(){
     if(suelog.x > 700){
         suelog.x = 0;
     }else{
        suelog.x += nivel.velocidad;
     }
 }

 // Colision

 function colision(){
    // obstaculo.x
    // avatar.x
    if(obstaculo.x >= 100 && obstaculo.x <= 130){
        if(avatar.y >= suelo - 15){
            nivel.muerte = true;
            nivel.velocidad = 0;
            nivel.marcador = 0;
        }
        
    }
 }

 // puntuacion

 function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillStyle = '#55555';
    ctx.fillText(`${nivel.marcador}`, 600, 50);

    if(nivel.muerte == true){
        ctx.font = "60px impact";
        ctx.fillText(`Game Over`, 240, 150);
    }

    switch(nivel.marcador){
        case 6:
            nivel.velocidad = 18;
            subisteNivel();
            break;
        case 15:
            nivel.velocidad = 27;
            subisteNivel();
            break;
        case 20:
            nivel.velocidad = 37;
            subisteNivel();
            break;
    }
}

function subisteNivel(){
    ctx.font = "40px impact";
    ctx.fillStyle = '#2d572c'
    ctx.fillText(`You are POOP`, 240, 150);

    setTimeout(function(){ 
         ctx.fillStyle(``);
    }, 5000);
}

// Events keyWord

document.addEventListener('onmousedown', function(e){
    if(e.button == 32){
        
        if(nivel.muerte == false){

            if(avatar.saltando !== true){
                saltar();
            }
        }else{
            nivel.velocidad = 9;
            avatar.x = ancho + 100;
            nivel.muerte = false;
            obstaculo.x = ancho + 100;
        }
    }
});
