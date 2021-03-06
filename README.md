# Ping vs. Pong
**By: Kenneth Lin**
***********************

![](https://firebasestorage.googleapis.com/v0/b/ping-vs-pong.appspot.com/o/Screen%20Shot%202016-11-22%20at%2012.39.26%20PM.png?alt=media&token=c90af297-0be5-463e-8ceb-ce15eb4f4838) 

## Overview: 

Pong with curves! 

HTML5 canvas, Javascript, and **the power of math** for the physics.

The ball will curve up or down at different velocities depending on how you hit it with your paddle. This allows for some pretty crazy volleys once the speed picks up. Trick shots and mind games galore!

## Play it here:

https://ping-vs-pong.firebaseapp.com/

## Controls: 

Player 1: UP, DOWN

Player 2: W, S

## Features: 

* 2 paddles!
* 1 ball!
* So many curves!
* 60 FPS!
* No friends? No problem! Play vs. AI!
* 8-bit sounds and music!
* Literally minutes of fun! 

## Technologies Used: 

**Languages:** 
* Javascript
* HTML
* CSS

**Libraries:** 
* jQuery

**Resources:** 
* https://developer.mozilla.org/en-US/docs/Games/Anatomy
* https://developer.mozilla.org/en-US/docs/Web/API/Performance/
* http://www.w3schools.com/graphics/game_intro.asp
* http://opengameart.org/

Font "Lazer84" by: Juan Hodgson (https://www.behance.net/gallery/31261857/LAZER-84-Free-Font)

Font "Alien Encounters" by: ShyFonts (http://www.dafont.com/alien-encounters.font)

Font "Press Start 2P" by: CodeMan38 (https://fonts.google.com/specimen/Press+Start+2P)

Sound Effects by: SubSpaceAudio (http://opengameart.org/content/512-sound-effects-8-bit-style)

Music by: Deceased Superior Technician (http://opengameart.org/content/railjet-long-seamless-loop)

*************************
## Notes: 

- Hitbox detection was hard. Need to improve it in the future.
- Added curve by changing the speed of y (rate of change of rate of change).
- Curves supposed to mimick forehand/backhand swing by a table tennis player.
- Originally wanted to put entirety of app in single canvas. Issues: rendering UI constantly. Workaround: two canvases, one for menu and one for game. Then swap. But at that point, might as well just use a div and manipulate DOM. (which I did).
- Music, sounds, and fonts are all open source.
- Adding paddle upper-half & lower-half collision animation.
- Adding paddle LEFT/RIGHT action in the future. Not sure what to implement though.
- Adding ball trail in the future: http://rectangleworld.com/blog/archives/tag/fading

*************************
**Known Bugs:** 

1. If ball.speed is too high, it will not collide with paddle, and instead go through it. Caused by framerate OR poor hitbox detection being "too precise". Potential fix: adjust hitboxes OR add raycasting. Current bandaid: adjusted hitboxes and capped ball speed.

2. **FIXED** If ball collides with top/bottom wall at certain angle, it will get 'stuck' in the wall. Fixed by checking if ball.position.y is beyond top/bottom wall. If it is, then 'nudge' ball.position.y a few pixels within than top/bottom edge. 

3. **FIXED** KeyDown is attached to entire window... pressing UP/DOWN will scroll entire window.  BUT using "e.preventDefault();" prevents ANY shortcuts, like cmd+R to refresh, from working at all. EDIT: Fixed by just attaching event handlers to app.canvas instead of window. And abundant use of  app.canvas focus().

4. endGame() function will fail to prevent ball from moving if there is a setTimeout(spawnBall).  I tried using clearTimeout(spawnBall) but it didn't work. Need to revisit.
