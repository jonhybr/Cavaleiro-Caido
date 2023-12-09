import { Enemy } from './Enemy.js';
import { Entity } from './Entity.js';
import { InputHandler } from './InputHandler.js';
import { Map } from './Map.js';
import { Player } from './Player.js';
import { AchievementHandler } from './AchievementHandler.js';

import { Utils } from './Utils.js';


// roda após as imagens serem carregadas



addEventListener('load', function(){
    
    // elemento botão
    const play = document.getElementById('playButton');
    // elemento descricao
    const descricao = document.getElementById('descricao');
    // elemento canvas
    const canvas = document.getElementById('game');
    // jogar novamente
    const jogarNovamente = document.getElementById('overlayEndGame');


    // transforma o canvas em um objeto para manipulador imagens em JS
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    // classe principal que interliga as outras classes
    class Game{
        constructor(canvas){
            this.playing = true;
            this.canvas = canvas;
            this.width = canvas.width;
            this.height = canvas.height;
            this.loaded = false
            this.enemies = [];

            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.map = new Map(this);
            this.entity = new Entity(this);
            this.achievementHandler = new AchievementHandler(this);
            this.utils = new Utils(this);
            
            this.map.createMap([0, 0]);    
            this.timer = 0        
            setInterval(()=> this.timer +=1, 1000)
        }

        salvarPontuacao(pontuacao){
            fetch('/insertPontuacao', {
                method: 'POST',
                body: JSON.stringify({ pontuacao }),
                headers: {
                    'Content-type':'application/json',
                },
            })
        }

        checkInput(){
            if (this.input.key == 'escape'){
                this.playing = false
            }
            if (this.input.key == 'f'){
                canvas.requestFullscreen()
            }
        }

        update(){
            this.checkInput()
            this.player.update();
            this.enemies.forEach((e) => e.update())
            this.achievementHandler.update()
            

        }

        draw(context){
            this.map.draw(context)
            this.player.draw(context)            
            this.enemies.forEach((e) => e.draw(context))
            this.utils.drawTextPontuacao(ctx, `Pontuação: ${this.player.pontuacao}`, 50, 50, 'black')
            this.utils.drawTextPontuacao(ctx, `tempo: ${this.timer}`, 50, 100, 'black')
        }
    }
    
    // ação do botão html
    play.onclick = () => {
        // remove o botão
        play.style.display = 'none'
        descricao.style.display = 'none'
        // faz o canvas ser visível
        canvas.style.display = 'inline-block'

        // loop principal
        const game = new Game(canvas)

        function animate(){
            if (game.playing){
                if (game.loaded){
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                }                
                game.update(canvas);
                game.draw(ctx);
                game.loaded = true
                requestAnimationFrame(animate)
            } else {
                
                jogarNovamente.style.visibility = 'visible'
                game.salvarPontuacao(game.player.pontuacao) 
                jogarNovamente.addEventListener('click', ()=> {
                    play.style.display = 'block'; descricao.style.display = 'flex';
                    canvas.style.display = 'none';
                    jogarNovamente.style.visibility = 'hidden'; 

                
                });
                //play.style.display = 'block'
                //descricao.style.display = 'flex'
                // faz o canvas ser visível
                //canvas.style.display = 'none'
            }                
        }
        animate();        
    }
})



