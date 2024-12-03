# ⛳PixelPut
Game Programming Final Project 2024

## ✒️ Description
PixelPut is a 2d puzzle golf game. Players must navigate through the objstacles and different terrain throughout the levels to get in the hole with the least amount of strokes.

## 🕹️ Gameplay
Players begin at a certain place in the level. By draging their mouse when on top of the golf ball, they can choose the orientation and force of their shot. Throughout the levels will be obstacles, static ones like boxes and dynamic ones like walking monsters. When the player shoots the ball in the hole, he navigates to the next level.

## 📃 Requirements
- A controllable ball hit (Similar to Angry Birds)
- A level design
- Different kind of obstacles (static like boxes and dynamic like walking monsters)
- A nice looking title screen
- A shop screen to buy golf ball and player skins

## 🤖 State Diagram
![golf (2)](https://github.com/user-attachments/assets/721568ca-25bd-4efc-92be-613aa6827ce5)

## 👷🏼‍♂️Developement
### Ideas
- Add obstacles (Ex: Boxes similar to blocks in AngryBirds)
- Add different terrain (Ex: Sand that slows down + amortize the ball)
- Add animations for hitting the ball (Player State)
- Add animations for flag in the wind
- Add coins to buy new skins and ball colors
- Make secret holes??

### Problems
- How to make the force arrow
- ~~How will I change my levels (Create different pngs and put them as background)~~
- ~~How to make a complex matter ground (Get the vertices of the png map)~~
- ~~Purple band tiles bug~~

https://github.com/user-attachments/assets/bfc10f4d-2084-4433-bf4d-9d0770cdd232

Good: Created a map, Added a ball object that has physic properties and different sprites, Can press SPACE to apply force to the ball. <br>
Bad: Purple band bug, ball doesn't make contact with all parts of the map.


https://github.com/user-attachments/assets/1ad3cc20-8695-417e-889d-1fd4d32337e8

Good: Changed how map ground is implemented. Ground is now composed of multiple matter shapes capable of interacting with the ball. <br>
Background is now just a PNG. Also, implemented level factory design, for easier level management.


https://github.com/user-attachments/assets/1f2a224a-1f3b-4ceb-9e19-e94c5ab74a3c

Good: Using mouse events, checks if the user drags his mouse and calculate the length and angle of the line to apply the right amount of force to the ball.
Bad: The shot implementation is pretty raw.



## 🎨 Assets
I plan on taking inspiration from _super stickman golf game_ for the layout of the game and _dunk shot_ for the force arrow.

### 💡Inspriration 
https://www.youtube.com/watch?v=EZ3a7KALcTQ&t=6s
https://www.youtube.com/watch?v=RJJugb2uJPs

### 🖼️ Spites 
https://www.spriters-resource.com/mobile/superstickgolf2/sheet/70674/
https://www.spriters-resource.com/game_boy_gbc/warioland3/sheet/95433/
https://www.spriters-resource.com/fullview/169559/

### 🔊 Sounds 
https://www.youtube.com/watch?v=9gD-J5CBWRQ

### 🎮 Game Engine 
https://brm.io/matter-js/docs/classes/Bodies.html#method_fromVertices


