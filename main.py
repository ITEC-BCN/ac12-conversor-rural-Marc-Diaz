@namespace
class SpriteKind:
    Product = SpriteKind.create()
    Objeto = SpriteKind.create()
    Arbol = SpriteKind.create()
def talar():
    info.change_score_by(5)
    pause(500)

def on_on_overlap(sprite2, otherSprite2):
    jugador.start_effect(effects.hearts, 100)
    if controller.A.is_pressed() and jugador.overlaps_with(ordenador):
        entrar_menu()
    elif controller.A.is_pressed() and jugador.overlaps_with(arbol):
        talar()
sprites.on_overlap(SpriteKind.player, SpriteKind.Objeto, on_on_overlap)

def comprar_producto(nombre: str, precio: number, cantidad_dada: number, i: number):
    global cantidad_productos
    texto = "" + nombre + " - " + ("" + str(precio))
    game.show_long_text(texto, DialogLayout.BOTTOM)
    cantidad_pedida = game.ask_for_number("Cuanto quieres comprar?")
    precio_final = Math.round(precio / cantidad_dada)
    precio_final = precio_final * cantidad_pedida
    if info.score() - precio_final > 0:
        info.set_score(info.score() - precio_final)
        cantidad_productos[i] = cantidad_productos[i] + cantidad_pedida
    else:
        game.show_long_text("No tienes suficiente madera", DialogLayout.BOTTOM)
def entrar_menu():
    global salir, gallina, huevo, patata, cabra, caballo
    pause(200)
    salir = sprites.create(assets.image("""
        salir
        """), SpriteKind.Product)
    salir.set_position(10, 10)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Objeto)
    jugador.set_image(assets.image("""
        cursor
        """))
    tiles.set_current_tilemap(tilemap("""
        level
        """))
    gallina = sprites.create(assets.image("""
        Gallina
        """), SpriteKind.Product)
    gallina.set_position(50, 20)
    huevo = sprites.create(assets.image("""
        huevo azul
        """), SpriteKind.Product)
    huevo.set_position(50, 60)
    patata = sprites.create(assets.image("""
            patata by mich
            """),
        SpriteKind.Product)
    patata.set_position(120, 20)
    cabra = sprites.create(assets.image("""
            ft Michelle para Ray ❤️
            """),
        SpriteKind.Product)
    cabra.set_position(120, 60)
    caballo = sprites.create(assets.image("""
        caballo
        """), SpriteKind.Product)
    caballo.set_position(90, 90)

def on_on_overlap2(sprite, otherSprite):
    pause(200)
    jugador.start_effect(effects.hearts, 100)
    if controller.A.is_pressed() and jugador.overlaps_with(salir):
        salir_menu()
    elif controller.A.is_pressed() and jugador.overlaps_with(caballo):
        comprar_producto("Caballo", 12, 1, 0)
    elif controller.A.is_pressed() and jugador.overlaps_with(cabra):
        comprar_producto("Cabra", 12, 1, 1)
    elif controller.A.is_pressed() and jugador.overlaps_with(gallina):
        comprar_producto("Gallina", 6, 1, 2)
    elif controller.A.is_pressed() and jugador.overlaps_with(huevo):
        comprar_producto("Huevo", 3, 12, 3)
    elif controller.A.is_pressed() and jugador.overlaps_with(patata):
        comprar_producto("Patata", 2, 1.5, 4)
sprites.on_overlap(SpriteKind.player, SpriteKind.Product, on_on_overlap2)

def init():
    global ordenador, arbol
    tiles.set_current_tilemap(tilemap("""
        plaza
        """))
    ordenador = sprites.create(assets.image("""
        ordenador
        """), SpriteKind.Objeto)
    ordenador.set_position(20, 20)
    arbol = sprites.create(assets.image("""
        arbol
        """), SpriteKind.Objeto)
    arbol.set_position(120, 20)
def salir_menu():
    pause(200)
    jugador.set_bounce_on_wall(True)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Product)
    jugador.set_image(assets.image("""
        myImage
        """))
    init()
caballo: Sprite = None
cabra: Sprite = None
patata: Sprite = None
huevo: Sprite = None
gallina: Sprite = None
salir: Sprite = None
precio_final = 0
cantidad_pedida = 0
texto = ""
arbol: Sprite = None
ordenador: Sprite = None
jugador: Sprite = None
texto2 = ""
cantidad_pedida2 = 0
precio_final2 = 0
cantidad_productos = [0, 0, 0, 0, 0]
jugador = sprites.create(img("""
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
        """),
    SpriteKind.player)
controller.move_sprite(jugador, 100, 100)
jugador.set_bounce_on_wall(True)
info.set_score(100)
init()