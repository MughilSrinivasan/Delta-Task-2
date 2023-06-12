const gunShot = new Audio('gunshot.mp3');
        var ctx;
        var speed;
        var player;
        var home;
        var enemy;
        var enemies = [0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400,420,440,460,480,500,520,540,560,580];
        var boss = [200,250,300,350];
        var enemyArray = [];
        var bullet;
        var bulletArray = [];
        var enemyBullet;
        var enemyBulletArrayCenter = [];
        var enemyBulletArraySide = [];
        var score = 0;
        var homeHealth = 100;
        var rotation = 0;
        var homeBullet;
        var homeBulletArray = [];
        var playerHealth = 100;
        var xposi; 
        var yposi;
        var power;
        var powerArray =[]; 
        var bossArray = [];
        var countEnemy = 0;
        var isBoss = false;
        var bossEnemy;
        var bossCount = 0;
        var bossEnd = false;
        var bossBulletsArray = [];
        var bossBullet;
        var homingEnemiesArray = [];
        var homingEnemies;
        var interval;
        var isPause  = false;
        var name;
        var rankArray = [];
        var isPressed = false;
        var countCheck = 0;
        var req1;
        var req2;
        var req3;
        var req4;
        var req5;
        var reqmain;
        isGameEnd = false;

        var gameArea = 
        {
            ctx: document.getElementById("canvas").getContext('2d' , { willReadFrequently: true }),
            start : function()
            {
                let currTime;
                let prevTime;
                reqmain = window.requestAnimationFrame(main);
                function main(currTime)
                {
                    if(!isGameEnd)
                    {
                    window.requestAnimationFrame(main);
                    if((currTime - prevTime)/1000 < 1/100)
                    {
                        return;
                    }
                    prevTime = currTime;
                    updateGameArea();
                    }
                }
            },

            clear : function()
            {
                this.ctx.clearRect(0,0,600,600);
            },

            stop : function()
            {
                cancelAnimationFrame(reqmain);
            }
        }

        var position = 
        {   
            x : 0,
            y : 0
        }
        
        class Generator
        {
            constructor(x,y,width,height,color)
            {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.color = color;
                this.speed = 5;
            }

            draw = () =>
            {
                this.x = this.x + position.x*this.speed;
                this.y = this.y + position.y*this.speed;
                gameArea.ctx.fillStyle = this.color;
                gameArea.ctx.fillRect(-this.width/2,-this.height/2,this.width,this.height);
                position.x = 0;
                position.y = 0;
                gameArea.ctx.fillStyle = "white";
                gameArea.ctx.fillRect(-this.width/2+10,-this.height/2-15,10,15);
                gameArea.ctx.fillStyle = "black";
                gameArea.ctx.font = "10px Arial";
                gameArea.ctx.fillText("Player",-this.width/2,this.height/2-12);
            }

            update = () =>
            {
                gameArea.ctx.fillStyle = "navy";
                gameArea.ctx.fillRect(this.x+this.width/2-5,this.y-30,10,80);
                gameArea.ctx.fillStyle = this.color;
                gameArea.ctx.fillRect(this.x,this.y,this.width,this.height);
                gameArea.ctx.fillStyle = "cyan";
                gameArea.ctx.font = "23px Arial";
                gameArea.ctx.fillText("HOME",265,460);
            }

            bossElem = () =>
            {
                this.y = this.y + 0.5;
                gameArea.ctx.fillStyle = "orange";
                gameArea.ctx.fillRect(this.x+11,this.y+this.height,7,20);
                gameArea.ctx.fillStyle = "orange";
                gameArea.ctx.fillRect(this.x+22,this.y+this.height,7,20);
                gameArea.ctx.fillStyle = "orange";
                gameArea.ctx.fillRect(this.x+33,this.y+this.height,7,20);
                gameArea.ctx.fillStyle = this.color;
                gameArea.ctx.fillRect(this.x,this.y,this.width,this.height);
                gameArea.ctx.fillStyle = "darkBlue";
                gameArea.ctx.font = "15px Arial";
                gameArea.ctx.fillText("BOSS",this.x+5,this.y+30);
            }

        }

        function game()
        {
            document.getElementById("model").style.display = "block";
            document.getElementById("modelHeading").innerHTML = "DORID DEFENCE";
            document.getElementById("modelContent").innerHTML = "Welcome to Dorid Defence!. Save yourself and your home base by shooting the enemies. Fortunately, the home base with equipped with an automatic defence turret which can shoot the enemies by its own for a given range. Beware of the boss enemy which can have more power and require more bullets to destroy. Shoot all the 50 enemies to win the battle. Good Luck!";
        }

        function star()
        {
            document.getElementById("model").style.display = 'none';
            isGameEnd = false;
            startGame();
        }
        function func()
        {
            document.getElementById("modelName").style.display = "block";
        }
         
        function check()
        {
            var data = document.getElementById("nameValue").value;
            if(data != "")
            {
                name = data;
                document.getElementById("modelName").style.display = "none";
                game();
            }
            else
            {
                document.getElementById("modelName").style.display = "block";
            }
        }

        function startGame()
        {
            if(!isPause && !isGameEnd)
            {
                player = new Generator(285,540,30,30,"gold");
                home = new Generator(210,420,180,60,"rgba(0,100,0,255)");
                let c1time;
                let p1time;
                function task1(c1time)
                {
                    if(!isGameEnd)
                    {window.requestAnimationFrame(task1);
                    if((c1time - p1time)/1000 < 4)
                    {
                        return;
                    }
                    p1time = c1time;
                    generateEnemies();}
                }
                req1 = window.requestAnimationFrame(task1);

                let c2time;
                let p2time;
                function task2(c2time)
                {
                    if(!isGameEnd)
                    {window.requestAnimationFrame(task2);
                    if((c2time - p2time)/1000 < 5)
                    {
                        return;
                    }
                    p2time = c2time;
                    generateEnemyBullets();}
                }
                req2 = window.requestAnimationFrame(task2);
                let c3time;
                let p3time;
                function task3(c3time)
                {
                    if(!isGameEnd)
                    {window.requestAnimationFrame(task3);
                    if((c3time - p3time)/1000 < 10)
                    {
                        return;
                    }
                    p3time = c3time;
                    generatePowerUps();}
                }
                function call()
                {
                    req3 = window.requestAnimationFrame(task3)
                }
                interval = setInterval(call,5000);
                gameArea.start();
            }
        }

        function updateGameArea()
        {
            if(!isPause && !isGameEnd)
            {
                countCheck++;
                if(controller[37].pressed && controller[38].pressed)
                {   
                    position.x = 0;
                    position.y = 0;
                    rotation = rotation + -1*(Math.PI/180);
                }
                else if(controller[37].pressed && controller[40].pressed)
                {
                    position.x = 0;
                    position.y = 0;
                    rotation = rotation -1*(Math.PI/180);
                }
                else if(controller[39].pressed && controller[38].pressed)
                {
                    rotation = rotation + 1*(Math.PI/180);
                    position.x = 0;
                    position.y = 0;
                }
                else if(controller[39].pressed && controller[40].pressed)
                {
                    rotation = rotation + 1*(Math.PI/180);
                    position.x = 0;
                    position.y = 0;
                }
                gameArea.ctx.save();
                gameArea.clear();
                count = 0;
                gameArea.ctx.fillStyle = "black";
                gameArea.ctx.fillRect(0,0,600,600);
                home.update();
                if(isPressed && countCheck>20)
                {
                    generateBullets();
                    gunShot.play();
                    countCheck = 0;
                }
                xposi = player.x;
                yposi = player.y;
                gameArea.ctx.translate(player.x+(player.width)/2,player.y+(player.height)/2);
                gameArea.ctx.rotate(rotation);
                player.draw()
                gameArea.ctx.restore();
                if(homeBulletArray.length > 0)
                {
                    turret();
                }
                displayBullets();
                displayEnemy();
                displayPowerUps();
                getShootingData(); 
                if(isBoss && !bossEnd)
                {
                    bossArray[0].bossElem();
                    displayBossBullets();
                    displayHomingEnemies();
                    checkBoss();
                }
                document.getElementById("score").innerHTML = "SCORE : " + score;
                let a = 10 - countEnemy;
                document.getElementById("enemyLeft").innerHTML = "Enemy Left : " + a;
                document.getElementById("progressHome").value = homeHealth;
                document.getElementById("progressPlayer").value = playerHealth;
                if(playerHealth <= 0 || homeHealth <= 0)
                {
                    stopGame();
                    isGameEnd = true;          
                }
                else if(countEnemy >= 2 && !isBoss)
                {
                    isBoss = true;
                    let vax = boss[Math.floor(Math.random()*4)];
                    bossEnemy = new Generator(vax,-50,50,50,"rgb(255, 255, 255,255)");
                    bossArray.push(bossEnemy);
                    if(isBoss && !bossEnd)
                    {
                        let c4time;
                        let p4time;
                        function task4(c4time)
                        {
                            if(!isGameEnd)
                            {window.requestAnimationFrame(task4);
                            if((c4time - p4time)/1000 < 4)
                            {
                                return;
                            }
                            p4time = c4time;
                            generateBossBullets();}
                        }
                        req4 = window.requestAnimationFrame(task4);
                        let c5time;
                        let p5time;
                        function task5(c5time)
                        {
                            if(!isGameEnd)
                            {window.requestAnimationFrame(task5);
                            if((c5time - p5time)/1000 < 7)
                            {
                                return;
                            }
                            p5time = c5time;
                            generateHomingEnemies();}
                        }
                        req5 = window.requestAnimationFrame(task5);
                    }
                }
                else if(countEnemy < 2);
                else if(countEnemy == 10)
                {
                    stopGame();
                    isGameEnd = true;
                }
                checkPlayerPowerUp();  
                checkPlayerBoss();
                checkPlayerBullets();
                checkPlayerHoming();
                checkHome();
            }
        }

        function checkBoss()
        {
            var iData = gameArea.ctx.getImageData(bossArray[0].x,bossArray[0].y+bossArray[0].height,bossArray[0].width,1);
            for(let r = 0 ; r < iData.data.length ; r += 4)
            {
                if(iData.data[r] == 144 && iData.data[r+1] == 238 && iData.data[r+2] == 144 && iData.data[r+3] == 255)
                {
                    bossCount++;
                }
                if(bossCount == 8)
                {
                    bossArray.pop();
                    score += 200;
                    bossCount = 0;
                    bossEnd = true;
                }
            }
        }

        function checkPlayerPowerUp()
        {
            var imData1 = gameArea.ctx.getImageData(player.x,player.y-1,player.width,1);
            for(let y = 0 ; y < imData1.data.length ; y += 4)
            {
                if(imData1.data[y] == 255 && imData1.data[y+1] == 20 && imData1.data[y+2] == 147 && imData1.data[y+3] == 255)
                {
                    if(homeHealth < 95)
                    {homeHealth += 5/24;}
                    else
                    {homeHealth = 100;}
                    if(playerHealth < 95)
                    {playerHealth += 5/24;}
                    else
                    {playerHealth = 100}
                    score += 100;
                }
            }
            var imData2 = gameArea.ctx.getImageData(player.x,player.y+player.height+1,player.width,1);
            for(let y = 0 ; y < imData2.data.length ; y += 4)
            {
                if(imData2.data[y] == 255 && imData2.data[y+1] == 20 && imData2.data[y+2] == 147 && imData2.data[y+3] == 255)
                {
                    if(homeHealth < 95)
                    {homeHealth += 5/24;}
                    else
                    {homeHealth = 100;}
                    if(playerHealth < 95)
                    {playerHealth += 5/24;}
                    else
                    {playerHealth = 100}
                    score += 100/8;
                }
            }
            var imData3 = gameArea.ctx.getImageData(player.x-1,player.y,1,player.height);
            for(let y = 0 ; y < imData3.data.length ; y += 4)
            {
                if(imData3.data[y] == 255 && imData3.data[y+1] == 20 && imData3.data[y+2] == 147 && imData3.data[y+3] == 255)
                {
                    if(homeHealth < 95)
                    {homeHealth += 5/24;}
                    else
                    {homeHealth = 100;}
                    if(playerHealth < 95)
                    {playerHealth += 5/24;}
                    else
                    {playerHealth = 100}
                    score += 100/8;
                }
            }
            var imData4 = gameArea.ctx.getImageData(player.x+player.width+1,player.y,1,player.height);
            for(let y = 0 ; y < imData4.data.length ; y += 4)
            {
                if(imData4.data[y] == 255 && imData4.data[y+1] == 20 && imData4.data[y+2] == 147 && imData4.data[y+3] == 255)
                {
                    if(homeHealth < 95)
                    {homeHealth += 5/24;}
                    else
                    {homeHealth = 100;}
                    if(playerHealth < 95)
                    {playerHealth += 5/24;}
                    else
                    {playerHealth = 100}
                    score += 100/8;
                }
            }
        }

        function checkPlayerBullets()
        {
            var imData1 = gameArea.ctx.getImageData(player.x,player.y-1,player.width,1);
            for(let y = 0 ; y < imData1.data.length ; y += 4)
            {
                if(imData1.data[y] == 242 && imData1.data[y+1] == 87 && imData1.data[y+2] == 10 && imData1.data[y+3] == 255) 
                {
                    playerHealth -= 0.5;
                    break;
                }
            }
            var imData2 = gameArea.ctx.getImageData(player.x,player.y+player.height+1,player.width,1);
            for(let y = 0 ; y < imData2.data.length ; y += 4)
            {
                if(imData2.data[y] == 242 && imData2.data[y+1] == 87 && imData2.data[y+2] == 10 && imData2.data[y+3] == 255) 
                {
                    playerHealth -= 0.5;
                    break;
                }
            }
            var imData3 = gameArea.ctx.getImageData(player.x-1,player.y,1,player.height);
            for(let y = 0 ; y < imData3.data.length ; y += 4)
            {
                if(imData3.data[y] == 242 && imData3.data[y+1] == 87 && imData3.data[y+2] == 10 && imData3.data[y+3] == 255) 
                {
                    playerHealth -= 0.5;
                    break;
                }
            }
            var imData4 = gameArea.ctx.getImageData(player.x+player.width+1,player.y,1,player.height);
            for(let y = 0 ; y < imData4.data.length ; y += 4)
            {
                if(imData4.data[y] == 242 && imData4.data[y+1] == 87 && imData4.data[y+2] == 10  && imData4.data[y+3] == 255)
                {
                    playerHealth -= 0.5;
                    break;
                }
            }
        }

        function checkPlayerBoss()
        {
            var imData1 = gameArea.ctx.getImageData(player.x,player.y-1,player.width,1);
            for(let y = 0 ; y < imData1.data.length ; y += 4)
            {
                if(imData1.data[y] == 0 && imData1.data[y+1] == 255 && imData1.data[y+2] == 65 && imData1.data[y+3] == 255) 
                {
                    playerHealth -= 1;
                    break;
                }
            }
            var imData2 = gameArea.ctx.getImageData(player.x,player.y+player.height+1,player.width,1);
            for(let y = 0 ; y < imData2.data.length ; y += 4)
            {
                if(imData2.data[y] == 0 && imData2.data[y+1] == 255 && imData2.data[y+2] == 65 && imData2.data[y+3] == 255) 
                {
                    playerHealth -= 1;
                    break;
                }
            }
            var imData3 = gameArea.ctx.getImageData(player.x-1,player.y,1,player.height);
            for(let y = 0 ; y < imData3.data.length ; y += 4)
            {
                if(imData3.data[y] == 0 && imData3.data[y+1] == 255 && imData3.data[y+2] == 65 && imData3.data[y+3] == 255) 
                {
                    playerHealth -= 1;
                    break;
                }
            }
            var imData4 = gameArea.ctx.getImageData(player.x+player.width+1,player.y,1,player.height);
            for(let y = 0 ; y < imData4.data.length ; y += 4)
            {
                if(imData4.data[y] == 0 && imData4.data[y+1] == 255 && imData4.data[y+2] == 65  && imData4.data[y+3] == 255)
                {
                    playerHealth -= 1;
                    break;
                }
            }
        }

        function checkPlayerHoming()
        {
            var imData1 = gameArea.ctx.getImageData(player.x,player.y-1,player.width,1);
            for(let y = 0 ; y < imData1.data.length ; y += 4)
            {
                if(imData1.data[y] == 0 && imData1.data[y+1] == 200 && imData1.data[y+2] == 255 && imData1.data[y+3] == 255) 
                {
                    playerHealth -= 1;
                    break;
                }
            }
            var imData2 = gameArea.ctx.getImageData(player.x,player.y+player.height+1,player.width,1);
            for(let y = 0 ; y < imData2.data.length ; y += 4)
            {
                if(imData2.data[y] == 0 && imData2.data[y+1] == 200 && imData2.data[y+2] == 255 && imData2.data[y+3] == 255) 
                {
                    playerHealth -= 1;
                    break;
                }
            }
            var imData3 = gameArea.ctx.getImageData(player.x-1,player.y,1,player.height);
            for(let y = 0 ; y < imData3.data.length ; y += 4)
            {
                if(imData3.data[y] == 0 && imData3.data[y+1] == 200 && imData3.data[y+2] == 255 && imData3.data[y+3] == 255) 
                {
                    playerHealth -= 1;
                    break;
                }
            }
            var imData4 = gameArea.ctx.getImageData(player.x+player.width+1,player.y,1,player.height);
            for(let y = 0 ; y < imData4.data.length ; y += 4)
            {
                if(imData4.data[y] == 0 && imData4.data[y+1] == 200 && imData4.data[y+2] == 255  && imData4.data[y+3] == 255)
                {
                    playerHealth -= 1;
                    break;
                }
            }
        }

        function generateEnemies()
        {
            let varx = enemies[1+Math.floor(Math.random()*29)];
            if(varx < 200 || varx > 400)
            enemy = { x : varx , y : 0 , width : 20, height : 20 , color : "rgb(255,0,0,255)" , position : 1}
            else
            enemy = { x : varx , y : 0 , width : 20, height : 20 , color : "rgb(255,0,0,255)" , position : 0}
            enemyArray.push(enemy);
        }

        function displayEnemy()
        {
            for(let en of enemyArray)
            {
                var attack = false;
                var homeAttack = false;
                if(en.y < 600)
                {
                    var imageData1 = gameArea.ctx.getImageData(en.x,(en.y+en.height+1),en.width,1);
                    for(let k = 0 ; k < imageData1.data.length ; k += 4)
                    {
                        if(imageData1.data[k] == 144 && imageData1.data[k+1] == 238 && imageData1.data[k+2] == 144  && imageData1.data[k+3] == 255)
                        {
                            attack = true;
                            break;
                        }
                        else if(imageData1.data[k] == 0 && imageData1.data[k+1] == 0 && imageData1.data[k+2] == 200  && imageData1.data[k+3] == 255)
                        {
                            homeAttack = true;
                            break;
                        }
                    }
                    if(!attack && !homeAttack)
                    {
                        var imageData2 = gameArea.ctx.getImageData(en.x-1,en.y,1,en.height);
                        for(let k = 0 ; k < imageData2.data.length ; k += 4)
                        {
                            if(imageData2.data[k] == 144 && imageData2.data[k+1] == 238 && imageData2.data[k+2] == 144  && imageData2.data[k+3] == 255)
                            {
                                attack = true;
                                
                                break;
                            }
                            else if(imageData2.data[k] == 0 && imageData2.data[k+1] == 0 && imageData2.data[k+2] == 200  && imageData2.data[k+3] == 255)
                            {
                                homeAttack = true;
                                
                                break;
                            }
                        }
                    }
                    var imageData3 = gameArea.ctx.getImageData(en.x,en.y-1,en.width,1);
                    for(let k = 0 ; k < imageData3.data.length ; k += 4)
                    {
                        if(imageData3.data[k] == 144 && imageData3.data[k+1] == 238 && imageData3.data[k+2] == 144  && imageData3.data[k+3] == 255)
                        {
                            attack = true;
                            
                            break;
                        }
                        else if(imageData3.data[k] == 0 && imageData3.data[k+1] == 0 && imageData3.data[k+2] == 200  && imageData3.data[k+3] == 255)
                        {
                            homeAttack = true;
                            
                            break;
                        }
                    }
                    var imageData4 = gameArea.ctx.getImageData((en.x+en.width+1),en.y,1,en.height);
                    for(let k = 0 ; k < imageData4.data.length ; k += 4)
                    {
                        if(imageData4.data[k] == 144 && imageData4.data[k+1] == 238 && imageData4.data[k+2] == 144  && imageData4.data[k+3] == 255)
                        {
                            attack = true;
                            break;
                        }
                        else if(imageData4.data[k] == 0 && imageData4.data[k+1] == 0 && imageData4.data[k+2] == 200  && imageData4.data[k+3] == 255)
                        {
                            homeAttack = true;
                            break;
                        }
                    }
                    if(attack)
                    {
                        countEnemy++;
                        score += 100;
                        enemyArray.splice(count,1);
                        attack = false;
                    }
                    else if(homeAttack)
                    {
                        score += 100;
                        countEnemy++;
                        enemyArray.splice(count,1);
                        homeAttack = false;
                    }
                    else if(en.x >= 220 && en.x <= 380 && !attack && !homeAttack)
                    {
                        en.y += 1;
                        let xpo = en.x;
                        let ypo = en.y;
                        gameArea.ctx.fillStyle = "rgb(100,50,125,255)";
                        gameArea.ctx.fillRect(en.x,en.y,en.width,en.height-1);
                        gameArea.ctx.fillStyle = en.color;
                        gameArea.ctx.fillRect(en.x,en.y+en.height-1,en.width,1);
                        gameArea.ctx.fillStyle = "orange";
                        gameArea.ctx.font = "10px Arial";
                        gameArea.ctx.fillText("Enemy",en.x-5,en.y-7);
                        gameArea.ctx.fillRect(xpo+8,ypo+en.height,5,7);
                        displayEnemyBulletCenter();
                        count++;
                    }
                    else if(en.x <= 200  && !attack && !homeAttack)
                    {
                        en.y += 1;
                        gameArea.ctx.save();
                        gameArea.ctx.translate(en.x+en.width/2,en.y,en.height/2);
                        let homeX = home.x + home.width/2 - en.x;
                        let homeY = home.y - en.y;
                        let rat = homeX/homeY;
                        let ang = Math.atan(rat);
                        let xpo = 0;
                        let ypo = 0;
                        if(homeY > 0)
                        {gameArea.ctx.rotate((-ang));}
                        else 
                        {gameArea.ctx.rotate((Math.PI-ang));}
                        gameArea.ctx.fillStyle = "rgb(100,50,125,255)";
                        gameArea.ctx.fillRect(-en.width/2,-en.height/2,en.width,en.height-1);
                        gameArea.ctx.fillStyle = en.color;
                        gameArea.ctx.fillRect(-en.width/2,-en.height/2+en.height-1,en.width,1);
                        gameArea.ctx.fillStyle = "orange";
                        gameArea.ctx.font = "10px Arial";
                        gameArea.ctx.fillText("Enemy",xpo-15,ypo-15);
                        gameArea.ctx.fillRect(xpo-2,ypo+10,5,7);                    
                        displayEnemyBulletSide();
                        count++;
                        gameArea.ctx.restore();
                    }
                    else if ( en.x > 400  && !attack && !homeAttack)
                    {
                        en.y += 1;
                        gameArea.ctx.save()
                        gameArea.ctx.translate(en.x+en.width/2,en.y,en.height/2);
                        let homeX = home.x + home.width/2 - en.x;
                        let homeY = home.y - en.y;
                        let rat = homeX/homeY;
                        let ang = Math.atan(rat);
                        let xpo = 0;
                        let ypo = 0;
                        if(homeY > 0)
                        {gameArea.ctx.rotate((-ang));}
                        else 
                        {gameArea.ctx.rotate((Math.PI-ang));}
                        gameArea.ctx.fillStyle = "rgb(100,50,125,255)"
                        gameArea.ctx.fillRect(-en.width/2,-en.height/2,en.width,en.height-1);
                        gameArea.ctx.fillStyle = en.color;
                        gameArea.ctx.fillRect(-en.width/2,-en.height/2+en.height-1,en.width,1);
                        gameArea.ctx.fillStyle = "orange";
                        gameArea.ctx.font = "10px Arial";
                        gameArea.ctx.fillText("Enemy",xpo-15,ypo-15);
                        gameArea.ctx.fillRect(xpo-2,ypo+10,5,7);
                        displayEnemyBulletSide();
                        count++;
                        gameArea.ctx.restore();
                    }
                }
                else
                {
                    enemyArray.splice(count,1);
                }
            }
        }

        function checkHome()
        {
            var imgData1 = gameArea.ctx.getImageData(210,419,180,1);
            for(let u = 0 ; u < imgData1.data.length ; u += 4)
            {
                
                if(imgData1.data[u] == 0 && imgData1.data[u+1] == 255 && imgData1.data[u+2] == 65  && imgData1.data[u+3] == 255)
                {
                    homeHealth -= 1;
                    break;
                }
                else if(imgData1.data[u] == 242 && imgData1.data[u+1] == 87 && imgData1.data[u+2] == 10  && imgData1.data[u+3] == 255)
                {
                    homeHealth -= 0.5;
                    break;
                }
                else if(imgData1.data[u] == 0 && imgData1.data[u+1] == 200 && imgData1.data[u+2] == 255  && imgData1.data[u+3] == 255)
                {
                    homeHealth -= 1;
                    break;
                }
            }
            
            var imgData2 = gameArea.ctx.getImageData(210,480,180,1);
            for(let u = 0 ; u < imgData2.data.length ; u += 4)
            {
                if(imgData2.data[u] == 242 && imgData2.data[u+1] == 87 && imgData2.data[u+2] == 10  && imgData2.data[u+3] == 255)
                {
                    homeHealth -=0.5;
                    break;
                }
                else if(imgData2.data[u] == 0 && imgData2.data[u+1] == 255 && imgData2.data[u+2] == 65  && imgData2.data[u+3] == 255)
                {
                    homeHealth -= 1;
                    break;
                }
                else if(imgData2.data[u] == 0 && imgData2.data[u+1] == 200 && imgData2.data[u+2] == 255  && imgData2.data[u+3] == 255)
                {
                    homeHealth -= 1;
                    break;
                }
            }
            var imgData3 = gameArea.ctx.getImageData(209,420,1,60);
            for(let u = 0 ; u < imgData3.data.length ; u += 4)
            {
                if(imgData3.data[u] == 242 && imgData3.data[u+1] == 87 && imgData3.data[u+2] == 10  && imgData3.data[u+3] == 255)
                {
                    homeHealth -= 0.5;
                    break;
                }
                else if(imgData3.data[u] == 0 && imgData3.data[u+1] == 255 && imgData3.data[u+2] == 65  && imgData3.data[u+3] == 255)
                {
                    homeHealth -= 1;
                    break;
                }
                else if(imgData3.data[u] == 0 && imgData3.data[u+1] == 200 && imgData3.data[u+2] == 255  && imgData3.data[u+3] == 255)
                {
                    homeHealth -= 1;
                    break;
                }
            }
            var imgData4 = gameArea.ctx.getImageData(390,420,1,60);
            for(let u = 0 ; u < imgData4.data.length ; u += 4)
            {
                if(imgData4.data[u] == 242 && imgData4.data[u+1] == 87 && imgData4.data[u+2] == 10  && imgData4.data[u+3] == 255)
                {
                    homeHealth -= 0.5;
                    break;
                }
                else if(imgData4.data[u] == 0 && imgData4.data[u+1] == 255 && imgData4.data[u+2] == 65  && imgData4.data[u+3] == 255)
                {
                    homeHealth -= 1;
                    break;
                }
                else if(imgData4.data[u] == 0 && imgData4.data[u+1] == 200 && imgData4.data[u+2] == 255  && imgData4.data[u+3] == 255)
                {
                    homeHealth -= 1;
                    break;
                }
            }
        }

        function getShootingData()
        {
            let shootOk = false;
            let pixelCount = 0;
            var shootingData = gameArea.ctx.getImageData(210,100,180,1);
            for(let dat = 0 ; dat < shootingData.data.length ; dat += 4)
            {
                if(shootingData.data[dat] == 255 && shootingData.data[dat+1] == 0 && shootingData.data[dat+2] == 0 && shootingData.data[dat+3] == 255)
                {
                    pixelCount += 10;
                    shootOk = true;
                    break;
                }
                else
                {
                    pixelCount++;
                }
            }
            if(shootOk)
            {              
                homeBullet = { xPosit : home.x + (home.width/2) , yPosit : home.y + home.height/2, color : "rgba(0,0,200,255)"};
                let shootX = home.width/2 - pixelCount;
                let shootY = home.y+home.height/2 - 100;
                let ratio = shootY/shootX;
                let angle = (Math.atan(ratio));
                let travelX = 5*Math.cos(angle);
                let travelY = 5*Math.sin(angle);
                homeBullet.dirX = travelX;
                homeBullet.dirY = travelY;
                homeBulletArray.push(homeBullet);
                pixelCount = 0;
                shootOk = false;
            }
        }

        function turret()
        {
            let n = 0;
            for( let h = 0 ; h < homeBulletArray.length ; h++)
            {
                if(homeBulletArray[h].yPosit > 0)
                {
                    if(homeBulletArray[h].dirX <= 0 || homeBulletArray[h].dirY <= 0)
                    {
                        homeBulletArray[h].xPosit += homeBulletArray[h].dirX;
                        homeBulletArray[h].yPosit += homeBulletArray[h].dirY;
                    }
                    else
                    {
                        homeBulletArray[h].xPosit -= homeBulletArray[h].dirX;
                        homeBulletArray[h].yPosit -= homeBulletArray[h].dirY;
                    }
                    gameArea.ctx.beginPath();
                    gameArea.ctx.fillStyle = homeBulletArray[h].color;
                    gameArea.ctx.arc(homeBulletArray[h].xPosit,homeBulletArray[h].yPosit,3,0,2*Math.PI);
                    gameArea.ctx.fill();
                    n++;
                }
                else
                homeBulletArray.splice(0,1);
            }
        }

        function generateBullets()
        {
            bullet = {color :"rgba(144,238,144,255)" , positionX : player.x+15 , positionY : player.y+15, directionX : 5*Math.sin(rotation) , directionY : 5*Math.cos(rotation)};
            bulletArray.push(bullet);
        }

        function generateEnemyBullets()
        {
            for(let enem of enemyArray)
            {
                if(enem.position)
                {
                    enemyBullet = { x : 0  , y : 10 , radius : 3 , color : "rgba(242,87,10,255)"};
                    enemyBulletArraySide.push(enemyBullet);
                }
                else if(!enem.position)
                {
                    enemyBullet = { x : enem.x+10 , y : enem.y+30 , radius : 3 , color : "rgba(242,87,10,255)"};
                    enemyBulletArrayCenter.push(enemyBullet)
                }
            }
        }
        

        function generateBossBullets()
        {
            bossBullet =  new Generator(bossEnemy.x+12,bossEnemy.y+bossEnemy.height + 15,3,10,"rgba(0,255,65,255)");
            bossBulletsArray.push(bossBullet);
            bossBullet =  new Generator(bossEnemy.x+23,bossEnemy.y+bossEnemy.height + 15,3,10,"rgba(0,255,65,255)");
            bossBulletsArray.push(bossBullet);
            bossBullet =  new Generator(bossEnemy.x+34,bossEnemy.y+bossEnemy.height + 15,3,10,"rgba(0,255,65,255)");
            bossBulletsArray.push(bossBullet);
        }

        function generateHomingEnemies()
        {
            homingEnemies = new Generator(bossEnemy.x+20,bossEnemy.y+bossEnemy.height + 15,10,10,"rgba(0,200,255,255)");
            homingEnemiesArray.push(homingEnemies);
        }

        function generatePowerUps()
        {
            let varix = enemies[1+Math.floor(Math.random()*29)];
            power = new Generator(varix,0,20,20,"rgb(255, 20, 147,255)");
            powerArray.push(power);
        }

        function displayBullets()
        {
            var i = 0;
            for(i = 0 ; i < bulletArray.length ; i++)
            {
                if((bulletArray[i].positionY+yposi+15) > 0)
                {
                    bulletArray[i].positionX += bulletArray[i].directionX;
                    bulletArray[i].positionY -= bulletArray[i].directionY;
                    gameArea.ctx.beginPath();
                    gameArea.ctx.fillStyle = bulletArray[i].color;
                    gameArea.ctx.arc(bulletArray[i].positionX,bulletArray[i].positionY,3,0,2*Math.PI);
                    gameArea.ctx.fill();
                }
                else
                {
                    bulletArray.splice(i,1);
                }
            }
        }

        function displayBossBullets()
        {
            let f = 0;
            let coubos = 0;
            let fla = true;
            for(let bo of bossBulletsArray)
            {
                if(bo.y < 600)
                {
                    bo.y += 2;
                    coubos++;
                    gameArea.ctx.beginPath();
                    gameArea.ctx.fillStyle = bo.color;
                    gameArea.ctx.arc(bo.x,bo.y,3,0,2*Math.PI);
                    gameArea.ctx.fill();
                    if(coubos == 2 && fla)
                    {
                        gameArea.ctx.font = "10px Arial";
                        gameArea.ctx.fillText("Boss Bullet",bo.x-25,bo.y-8);
                        coubos = 0;
                        fla = false
                    }
                    else if(coubos == 3 && !fla)
                    {
                        gameArea.ctx.font = "10px Arial";
                        gameArea.ctx.fillText("Boss Bullet",bo.x-25,bo.y-8);
                        coubos = 0;
                    }
                    f++;
                }
                else
                bossBulletsArray.splice(f,1);
            }
        }

        function displayHomingEnemies()
        {
            let sk = 0;
            for(let homEnemy of homingEnemiesArray)
            {
                if(homEnemy.y < 600)
                {
                    homEnemy.y += 5;
                    gameArea.ctx.fillStyle = homEnemy.color;
                    gameArea.ctx.fillRect(homEnemy.x,homEnemy.y,homEnemy.width,homEnemy.height);
                    gameArea.ctx.fillStyle = "magenta";
                    gameArea.ctx.font = "10px Arial";
                    gameArea.ctx.fillText("Missile",homEnemy.x-12,homEnemy.y-5);
                    sk++;
                }
                else
                {
                    homingEnemiesArray.splice(sk,1);
                }
            }
        }

        function displayPowerUps()
        {
            let co = 0;
            for(let pow of powerArray)
            {
                if(pow.y < 600)
                {
                    pow.y += 5;
                    gameArea.ctx.beginPath();
                    gameArea.ctx.fillStyle = pow.color;
                    gameArea.ctx.arc(pow.x,pow.y,5,0,2*Math.PI);
                    gameArea.ctx.font = "10px Arial";
                    gameArea.ctx.fillText("Power Up",pow.x-20,pow.y+20);
                    gameArea.ctx.fill();
                    co++;
                }
                else
                powerArray.splice(co,1);
            }
        }

        function displayEnemyBulletCenter()
        {
            var o = 0;
            for(let bulleC of enemyBulletArrayCenter)
            {
                if(bulleC.y < 600)
                {
                    bulleC.y += 5;
                    gameArea.ctx.fillStyle = "orange";
                    gameArea.ctx.font = "10px Arial";
                    gameArea.ctx.fillText("Bullet",bulleC.x-13,bulleC.y-8);
                    gameArea.ctx.beginPath();
                    gameArea.ctx.fillStyle = "rgba(242,87,10,255)";
                    gameArea.ctx.arc(bulleC.x,bulleC.y,bulleC.radius,0,2*Math.PI);
                    gameArea.ctx.fill();
                    o++;
                }
                else
                {
                    enemyBulletArrayCenter.splice(o,1);
                }
            }
        }

        function displayEnemyBulletSide()
        {
            var o = 0;
            for(let bulleS of enemyBulletArraySide)
            {
                if(bulleS.y < 600)
                {
                    bulleS.y += 5;
                    gameArea.ctx.fillStyle = "orange";
                    gameArea.ctx.font = "10px Arial";
                    gameArea.ctx.fillText("Bullet",bulleS.x-13,bulleS.y-8);
                    gameArea.ctx.beginPath();
                    gameArea.ctx.fillStyle = "rgba(242,87,10,255)";
                    gameArea.ctx.arc(bulleS.x,bulleS.y,bulleS.radius,0,2*Math.PI);
                    gameArea.ctx.fill();
                    o++;
                }
                else
                {
                    enemyBulletArraySide.splice(o,1);
                }
            }
        }

        function stopGame()
        {
            document.getElementById("model").style.display = "block";
            document.getElementById("modelHeading").innerHTML = "Game Over";
            document.getElementById("modelContent").innerHTML = "Game Over!. Press OK to start a new game."
            rankArray.push({player : name , value : score});
            rankArray.sort(function(a,b){return b.value - a.value});
            document.getElementById("lists").innerHTML = "";
            let rankCount = 1;
            for(let y = 0 ; y < rankArray.length ; y++)
            {
                rankElement = document.createElement("div");
                rankSno = document.createElement("div");
                rankName = document.createElement("div");
                rankScore = document.createElement("div");
                rankSno.innerHTML = rankCount;
                rankSno.classList.add("sno");
                rankName.innerHTML = rankArray[y].player;
                rankName.classList.add("playerName");
                rankScore.innerHTML = rankArray[y].value;
                rankScore.classList.add("playerScore");
                rankElement.classList.add("rank");
                rankElement.appendChild(rankSno);
                rankElement.appendChild(rankName);
                rankElement.appendChild(rankScore);
                document.getElementById("lists").appendChild(rankElement);
                rankCount += 1;
            }
            gameArea.clear();
            enemyArray = [];
            bulletArray = [];
            enemyBulletArrayCenter = [];
            enemyBulletArraySide =[];
            homeBulletArray = [];
            powerArray = [];
            bossArray = [];
            bossBulletsArray = [];
            homingEnemiesArray = [];
            playerHealth = 100;
            homeHealth = 100;
            score = 0;
            document.getElementById("score").innerHTML = "SCORE : " + score;
            rotation = 0;
            position.x = 0;
            position.y = 0;
            rotation = 0;
            countEnemy = 0;
            isBoss = false;
            isPressed = false;
            bossEnd = false;
            isPause  = false;
            bossCount = 0;
            countCheck = 0;
            controller[37].pressed = false;
            controller[38].pressed = false;
            controller[39].pressed = false;
            controller[40].pressed = false;
            func();
            //startGame();
        }

        function pause()
        {
            if(isPause == true)
            {
                isPause = false;
            }
            else
            {
                isPause = true;
                gunShot.pause();
            }
        }

        var controller = {
            37 : {pressed : false},
            38 : {pressed : false},
            39 : {pressed : false},
            40 : {pressed : false}
        }
        
        window.addEventListener("keydown", (e) =>
        {
            if(!isPause)
            {
            switch(e.key)
            {
                case "ArrowUp":
                    if(player.y <= 0)    
                    {
                        position.x = 0;
                        position.y = 0;
                        break;
                    }
                    else
                    {
                        position.y = -1;
                        controller[e.keyCode].pressed = true;
                        break;
                    }
                case "ArrowDown":
                    if((player.y + player.height) >= 600)
                    {
                        position.x = 0;
                        position.y = 0;
                        break;
                    }
                    else
                    {
                        position.y = 1;
                        controller[e.keyCode].pressed = true;
                        break;
                    }
                case "ArrowLeft":
                    if(player.x <= 0)
                    {
                        position.x = 0;
                        position.y = 0;
                        break;
                    }
                    else
                    {
                        position.x = -1;
                        controller[e.keyCode].pressed = true;
                        break;
                    }
                case "ArrowRight":
                    if((player.x + player.width) >= 600)
                    {
                        position.x = 0;
                        position.y = 0;
                        break;
                    }
                    else
                    {
                        position.x = 1;
                        controller[e.keyCode].pressed = true;
                        break;
                    }
                case " ":
                    isPressed = true;
            }
            }
        })
        
        window.addEventListener("keyup", (e) =>
        {
            if(!isPause)
            {
            switch(e.key)
            {
                case "ArrowUp":
                    if(controller[e.keyCode].pressed)
                    {controller[e.keyCode].pressed = false;
                    break;}
                case "ArrowDown":
                    if(controller[e.keyCode].pressed)
                    {controller[e.keyCode].pressed = false;
                    break;}
                case "ArrowLeft":
                    if(controller[e.keyCode].pressed)
                    {controller[e.keyCode].pressed = false;
                    break;}
                case "ArrowRight":
                    if(controller[e.keyCode].pressed)
                    {controller[e.keyCode].pressed = false;
                    break;}
                case " ":
                    isPressed = false;
            }
        }
        })