class Sprite{
  constructor({position,imageSrc,scale=1,framesMax=1,offset={x:0,y:0}}){
    this.position = position
    this.width = 50
    this.height = 150
    this.image = new Image()
    this.image.src = imageSrc
    this.scale= scale
    this.framesMax=framesMax
    this.framesCurrent=0
    this.framesElapsed=0
    this.framesHold=10
    this.offset=offset
  }
  animateFrame(){
    this.framesElapsed++
      if(this.framesElapsed%this.framesHold===0){
        if(this.framesCurrent<this.framesMax-1){
          this.framesCurrent++
        }else{
          this.framesCurrent=0
        }
      } 
  }
  draw(){
    c.drawImage(this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x-this.offset.x,
      this.position.y-this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale)
  }

  update(){
    this.position.x=this.position.x-this.offset.x
    this.position.y=this.position.y-this.offset.y
    this.draw()
    this.animateFrame()
    
  }
}



class Fighter extends Sprite{
  constructor({
    position,
    velocity,
    color='red',
    imageSrc,
    scale=1,
    framesMax=1,
    offset={x:0,y:0},
    sprites,
    framesHold,
    attackBox = {offset:{},width:undefined,height:undefined}
  }){
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
      
    })
    
    this.velocity = velocity
    this.width=50
    this.height=150
    this.lastKey
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height
    }
    this.color = color
    this.isAttacking
    this.health=100
    this.framesCurrent=0
    this.framesElapsed=0
    this.framesHold=framesHold
    this.sprites=sprites
    this.dead=false

    for(const sprite in this.sprites){
      sprites[sprite].image=new Image()
      sprites[sprite].image.src=sprites[sprite].imageSrc

  }

  }

  

  update(){
    this.draw()
    if(!this.dead)this.animateFrame()
    
    this.attackBox.position.x =this.position.x + this.attackBox.offset.x
    this.attackBox.position.y=this.position.y + this.attackBox.offset.y


    // c.fillRect(this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height)



    this.position.x += this.velocity.x
    
    this.position.y += this.velocity.y
    if(this.position.y + this.height +  this.velocity.y >= canvas.height){
      this.velocity.y = 0
      this.position.y=426.1
      
    }
    else{
      this.velocity.y += gravity
    }
  }
    
    attack(){
      this.switchSprites('attack')
      this.isAttacking=true
    }
    takeHit(){
      
      this.health-=15
      if(this.health<=0){
        this.switchSprites('death')
      }else{this.switchSprites('takeHit')}
    }

    attack2(){
      this.switchSprites('attack2')
      this.isAttacking=true
    }

    switchSprites(sprite){
      if(this.image===this.sprites.death.image){
        if(this.framesCurrent===this.sprites.death.framesMax-1)
          {this.dead=true}
        return
      }
      if((this.image===this.sprites.attack.image && this.framesCurrent<this.sprites.attack.framesMax-1)||
        (this.image===this.sprites.attack2.image && this.framesCurrent<this.sprites.attack2.framesMax-1)) {return}


      if((this.image===this.sprites.takeHit.image&&this.framesCurrent<this.sprites.takeHit.framesMax-1)) {return}
      switch (sprite){


        case 'idle':
          if(this.image !== this.sprites.idle.image){
            this.image = this.sprites.idle.image
            this.framesMax= this.sprites.idle.framesMax
            this.framesCurrent=0
          }
          break

        case 'run':
          if(this.image!== this.sprites.run.image){
            this.image = this.sprites.run.image
            this.framesMax=this.sprites.run.framesMax
            this.framesCurrent=0
          }
          break
        
        case 'jump':
          if(this.image!==this.sprites.jump.image){
            this.image = this.sprites.jump.image
            this.framesMax=this.sprites.jump.framesMax
            this.framesCurrent=0
          }
          break

          case 'fall':
          if(this.image!==this.sprites.fall.image){
            this.image = this.sprites.fall.image
            this.framesMax=this.sprites.fall.framesMax
            this.framesCurrent=0
          }
          break

          case 'attack':
          if(this.image!==this.sprites.attack.image){
            this.image = this.sprites.attack.image
            this.framesMax=this.sprites.attack.framesMax
            this.framesCurrent=0
          }
          break

          case 'attack2':
          if(this.image!==this.sprites.attack2.image){
            this.image = this.sprites.attack2.image
            this.framesMax=this.sprites.attack2.framesMax
            this.framesCurrent=0
          }
          break
          case 'slide':
          if(this.image!==this.sprites.slide.image){
            this.image = this.sprites.slide.image
            this.framesMax=this.sprites.slide.framesMax
            this.framesCurrent=0
          }
          break
          case 'takeHit':
          if(this.image!==this.sprites.takeHit.image){
            this.image = this.sprites.takeHit.image
            this.framesMax=this.sprites.takeHit.framesMax
            this.framesCurrent=0
          }
          break
          case 'death':
          if(this.image!==this.sprites.death.image){
            this.image = this.sprites.death.image
            this.framesMax=this.sprites.death.framesMax
            this.framesCurrent=0
          }
          break
        
        
        
      }

    }
  
}