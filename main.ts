namespace SpriteKind {
    export const Product = SpriteKind.create()
    export const Objeto = SpriteKind.create()
    export const Arbol = SpriteKind.create()
}
function talar () {
    info.changeScoreBy(5)
    pause(500)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Objeto, function (sprite2, otherSprite2) {
    jugador.startEffect(effects.hearts, 100)
    if (controller.A.isPressed() && jugador.overlapsWith(ordenador)) {
        entrar_menu()
    } else if (controller.A.isPressed() && jugador.overlapsWith(arbol)) {
        talar()
    }
})
function comprar_producto (nombre: string, precio: number, cantidad_dada: number, i: number) {
    texto = "" + nombre + " - " + ("" + precio)
    game.showLongText(texto, DialogLayout.Bottom)
    cantidad_pedida = game.askForNumber("Cuanto quieres comprar?")
    precio_final = Math.round(precio / cantidad_dada)
    precio_final = precio_final * cantidad_pedida
    if (info.score() - precio_final > 0) {
        info.setScore(info.score() - precio_final)
        cantidad_productos[i] = cantidad_productos[i] + cantidad_pedida
    } else {
        game.showLongText("No tienes suficiente madera", DialogLayout.Bottom)
    }
}
function entrar_menu () {
    pause(200)
    salir = sprites.create(assets.image`salir`, SpriteKind.Product)
    salir.setPosition(10, 10)
    sprites.destroyAllSpritesOfKind(SpriteKind.Objeto)
    jugador.setImage(assets.image`cursor`)
    tiles.setCurrentTilemap(tilemap`level`)
    gallina = sprites.create(assets.image`Gallina`, SpriteKind.Product)
    gallina.setPosition(50, 40)
    huevo = sprites.create(assets.image`huevo azul`, SpriteKind.Product)
    huevo.setPosition(50, 80)
    patata = sprites.create(assets.image`patata by mich`, SpriteKind.Product)
    patata.setPosition(120, 40)
    cabra = sprites.create(assets.image`ft Michelle para Ray ❤️`, SpriteKind.Product)
    cabra.setPosition(120, 80)
    caballo = sprites.create(assets.image`caballo`, SpriteKind.Product)
    caballo.setPosition(90, 100)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Product, function (sprite, otherSprite) {
    pause(200)
    jugador.startEffect(effects.hearts, 100)
    if (controller.A.isPressed() && jugador.overlapsWith(salir)) {
        salir_menu()
    } else if (jugador.overlapsWith(caballo)) {
        caballo.sayText(cantidad_productos[0])
        if (controller.A.isPressed()) {
            comprar_producto("Caballo", 12, 1, 0)
        }
    } else if (jugador.overlapsWith(cabra)) {
        cabra.sayText(cantidad_productos[1])
        if (controller.A.isPressed()) {
            comprar_producto("Cabra", 12, 1, 1)
        }
    } else if (jugador.overlapsWith(gallina)) {
        gallina.sayText(cantidad_productos[2])
        if (controller.A.isPressed()) {
            comprar_producto("Gallina", 6, 1, 2)
        }
    } else if (jugador.overlapsWith(huevo)) {
        huevo.sayText(cantidad_productos[3])
        if (controller.A.isPressed()) {
            comprar_producto("Huevo", 3, 12, 3)
        }
    } else if (jugador.overlapsWith(patata)) {
        patata.sayText(cantidad_productos[4])
        if (controller.A.isPressed()) {
            comprar_producto("Patata", 2, 1.5, 4)
        }
    }
})
function init () {
    tiles.setCurrentTilemap(tilemap`plaza`)
    ordenador = sprites.create(assets.image`ordenador`, SpriteKind.Objeto)
    ordenador.setPosition(20, 20)
    arbol = sprites.create(assets.image`arbol`, SpriteKind.Objeto)
    arbol.setPosition(120, 20)
}
function salir_menu () {
    pause(200)
    jugador.setBounceOnWall(true)
    sprites.destroyAllSpritesOfKind(SpriteKind.Product)
    jugador.setImage(assets.image`myImage`)
    init()
}
let caballo: Sprite = null
let cabra: Sprite = null
let patata: Sprite = null
let huevo: Sprite = null
let gallina: Sprite = null
let salir: Sprite = null
let precio_final = 0
let cantidad_pedida = 0
let texto = ""
let arbol: Sprite = null
let ordenador: Sprite = null
let jugador: Sprite = null
let cantidad_productos: number[] = []
let precio_final22 = 0
let cantidad_pedida22 = 0
let texto22 = ""
let texto2 = ""
let cantidad_pedida2 = 0
let precio_final2 = 0
cantidad_productos = [
0,
0,
0,
0,
0
]
jugador = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(jugador, 100, 100)
jugador.setBounceOnWall(true)
info.setScore(100)
init()
