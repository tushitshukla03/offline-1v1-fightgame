const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width=1024
canvas.height=576

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.7
const background = new Sprite({
  position:{
    x: 0,
    y: 0
  },
  imageSrc: './images/background2.png'
})



const axe = new Sprite({
  position:{
    x: 762,
    y: 400
  },
  imageSrc: './images/pole_axe.png',
  scale:1.8,
  
  
})





const player = new Fighter({
  position: {
    x:0,
    y:0
  },
  framesHold:10,
  velocity:{
    x:0,
    y:0
  },
  offset:{
    x:0,
    y:0
  },
  
  scale:1.5,
  offset:{
    x:120,
    y:157
  },
  sprites:{
    idle:{
      imageSrc:"./images/idle.png",
  
      framesMax:6

    },
    run:{ 
      imageSrc:"./images/running.png",
  
      framesMax:8
    },
    run1:{ 
      imageSrc:"./images/running1.png",
  
      framesMax:8
    },
    jump:{ 
      imageSrc:"./images/jump.png",
  
      framesMax:2
    },
    fall:{ 
      imageSrc:"./images/fall.png",
  
      framesMax:2
    },
    attack:{ 
      imageSrc:"./images/attack.png",
  
      framesMax:8
    },
    attack2:{ 
      imageSrc:"./images/attack2.png",
  
      framesMax:8
    },slide:{ 
      imageSrc:"./images/running.png",
  
      framesMax:8
    },
    takeHit:{
      imageSrc:"./images/Hit.png",

      framesMax:4
    },
    death:{
      imageSrc:"./images/Death.png",

      framesMax:7
    }

  },
  attackBox:{
    offset:{
      x:5,
      y:-80
    },
    width:160,
    height:80

  }
})

const enemy = new Fighter({
  position: {
    x:700,
    y:100
    },
    velocity:{
      x:0,
      y:0
    },
    color: 'blue',
    offset:{
      x:-50,
      y:0
    },
    framesHold:10,

  scale:2.2,
  offset:{
    x:120,
    y:313
  },
  sprites:{
    idle:{
      imageSrc:"./images1/Idle.png",
  
      framesMax:8

    },
    run:{ 
      imageSrc:"./images1/Run.png",
  
      framesMax:8
    },
    run1:{ 
      imageSrc:"./images1/Run1.png",
  
      framesMax:8
    },
    jump:{ 
      imageSrc:"./images1/Jump.png",
  
      framesMax:2
    },
    fall:{ 
      imageSrc:"./images1/Fall.png",
  
      framesMax:2
    },
    attack:{ 
      imageSrc:"./images1/Attack1.png",
  
      framesMax:8
    },
    attack2:{ 
      imageSrc:"./images1/Attack2.png",
  
      framesMax:8
    },slide:{ 
      imageSrc:"./images1/Run.png",
  
      framesMax:8
    },
    takeHit:{
      imageSrc:"./images1/Take hit.png",

      framesMax:3
    },
    death:{
      imageSrc:"./images1/Death.png",

      framesMax:7
    }
  },
  attackBox:{
    offset:{
      x:-100,
      y:-80
    },
    width:120,
    height:80

  }
})

const keys = {
  a: {
    pressed: false
  },

  d: {
    pressed: false
  },
  f:{
    pressed: false
  },

  w: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  }
} 




function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x   &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y  &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}
function determineWinner({player,enemy,timerId}){
  clearTimeout(timerId)
  document.querySelector('#displayText').style.display = 'flex'
  if (player.health===enemy.health){
    document.querySelector('#displayText').innerHTML='Tie'
    
  }else if
  (player.health>enemy.health){
    document.querySelector('#displayText').innerHTML='Player 1 Wins'
    

  }
  else if (player.health<enemy.health){
    document.querySelector('#displayText').innerHTML='Player 2 Wins'

  }

}

let timer= 60
let timerId
function decreaseTimer(){
  
  if(timer>0) {
  timerId = setTimeout(decreaseTimer,1000)
  timer--
  document.querySelector('#timer').innerHTML = timer}


  if(timer===0){
    
    determineWinner({player,enemy,timerId})
  
}
}
decreaseTimer()
function animate(){
  

  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0,0,canvas.width, canvas.height)
  background.update()
  // salt.update()
  // axe.update()
  // shop.update()
  c.fillStyle = 'rgba(255,255,255,0.15)'
  c.fillRect(0,0,canvas.width, canvas.height)
  player.update()
  enemy.update()
  

  player.velocity.x = 0
  enemy.velocity.x=0
  console.log(enemy.position.x)
  if(player.position.x<=0){
    player.position.x=0
  }
  else if(player.position.x>=936){
    player.position.x=936
  }
  
  // limiting players movement in canvas
  if(enemy.position.x<=-75){
    enemy.position.x=-75
  }
  else if(enemy.position.x>=835){
    enemy.position.x=835
  }


  // to limit the jump
  if(player.position.y!==426.1){
    keys.w.pressed=false

  }
  if(enemy.position.y!==426.1){
    keys.ArrowUp.pressed=false

  }
  

  if(keys.a.pressed && player.lastKey==='a'){
    player.velocity.x = -5
    player.switchSprites('run1')
  }
  else if(keys.d.pressed && player.lastKey==='d'){
    player.velocity.x = 5
    player.switchSprites('run')
    
  }else if(keys.f.pressed && player.lastKey==='f'){
    player.velocity.x = 2
    player.switchSprites('slide')
    
  }else{player.switchSprites('idle')}

  // console.log(player.lastKey)
  console.log(keys.f.pressed&&player.lastkey==='f')
  if(keys.w.pressed && player.lastKey==='w'){
    player.velocity.y=-21
    
    player.switchSprites('jump')

  }
  else if(player.velocity.y>0){
    player.switchSprites('fall')
  }
  if(keys.ArrowRight.pressed && enemy.lastKey==='ArrowRight'){
    enemy.velocity.x = 5
    enemy.switchSprites('run1')
  }
  else if(keys.ArrowLeft.pressed && enemy.lastKey==='ArrowLeft'){
    enemy.velocity.x = -5
    enemy.switchSprites('run')
  }else{
    enemy.switchSprites("idle")
  }

  if(keys.ArrowUp.pressed && enemy.lastKey==='ArrowUp'){
    enemy.velocity.y=-21
    enemy.switchSprites('jump')

  }
  else if(enemy.velocity.y>0){
    enemy.switchSprites('fall')
  }

  //detetect collision of players
  if(rectangularCollision({
    rectangle1:player,
    rectangle2:enemy})
    &&player.isAttacking && player.framesCurrent===4){
      enemy.takeHit()
      player.isAttacking=false
    
      gsap.to('#enemyHealth', {
        width: enemy.health + '%'
      })
    
  }

  if(player.isAttacking===true&&player.framesCurrent===4){
    player.isAttacking=false
  }
  if(rectangularCollision({
    rectangle1:enemy,
    rectangle2:player})
    &&enemy.isAttacking&&enemy.framesCurrent===2){
      player.takeHit()
      enemy.isAttacking=false
      gsap.to('#playerHealth', {
        width: player.health + '%'
      })
      
      
      
  }
  if(enemy.isAttacking===true&&enemy.framesCurrent===2){
    enemy.isAttacking=false
  }
  //end the game based on health
if(enemy.health <=0 || player.health<=0){
  determineWinner({player,enemy,timerId})
}
}


animate()

window.addEventListener('keydown',(event)=>{
  if(!player.dead){switch(event.key){
    case 'd' :
      keys.d.pressed = true
      player.lastKey = 'd'
      break
    case 'a' :
      keys.a.pressed = true
      player.lastKey='a'
      break
    case 'f' :
      keys.f.pressed = true
      player.lastKey='f'
      break
    case 'w' :
      keys.w.pressed = true
      player.lastKey='w'
      break
    case ' ' :
      player.attack()
      break
    case 'q':
      player.attack2()
      break}}
  if(!enemy.dead){switch(event.key){
    case 'ArrowRight':
      keys.ArrowRight.pressed=true
      enemy.lastKey = 'ArrowRight'

      break
    case 'ArrowLeft' :
      keys.ArrowLeft.pressed = true
      enemy.lastKey= 'ArrowLeft'
      break 
    case 'Control':
      enemy.attack2()
      break 

    case 'ArrowUp':
      keys.ArrowUp.pressed=true
      enemy.lastKey='ArrowUp'
      break
    case 'ArrowDown':
      enemy.attack()
      break
  }}
})

window.addEventListener('keyup',(event)=>{
  switch(event.key){
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 'w':
      keys.w.pressed = false
      break
    case 'f' :
      keys.f.pressed = false
      break
    
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
    case 'ArrowUp':
      keys.ArrowUp.pressed = false
      break
    
  }    
})