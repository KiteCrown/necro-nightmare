namespace SpriteKind {
    export const chose = SpriteKind.create()
    export const crowProjectlie = SpriteKind.create()
    export const crowBoss = SpriteKind.create()
    export const entrance = SpriteKind.create()
    export const healther = SpriteKind.create()
    export const blacksmith = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -240
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    tiles.loadMap(tiles.createSmallMap(tilemap`level26`))
    tiles.setCurrentTilemap(tilemap`level22`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.crowBoss, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    mySprite.startEffect(effects.fire, 3000)
    timer.after(3000, function () {
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
    })
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.crowBoss, function (sprite, otherSprite) {
    coin = sprites.create(img`
        . . b b b b . . 
        . b 2 2 2 2 b . 
        b 2 2 3 3 2 2 b 
        b 2 3 2 2 3 2 b 
        c 2 3 2 2 3 2 c 
        c 2 2 3 3 2 2 c 
        . f 2 2 2 2 f . 
        . . f f f f . . 
        `, SpriteKind.Food)
    animation.runImageAnimation(
    coin,
    [img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `,img`
        . . b b b . . . 
        . b 5 5 5 b . . 
        b 5 d 3 d 5 b . 
        b 5 3 5 1 5 b . 
        c 5 3 5 1 d c . 
        c 5 d 1 d d c . 
        . f d d d f . . 
        . . f f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 d 1 5 b . 
        . b 5 3 1 5 b . 
        . c 5 3 1 d c . 
        . c 5 1 d d c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . . b 1 1 b . . 
        . . b 5 5 b . . 
        . . b d d b . . 
        . . c d d c . . 
        . . c 3 3 c . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 1 d 5 b . 
        . b 5 1 3 5 b . 
        . c d 1 3 5 c . 
        . c d d 1 5 c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b b . . 
        . . b 5 5 5 b . 
        . b 5 d 3 d 5 b 
        . b 5 1 5 3 5 b 
        . c d 1 5 3 5 c 
        . c d d 1 d 5 c 
        . . f d d d f . 
        . . . f f f . . 
        `],
    100,
    true
    )
    coin.setPosition(otherSprite.x, otherSprite.y)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
    statusbar.value += -100
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.entrance, function (sprite, otherSprite) {
    tiles.loadMap(tiles.createSmallMap(tilemap`level20`))
    sprites.destroy(entranceLv2)
    for (let value of tiles.getTilesByType(assets.tile`myTile4`)) {
        zombieHealther = sprites.create(img`
            . . 6 6 3 3 . . 
            . . 1 6 1 3 . . 
            . . 6 6 6 8 . . 
            . . 3 6 8 3 . . 
            . 6 3 8 8 3 6 . 
            . 6 8 3 8 8 6 . 
            . . 8 8 8 3 . . 
            . . 8 . . 3 . . 
            `, SpriteKind.healther)
        tiles.placeOnTile(zombieHealther, value)
        tiles.setTileAt(value, assets.tile`tile3`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
        blacksmith = sprites.create(img`
            . . a a a a . . . . . . . 
            . a a a a a a . . . . . . 
            . . 1 6 1 3 . . . . . . . 
            . . 6 6 6 8 . . . . . . . 
            . 6 3 6 8 3 6 . . . . . . 
            . 6 3 8 8 8 6 . 9 . . . . 
            . . 8 8 8 3 9 9 9 9 . . . 
            . . 8 . . 3 . . 9 . . . . 
            `, SpriteKind.blacksmith)
        tiles.placeOnTile(blacksmith, value)
        tiles.setTileAt(value, assets.tile`tile3`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    scene.setBackgroundImage(img`
        cc99ccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccc99ccccccccccc
        cccc69cccccccccccccccccccccccccccccccc9ccccccccccccccccccccccc9ccccccccccccccccccccccccc9ccccccccccccccccccccccc9cccccccccccccccccccccccccccccccc96ccccccccccccc
        cccccc99ccccccccccccccccccccccccccccccc9cccccccccccccccccccccc9ccccccccccccccccccccccccc9cccccccccccccccccccccc9ccccccccccccccccccccccccccccccc99ccccccccccccccc
        cccccccc99cccccccccccccccccccccccccccccc9cccccccccccccccccccccc9ccccccccccccccccccccccc9cccccccccccccccccccccc9cccccccccccccccccccccccccccccc99ccccccccccccccccc
        ccccccccccc99cccccccccccccccccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccc9cccccccccccccccccccccccccccccccccccccccccccccccccc99cccccccccccccccccccc
        cccccccccccc99cccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc9cccccccccccccccccccccccccccc99ccccccccccccccccccccc
        ccccccccccccccc69ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc96cccccccccccccccccccccccc
        cccccccccccccccccc99ccccccccccccccccccccccccc9cccccccccccccccccc9ccccccccccccccccccccc9cccccccccccccccccc9ccccccccccccccccccccccccc99cccccccccccccccccccccccccc9
        cccccccccccccccccccc69cccccccccccccccccccccccc9cccccccccccccccccc9ccccccccccccccccccc9cccccccccccccccccc9cccccccccccccccccccccccc96cccccccccccccccccccccccc99ccc
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        66cccccccccccccccccccccc69cccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccccccccccccccccccc9cccccccccccccccccccccc96cccccccccccccccccccccc66ccccccccc
        cccc66ccccccccccccccccccccc69ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc96ccccccccccccccccccccc66ccccccccccccc
        cccccccc66cccccccccccccccccccc99ccccccccccccccccccc9cccccccccccccc9ccccccccccccccccc9cccccccccccccc9ccccccccccccccccccc99cccccccccccccccccccc66ccccccccccccccccc
        cccccccccc66ccccccccccccccccccc99ccccccccccccccccccccccccccccccccc9ccccccccccccccccc9ccccccccccccccccccccccccccccccccc99ccccccccccccccccccc66cccccccccccccccccc6
        cccccccccccccc66cccccccccccccccccc99ccccccccccccccccc9ccccccccccccc9ccccccccccccccc9ccccccccccccc9ccccccccccccccccc99cccccccccccccccccc66ccccccccccccccccc666ccc
        66cccccccccccccccc66cccccccccccccccc66cccccccccccccccc6ccccccccccccccccccccccccccccccccccccccccc6cccccccccccccccc66cccccccccccccccc66cccccccccccccccc668cccccccc
        cc666ccccccccccccccc66cccccccccccccccc66ccccccccccccccc6ccccccccccccccccccccccccccccccccccccccc6ccccccccccccccc66cccccccccccccccc66ccccccccccccccc666ccccccccccc
        ccccccc866cccccccccccccc66cccccccccccccc86cccccccccccccc6ccccccccccc6ccccccccccccc6ccccccccccc6cccccccccccccc68cccccccccccccc66cccccccccccccc668cccccccccc8888cc
        8888cccccccc8666cccccccccccc66ccccccccccccc86ccccccccccccccccccccccc6ccccccccccccc6ccccccccccccccccccccccc68ccccccccccccc66cccccccccccc6668cccccccc8888ccccccccc
        cccccc8888cccccccc666ccccccccccc88cccccccccccc66ccccccccccc6ccccccccc6ccccccccccc6ccccccccc6ccccccccccc66cccccccccccc88ccccccccccc666cccccccc8888ccccccccccc8888
        cccccccccc8888cccccc8888cccccccccc88ccccccccccc86cccccccccccccccccccc6ccccccccccc6cccccccccccccccccccc68ccccccccccc88cccccccccc8888cccccc8888ccccccccccc888888ff
        8888888888888888888888888888888888888888888888888866666666666666666666666666666666666666666666666666688888888888888888888888888888888888888888888888888888888888
        8ffffffff8888888fffffff8888ffff888ffffffff88ffffffff88ffffffff6fffffff6fffffffff6fffffff6ffffffff88ffffffff88ffffffff888ffff8888fffffff8888888ffffffff88888fffff
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        ff88888fff888888fffffff888888ffff8888ff888ffffff88ffffff88ffffff8ffffff8fffffff8ffffff8ffffff88ffffff88ffffff888ff8888ffff888888fffffff888888fff88888ffff8888fff
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        ff88888fff888888fffffff888888ffff8888cc888cccccc88cccccc88cccccc8cccccc8ccccccc8cccccc8cccccc88cccccc88cccccc888cc8888ffff888888fffffff888888fff88888ffff8888fff
        888888ffffffff888888ffffff8888ffff888ccccccc88cccccccc88ccccccc6cccccc6ccccccccc6cccccc6ccccccc88cccccccc88ccccccc888ffff8888ffffff888888ffffffff888888fffffffff
        8ffffffff8888888fffffff8888ffff888cccccccc88cccccccc88cccccccc6ccccccc6ccccccccc6ccccccc6cccccccc88cccccccc88cccccccc888ffff8888fffffff8888888ffffffff88888fffff
        8888888888888888888888888888888888888888888888888866666666666666666666666666666666666666666666666666688888888888888888888888888888888888888888888888888888888888
        cccccccccc8888cccccc8888cccccccccc88ccccccccccc86cccccccccccccccccccc6ccccccccccc6cccccccccccccccccccc68ccccccccccc88cccccccccc8888cccccc8888ccccccccccc888888cc
        ccc8888cccccccc866cccccccccccc66cccccccccccc86cccccccccccc6cccccccccc6ccccccccccc6cccccccccc6cccccccccccc68cccccccccccc66cccccccccccc668cccccccc8888cccccccccccc
        8888cccccccc8666cccccccccccc66ccccccccccccc86ccccccccccccccccccccccc6ccccccccccccc6ccccccccccccccccccccccc68ccccccccccccc66cccccccccccc6668cccccccc8888ccccccccc
        ccccccc866cccccccccccccc66cccccccccccccc86cccccccccccccc6ccccccccccc6ccccccccccccc6ccccccccccc6cccccccccccccc68cccccccccccccc66cccccccccccccc668cccccccccc8888cc
        cc666ccccccccccccccc66cccccccccccccccc66ccccccccccccccc6ccccccccccccccccccccccccccccccccccccccc6ccccccccccccccc66cccccccccccccccc66ccccccccccccccc666ccccccccccc
        cccccccccccccccc66ccccccccccccccccc99cccccccccccccccccccccccccccccc9ccccccccccccccc9cccccccccccccccccccccccccccccc99ccccccccccccccccc66cccccccccccccccc6668ccccc
        cccccccccccccc66cccccccccccccccccc99ccccccccccccccccc9ccccccccccccc9ccccccccccccccc9ccccccccccccc9ccccccccccccccccc99cccccccccccccccccc66ccccccccccccccccc666ccc
        cccccccccc66ccccccccccccccccccc99ccccccccccccccccccccccccccccccccc9ccccccccccccccccc9ccccccccccccccccccccccccccccccccc99ccccccccccccccccccc66cccccccccccccccccc6
        cccccc66cccccccccccccccccccc99cccccccccccccccccccc9ccccccccccccccc9ccccccccccccccccc9ccccccccccccccc9cccccccccccccccccccc99cccccccccccccccccccc66ccccccccccccccc
        cccc66ccccccccccccccccccccc69ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc96ccccccccccccccccccccc66ccccccccccccc
        66cccccccccccccccccccccc69cccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccccccccccccccccccc9cccccccccccccccccccccc96cccccccccccccccccccccc66ccccccccc
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        ccccccccccccccccccc69ccccccccccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccccccccc96ccccccccccccccccccccccccc99f
        cccccccccccccccccc99ccccccccccccccccccccccccc9cccccccccccccccccc9ccccccccccccccccccccc9cccccccccccccccccc9ccccccccccccccccccccccccc99cccccccccccccccccccccccccc9
        ccccccccccccccc69ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc96cccccccccccccccccccccccc
        cccccccccccc99cccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc9cccccccccccccccccccccccccccc99ccccccccccccccccccccc
        cccccccccc99ccccccccccccccccccccccccccccc9ccccccccccccccccccccc9ccccccccccccccccccccccc9ccccccccccccccccccccc9ccccccccccccccccccccccccccccc99ccccccccccccccccccc
        cccccccc99cccccccccccccccccccccccccccccc9cccccccccccccccccccccc9ccccccccccccccccccccccc9cccccccccccccccccccccc9cccccccccccccccccccccccccccccc99ccccccccccccccccc
        cccccc99ccccccccccccccccccccccccccccccc9cccccccccccccccccccccc9ccccccccccccccccccccccccc9cccccccccccccccccccccc9ccccccccccccccccccccccccccccccc99ccccccccccccccc
        ccc99ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc99cccccccccccc
        cc99ccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccc99ccccccccccc
        9cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccc9cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc99cccccccc
        cccccccccccccccccccccccccccccccccc9cccccccccccccccccccccccccc9ccccccccccccccccccccccccccc9cccccccccccccccccccccccccc9cccccccccccccccccccccccccccccccccccc99ccccc
        ccccccccccccccccccccccccccccccccc9cccccccccccccccccccccccccc9ccccccccccccccccccccccccccccc9cccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccc99ccc
        cccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccc9cccccccccccccccccccccccccccccccccccccc96c
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccc9cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccc9cccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccc9cccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccc
        ccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc9cccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccc
        ccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccc9cccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccc9ccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccccccccc9ccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        `)
    tiles.loadMap(tiles.createSmallMap(tilemap`level8`))
    tiles.placeOnRandomTile(mySprite, assets.tile`transparency8`)
    crowReaper = sprites.create(img`
        ..................
        ...............ff.
        ........fffffffff.
        .....fffffffffff..
        .....fffffffff....
        .....fffffffffff..
        ......fffffff.....
        ...ffffffffff.....
        ..ff1fffffff......
        .fffffffffff......
        ....ffffffff......
        .....ffffffff.....
        ......fffffffff...
        .......ffffffffff.
        ......2.2...ff....
        .....2............
        ..................
        ..................
        `, SpriteKind.crowBoss)
    crowReaper.setPosition(148, 3)
    crowReaper.ay = 500
    controller.moveSprite(mySprite, 0, 0)
    timer.after(590, function () {
        crowReaper.setImage(img`
            ..................
            ..................
            ..................
            ..................
            .ffff.............
            fff1ff............
            ..ffffffff.....f..
            ...ffffffffffff...
            ...ffffffffffff...
            ....ffffffffff....
            .....ffffffff.....
            ......fffffff.....
            .......fffff......
            ........2.2.......
            ........2.2.......
            ..................
            ..................
            ..................
            `)
        crowReaper.vx = 0
        timer.after(500, function () {
            myTextSprite = fancyText.create("reaper crow")
            myTextSprite.setPosition(74, 19)
            statusbar = statusbars.create(40, 4, StatusBarKind.EnemyHealth)
            statusbar.attachToSprite(crowReaper)
            statusbar.setColor(12, 15)
            statusbar.setBarBorder(1, 6)
            fancyText.setAnimationSound(myTextSprite, music.createSoundEffect(
            WaveShape.Sawtooth,
            0,
            3781,
            255,
            0,
            2000,
            SoundExpressionEffect.None,
            InterpolationCurve.Linear
            ))
            fancyText.setFont(myTextSprite, fancyText.gothic_large)
            fancyText.animateForTime(myTextSprite, 500, fancyText.AnimationPlayMode.UntilDone)
            controller.moveSprite(mySprite, 100, 0)
            timer.after(500, function () {
                controller.moveSprite(mySprite, 100, 0)
                sprites.destroy(myTextSprite)
                boss1_fight_start = 1
            })
        })
    })
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (attack == 1) {
        if (face == 1) {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, mySprite, 50, 0)
            animation.runImageAnimation(
            projectile,
            [img`
                . . . . . . 1 1 1 1 1 . . . . . 
                . . . . . . . b b 1 1 1 1 1 . . 
                . . . . . . . . . b b 1 1 1 1 1 
                . . . . . . . . . . . b b b 1 1 
                . . . . . . . . . . b b b 1 1 1 
                . . . . . . . . . b 1 1 1 1 1 . 
                . . . . . . . b b 1 1 1 . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . 1 1 1 . . 
                . . . . . . . . . b b 1 1 1 1 1 
                . . . . . . . . . . . b b b 1 1 
                . . . . . . . . . . b b b 1 1 1 
                . . . . . . . . . b 1 1 1 1 1 . 
                . . . . . . . b b 1 1 1 . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . 1 1 
                . . . . . . . . . . . b b b 1 1 
                . . . . . . . . . . b b b 1 1 1 
                . . . . . . . . . b 1 1 1 1 1 . 
                . . . . . . . b b 1 1 1 . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . b b b 1 1 1 
                . . . . . . . . . b 1 1 1 1 1 . 
                . . . . . . . b b 1 1 1 . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . b b 1 1 1 . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            50,
            false
            )
        } else {
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, mySprite, -50, 0)
            animation.runImageAnimation(
            projectile,
            [img`
                . . . . . 1 1 1 1 1 . . . . . . 
                . . 1 1 1 1 1 b b . . . . . . . 
                1 1 1 1 1 b b . . . . . . . . . 
                1 1 b b b . . . . . . . . . . . 
                1 1 1 b b b . . . . . . . . . . 
                . 1 1 1 1 1 b . . . . . . . . . 
                . . . . 1 1 1 b b . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . 1 1 1 . . . . . . . . . . . 
                1 1 1 1 1 b b . . . . . . . . . 
                1 1 b b b . . . . . . . . . . . 
                1 1 1 b b b . . . . . . . . . . 
                . 1 1 1 1 1 b . . . . . . . . . 
                . . . . 1 1 1 b b . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                1 1 . . . . . . . . . . . . . . 
                1 1 b b b . . . . . . . . . . . 
                1 1 1 b b b . . . . . . . . . . 
                . 1 1 1 1 1 b . . . . . . . . . 
                . . . . 1 1 1 b b . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                1 1 1 b b b . . . . . . . . . . 
                . 1 1 1 1 1 b . . . . . . . . . 
                . . . . 1 1 1 b b . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . 1 1 1 b b . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            50,
            false
            )
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.blacksmith, function (sprite, otherSprite) {
    otherSprite.sayText("30 = 5 hp.")
    if (controller.A.isPressed()) {
        if (info.score() > 29) {
            info.changeLifeBy(5)
            info.changeScoreBy(-30)
            music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.UntilDone)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.crowProjectlie, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite)
    scene.cameraShake(4, 500)
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    mySprite.startEffect(effects.fire, 3000)
    timer.after(3000, function () {
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
    })
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    face = 0
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . 
        . . 7 7 . . 2 . 
        . . 7 7 7 7 . . 
        . 7 7 7 7 7 7 . 
        . . b b b b . . 
        . . 1 b 1 b . . 
        . . 7 7 7 7 . . 
        . . e . . e . . 
        `,img`
        . . . . . . . . 
        . . 7 7 7 7 2 . 
        . . 7 7 7 7 7 . 
        . 7 b b b b . . 
        . . 1 b 1 b . . 
        . . 7 7 7 7 . . 
        . . e . . e . . 
        . . e . . . . . 
        `,img`
        . . 7 7 . . 2 . 
        . . 7 7 7 7 . . 
        . 7 7 7 7 7 7 . 
        . . b b b b . . 
        . . 1 b 1 b . . 
        . . 7 7 7 7 . . 
        . . . e e . . . 
        . . . e . . . . 
        `,img`
        . . 7 7 . . 2 . 
        . . 7 7 7 7 . . 
        . 7 7 7 7 7 7 . 
        . . b b b b . . 
        . . 1 b 1 b . . 
        . . 7 7 7 7 . . 
        . . . e e . . . 
        . . . . e . . . 
        `,img`
        . . 7 7 . . 2 . 
        . . 7 7 7 7 . . 
        . 7 7 7 7 7 7 . 
        . . b b b b . . 
        . . 1 b 1 b . . 
        . . 7 7 7 7 . . 
        . . e . . e . . 
        . . . . . e . . 
        `,img`
        . . . . . . . . 
        . . 7 7 . 2 . . 
        . 7 7 7 7 7 . . 
        . . 7 7 7 7 7 . 
        . . b b b b . . 
        . . 1 b 1 b . . 
        . . 7 7 7 7 . . 
        . . e . . e . . 
        `],
    50,
    true
    )
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
    mySprite.setImage(img`
        . . . . . . . . 
        . 2 . . 7 7 . . 
        . . 7 7 7 7 . . 
        . 7 7 7 7 7 7 . 
        . . b b b b . . 
        . . b 1 b 1 . . 
        . . 7 7 7 7 . . 
        . . e . . e . . 
        `)
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
    mySprite.setImage(img`
        . . . . . . . . 
        . . 7 7 . . 2 . 
        . . 7 7 7 7 . . 
        . 7 7 7 7 7 7 . 
        . . b b b b . . 
        . . 1 b 1 b . . 
        . . 7 7 7 7 . . 
        . . e . . e . . 
        `)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    boss1_fight_start = 0
    attack = 0
    sprites.destroy(crowReaper, effects.warmRadial, 500)
    sprites.destroy(statusbar)
    entranceLv2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . 2 1 1 1 1 2 . . . . . 
        . . . . . . 3 1 1 3 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.entrance)
    animation.runImageAnimation(
    entranceLv2,
    [img`
        . . . . . . . . . 2 2 2 2 . . . 
        . . . . . . . 2 2 1 1 1 1 2 . . 
        . . . . 2 2 3 3 1 1 1 1 1 1 . . 
        . . 3 3 3 3 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 3 3 2 2 3 1 1 1 1 1 1 1 . . 
        . . . . . . 2 2 3 1 1 1 1 2 . . 
        . . . . . . . . . 2 2 2 2 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 3 1 3 . . . 
        . . . . . . . . . . 3 1 3 . . . 
        . . . . . . . . . . 2 1 3 2 . . 
        . . . . . . . . . . 2 1 3 2 . . 
        . . . . . . . . . 2 3 1 1 3 . . 
        . . . . . . . . . 2 1 1 1 3 2 . 
        . . . . . . . . . 3 1 1 1 1 2 . 
        . . . . . . . . 2 1 1 1 1 1 1 2 
        . . . . . . . . 2 1 1 1 1 1 1 2 
        . . . . . . . . 2 1 1 1 1 1 1 2 
        . . . . . . . . 2 1 1 1 1 1 1 2 
        . . . . . . . . . 2 1 1 1 1 2 . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . 2 2 2 2 . . . . . . . . . 
        . . 2 1 1 1 1 3 2 2 . . . . . . 
        . . 1 1 1 1 1 1 1 3 2 2 3 3 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 3 3 3 3 . . 
        . . 1 1 1 1 1 1 3 3 2 2 . . . . 
        . . 2 1 1 1 1 2 2 . . . . . . . 
        . . . 2 2 2 2 . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . 2 1 1 1 1 2 . . . . . . . . . 
        2 1 1 1 1 1 1 2 . . . . . . . . 
        2 1 1 1 1 1 1 2 . . . . . . . . 
        2 1 1 1 1 1 1 2 . . . . . . . . 
        2 1 1 1 1 1 1 2 . . . . . . . . 
        . 2 1 1 1 1 3 . . . . . . . . . 
        . 2 3 1 1 1 2 . . . . . . . . . 
        . . 3 1 1 3 2 . . . . . . . . . 
        . . 2 3 1 2 . . . . . . . . . . 
        . . 2 3 1 2 . . . . . . . . . . 
        . . . 3 1 3 . . . . . . . . . . 
        . . . 3 1 3 . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    true
    )
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    face = 1
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . . 
        . 2 . . 7 7 . . 
        . . 7 7 7 7 . . 
        . 7 7 7 7 7 7 . 
        . . b b b b . . 
        . . b 1 b 1 . . 
        . . 7 7 7 7 . . 
        . . e . . e . . 
        `,img`
        . . . . . . . . 
        . 2 7 7 7 7 . . 
        . 7 7 7 7 7 . . 
        . . b b b b 7 . 
        . . b 1 b 1 . . 
        . . 7 7 7 7 . . 
        . . e . . e . . 
        . . . . . e . . 
        `,img`
        . 2 . . 7 7 . . 
        . . 7 7 7 7 . . 
        . 7 7 7 7 7 7 . 
        . . b b b b . . 
        . . b 1 b 1 . . 
        . . 7 7 7 7 . . 
        . . . e e . . . 
        . . . . e . . . 
        `,img`
        . 2 . . 7 7 . . 
        . . 7 7 7 7 . . 
        . 7 7 7 7 7 7 . 
        . . b b b b . . 
        . . b 1 b 1 . . 
        . . 7 7 7 7 . . 
        . . . e e . . . 
        . . . e . . . . 
        `,img`
        . 2 . . 7 7 . . 
        . . 7 7 7 7 . . 
        . 7 7 7 7 7 7 . 
        . . b b b b . . 
        . . b 1 b 1 . . 
        . . 7 7 7 7 . . 
        . . e . . e . . 
        . . e . . . . . 
        `,img`
        . . . . . . . . 
        . . 2 . 7 7 . . 
        . . 7 7 7 7 7 . 
        . 7 7 7 7 7 . . 
        . . b b b b . . 
        . . b 1 b 1 . . 
        . . 7 7 7 7 . . 
        . . e . . e . . 
        `],
    50,
    true
    )
})
info.onLifeZero(function () {
    boss1_fight_start = 0
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.healther, function (sprite, otherSprite) {
    otherSprite.sayText("10 = 1 hp.")
    if (controller.A.isPressed()) {
        if (info.score() > 9) {
            info.changeLifeBy(1)
            info.changeScoreBy(-10)
            music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.UntilDone)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(5)
    sprites.destroy(otherSprite, effects.halo, 200)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    coin = sprites.create(img`
        . . b b b b . . 
        . b 2 2 2 2 b . 
        b 2 2 3 3 2 2 b 
        b 2 3 2 2 3 2 b 
        c 2 3 2 2 3 2 c 
        c 2 2 3 3 2 2 c 
        . f 2 2 2 2 f . 
        . . f f f f . . 
        `, SpriteKind.Food)
    animation.runImageAnimation(
    coin,
    [img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `,img`
        . . b b b . . . 
        . b 5 5 5 b . . 
        b 5 d 3 d 5 b . 
        b 5 3 5 1 5 b . 
        c 5 3 5 1 d c . 
        c 5 d 1 d d c . 
        . f d d d f . . 
        . . f f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 d 1 5 b . 
        . b 5 3 1 5 b . 
        . c 5 3 1 d c . 
        . c 5 1 d d c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . . b 1 1 b . . 
        . . b 5 5 b . . 
        . . b d d b . . 
        . . c d d c . . 
        . . c 3 3 c . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 1 d 5 b . 
        . b 5 1 3 5 b . 
        . c d 1 3 5 c . 
        . c d d 1 5 c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b b . . 
        . . b 5 5 5 b . 
        . b 5 d 3 d 5 b 
        . b 5 1 5 3 5 b 
        . c d 1 5 3 5 c 
        . c d d 1 d 5 c 
        . . f d d d f . 
        . . . f f f . . 
        `],
    100,
    true
    )
    coin.setPosition(otherSprite.x, otherSprite.y)
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    mySprite.startEffect(effects.fire, 3000)
    music.play(music.createSoundEffect(WaveShape.Noise, 1766, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    timer.after(3000, function () {
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
    })
})
let crowArrow2: Sprite = null
let crowArrow: Sprite = null
let projectile: Sprite = null
let face = 0
let myTextSprite: fancyText.TextSprite = null
let crowReaper: Sprite = null
let blacksmith: Sprite = null
let zombieHealther: Sprite = null
let entranceLv2: Sprite = null
let statusbar: StatusBarSprite = null
let coin: Sprite = null
let blob: Sprite = null
let mySprite: Sprite = null
let attack = 0
let boss1_fight_start = 0
tiles.loadMap(tiles.createSmallMap(tilemap`level6`))
boss1_fight_start = 0
attack = 1
scene.setBackgroundImage(img`
    ff99fffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffff99fffffffffff
    ffff69ffffffffffffffffffffffffffffffff9fffffffffffffffffffffff9fffffffffffffffffffffffff9fffffffffffffffffffffff9ffffffffffffffffffffffffffffffff96fffffffffffff
    ffffff99fffffffffffffffffffffffffffffff9ffffffffffffffffffffff9fffffffffffffffffffffffff9ffffffffffffffffffffff9fffffffffffffffffffffffffffffff99fffffffffffffff
    ffffffff99ffffffffffffffffffffffffffffff9ffffffffffffffffffffff9fffffffffffffffffffffff9ffffffffffffffffffffff9ffffffffffffffffffffffffffffff99fffffffffffffffff
    fffffffffff99ffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffff9ffffffffffffffffffffffffffffffffffffffffffffffffff99ffffffffffffffffffff
    ffffffffffff99ffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9ffffffffffffffffffffffffffff99fffffffffffffffffffff
    fffffffffffffff69fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff96ffffffffffffffffffffffff
    ffffffffffffffffff99fffffffffffffffffffffffff9ffffffffffffffffff9fffffffffffffffffffff9ffffffffffffffffff9fffffffffffffffffffffffff99ffffffffffffffffffffffffff9
    ffffffffffffffffffff69ffffffffffffffffffffffff9ffffffffffffffffff9fffffffffffffffffff9ffffffffffffffffff9ffffffffffffffffffffffff96ffffffffffffffffffffffff99fff
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    66ffffffffffffffffffffff69ffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffff9ffffffffffffffffffffff96ffffffffffffffffffffff66fffffffff
    ffff66fffffffffffffffffffff69fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff96fffffffffffffffffffff66fffffffffffff
    ffffffff66ffffffffffffffffffff99fffffffffffffffffff9ffffffffffffff9fffffffffffffffff9ffffffffffffff9fffffffffffffffffff99ffffffffffffffffffff66fffffffffffffffff
    ffffffffff66fffffffffffffffffff99fffffffffffffffffffffffffffffffff9fffffffffffffffff9fffffffffffffffffffffffffffffffff99fffffffffffffffffff66ffffffffffffffffff6
    ffffffffffffff66ffffffffffffffffff99fffffffffffffffff9fffffffffffff9fffffffffffffff9fffffffffffff9fffffffffffffffff99ffffffffffffffffff66fffffffffffffffff666fff
    66ffffffffffffffff66ffffffffffffffff66ffffffffffffffff6fffffffffffffffffffffffffffffffffffffffff6ffffffffffffffff66ffffffffffffffff66ffffffffffffffff668ffffffff
    ff666fffffffffffffff66ffffffffffffffff66fffffffffffffff6fffffffffffffffffffffffffffffffffffffff6fffffffffffffff66ffffffffffffffff66fffffffffffffff666fffffffffff
    fffffff866ffffffffffffff66ffffffffffffff86ffffffffffffff6fffffffffff6fffffffffffff6fffffffffff6ffffffffffffff68ffffffffffffff66ffffffffffffff668ffffffffff8888ff
    8888ffffffff8666ffffffffffff66fffffffffffff86fffffffffffffffffffffff6fffffffffffff6fffffffffffffffffffffff68fffffffffffff66ffffffffffff6668ffffffff8888fffffffff
    ffffff8888ffffffff666fffffffffff88ffffffffffff66fffffffffff6fffffffff6fffffffffff6fffffffff6fffffffffff66ffffffffffff88fffffffffff666ffffffff8888fffffffffff8888
    ffffffffff8888ffffff8888ffffffffff88fffffffffff86ffffffffffffffffffff6fffffffffff6ffffffffffffffffffff68fffffffffff88ffffffffff8888ffffff8888fffffffffff888888ff
    8888888888888888888888888888888888888888888888888866666666666666666666666666666666666666666666666666688888888888888888888888888888888888888888888888888888888888
    8ffffffff8888888fffffff8888ffff888ffffffff88ffffffff88ffffffff6fffffff6fffffffff6fffffff6ffffffff88ffffffff88ffffffff888ffff8888fffffff8888888ffffffff88888fffff
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    ff88888fff888888fffffff888888ffff8888ff888ffffff88ffffff88ffffff8ffffff8fffffff8ffffff8ffffff88ffffff88ffffff888ff8888ffff888888fffffff888888fff88888ffff8888fff
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    ff88888fff888888fffffff888888ffff8888ff888ffffff88ffffff88ffffff8ffffff8fffffff8ffffff8ffffff88ffffff88ffffff888ff8888ffff888888fffffff888888fff88888ffff8888fff
    888888ffffffff888888ffffff8888ffff888fffffff88ffffffff88fffffff6ffffff6fffffffff6ffffff6fffffff88ffffffff88fffffff888ffff8888ffffff888888ffffffff888888fffffffff
    8ffffffff8888888fffffff8888ffff888ffffffff88ffffffff88ffffffff6fffffff6fffffffff6fffffff6ffffffff88ffffffff88ffffffff888ffff8888fffffff8888888ffffffff88888fffff
    8888888888888888888888888888888888888888888888888866666666666666666666666666666666666666666666666666688888888888888888888888888888888888888888888888888888888888
    ffffffffff8888ffffff8888ffffffffff88fffffffffff86ffffffffffffffffffff6fffffffffff6ffffffffffffffffffff68fffffffffff88ffffffffff8888ffffff8888fffffffffff888888ff
    fff8888ffffffff866ffffffffffff66ffffffffffff86ffffffffffff6ffffffffff6fffffffffff6ffffffffff6ffffffffffff68ffffffffffff66ffffffffffff668ffffffff8888ffffffffffff
    8888ffffffff8666ffffffffffff66fffffffffffff86fffffffffffffffffffffff6fffffffffffff6fffffffffffffffffffffff68fffffffffffff66ffffffffffff6668ffffffff8888fffffffff
    fffffff866ffffffffffffff66ffffffffffffff86ffffffffffffff6fffffffffff6fffffffffffff6fffffffffff6ffffffffffffff68ffffffffffffff66ffffffffffffff668ffffffffff8888ff
    ff666fffffffffffffff66ffffffffffffffff66fffffffffffffff6fffffffffffffffffffffffffffffffffffffff6fffffffffffffff66ffffffffffffffff66fffffffffffffff666fffffffffff
    ffffffffffffffff66fffffffffffffffff99ffffffffffffffffffffffffffffff9fffffffffffffff9ffffffffffffffffffffffffffffff99fffffffffffffffff66ffffffffffffffff6668fffff
    ffffffffffffff66ffffffffffffffffff99fffffffffffffffff9fffffffffffff9fffffffffffffff9fffffffffffff9fffffffffffffffff99ffffffffffffffffff66fffffffffffffffff666fff
    ffffffffff66fffffffffffffffffff99fffffffffffffffffffffffffffffffff9fffffffffffffffff9fffffffffffffffffffffffffffffffff99fffffffffffffffffff66ffffffffffffffffff6
    ffffff66ffffffffffffffffffff99ffffffffffffffffffff9fffffffffffffff9fffffffffffffffff9fffffffffffffff9ffffffffffffffffffff99ffffffffffffffffffff66fffffffffffffff
    ffff66fffffffffffffffffffff69fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff96fffffffffffffffffffff66fffffffffffff
    66ffffffffffffffffffffff69ffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffff9ffffffffffffffffffffff96ffffffffffffffffffffff66fffffffff
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    fffffffffffffffffff69fffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffff96fffffffffffffffffffffffff99f
    ffffffffffffffffff99fffffffffffffffffffffffff9ffffffffffffffffff9fffffffffffffffffffff9ffffffffffffffffff9fffffffffffffffffffffffff99ffffffffffffffffffffffffff9
    fffffffffffffff69fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff96ffffffffffffffffffffffff
    ffffffffffff99ffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9ffffffffffffffffffffffffffff99fffffffffffffffffffff
    ffffffffff99fffffffffffffffffffffffffffff9fffffffffffffffffffff9fffffffffffffffffffffff9fffffffffffffffffffff9fffffffffffffffffffffffffffff99fffffffffffffffffff
    ffffffff99ffffffffffffffffffffffffffffff9ffffffffffffffffffffff9fffffffffffffffffffffff9ffffffffffffffffffffff9ffffffffffffffffffffffffffffff99fffffffffffffffff
    ffffff99fffffffffffffffffffffffffffffff9ffffffffffffffffffffff9fffffffffffffffffffffffff9ffffffffffffffffffffff9fffffffffffffffffffffffffffffff99fffffffffffffff
    fff99fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff99ffffffffffff
    ff99fffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffff99fffffffffff
    9ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffff9ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff99ffffffff
    ffffffffffffffffffffffffffffffffff9ffffffffffffffffffffffffff9fffffffffffffffffffffffffff9ffffffffffffffffffffffffff9ffffffffffffffffffffffffffffffffffff99fffff
    fffffffffffffffffffffffffffffffff9ffffffffffffffffffffffffff9fffffffffffffffffffffffffffff9ffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffff99fff
    ffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffff9fffffffffffffffffffffffffffff9fffffffffffffffffffffffffff9ffffffffffffffffffffffffffffffffffffff96f
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffff9ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffff9ffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffff9ffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffff9fffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9ffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffff
    fffffffffffffffffffffff9fffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffff9ffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff9fffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffffffffff9fffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
profilelife.setProfileImage(img`
    . . . . . . . . 
    . 2 . . 7 7 . . 
    . . 7 7 7 7 . . 
    . 7 7 7 7 7 7 . 
    . . b b b b . . 
    . . b 1 b 1 . . 
    . . 7 7 7 7 . . 
    . . . . . . . . 
    `)
profilelife.setMaxLife(10)
info.changeLifeBy(7)
mySprite = sprites.create(img`
    . . . . . . . . 
    . 2 . . 7 7 . . 
    . . 7 7 7 7 . . 
    . 7 7 7 7 7 7 . 
    . . b b b b . . 
    . . b 1 b 1 . . 
    . . 7 7 7 7 . . 
    . . e . . e . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 500
effects.blizzard.startScreenEffect()
for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
    blob = sprites.create(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . f f f f . . 
        . f 7 7 7 7 f . 
        f 7 f 7 7 f 7 f 
        f 7 7 7 7 7 7 f 
        `, SpriteKind.Enemy)
    tiles.placeOnTile(blob, value)
    tiles.setTileAt(value, assets.tile`tile3`)
    blob.ay = 500
    blob.vx = randint(-30, 30)
    blob.setBounceOnWall(true)
    blob.vy = 30
}
game.onUpdateInterval(2000, function () {
    if (boss1_fight_start == 1) {
        if (crowReaper.isHittingTile(CollisionDirection.Bottom)) {
            crowReaper.ay = 500
            crowReaper.vy = -300
            crowReaper.setImage(img`
                ..................
                ...............ff.
                ........fffffffff.
                .....fffffffffff..
                .....fffffffff....
                .....fffffffffff..
                ......fffffff.....
                ...ffffffffff.....
                ..ff1fffffff......
                .fffffffffff......
                ....ffffffff......
                .....ffffffff.....
                ......fffffffff...
                .......ffffffffff.
                ......2.2...ff....
                .....2............
                ..................
                ..................
                `)
            crowReaper.follow(mySprite, 100)
            timer.after(500, function () {
                crowReaper.setImage(img`
                    ..................
                    ..................
                    ..................
                    ..................
                    .ffff.............
                    fff1ff............
                    ..ffffffff.....f..
                    ...ffffffffffff...
                    ...ffffffffffff...
                    ....ffffffffff....
                    .....ffffffff.....
                    ......fffffff.....
                    .......fffff......
                    ........2.2.......
                    ........2.2.......
                    ..................
                    ..................
                    ..................
                    `)
                crowReaper.follow(mySprite, 0)
            })
        }
    }
})
game.onUpdateInterval(1000, function () {
    if (boss1_fight_start == 1) {
        crowReaper.vx = randint(-100, 100)
        crowReaper.setImage(img`
            ...............ee.
            ........eeeeeeeffe
            .....eeefffffffffe
            ....efffffffffffe.
            ....efffffffffee..
            ....efffffffffffe.
            ...eeefffffffeee..
            ..effffffffffe....
            .eff1fffffffe.....
            efffffffffffe.....
            .eeeffffffffe.....
            ....effffffffee...
            .....efffffffffee.
            ......effffffffffe
            .....e2e2eeeffeee.
            ....e2e.e...ee....
            ....ee............
            ..................
            `)
        timer.after(1200, function () {
            crowArrow = sprites.createProjectileFromSide(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . 3 1 1 3 . . . . . . 
                . . . . . 2 1 1 1 1 2 . . . . . 
                . . . . . 2 1 1 1 1 2 . . . . . 
                . . . . . . 3 1 1 3 . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, randint(-100, 100), 100)
            crowArrow.setKind(SpriteKind.crowProjectlie)
            crowArrow2 = sprites.createProjectileFromSide(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . 3 1 1 3 . . . . . . 
                . . . . . 2 1 1 1 1 2 . . . . . 
                . . . . . 2 1 1 1 1 2 . . . . . 
                . . . . . . 3 1 1 3 . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, randint(-100, 100), 100)
            crowArrow2.setKind(SpriteKind.crowProjectlie)
            crowReaper.setImage(img`
                ..................
                ..................
                ..................
                ..................
                .ffff.............
                fff1ff............
                ..ffffffff.....f..
                ...ffffffffffff...
                ...ffffffffffff...
                ....ffffffffff....
                .....ffffffff.....
                ......fffffff.....
                .......fffff......
                ........2.2.......
                ........2.2.......
                ..................
                ..................
                ..................
                `)
        })
    }
})
forever(function () {
    if (boss1_fight_start == 1) {
        music.play(music.createSong(hex`00af000408020205001c000f0a006400f4010a000004000000000000000000000000000000000224000000040001140c001000011418001c0001142400280001143000340001143c004000011409010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80060000000010001060400050001050800090001080c000d0001061000110001051400150001061800190001081c001d0001052000210001062400250001052800290001082c002d0001063000310001053400350001063800390001083c003d000105`), music.PlaybackMode.UntilDone)
    }
})
