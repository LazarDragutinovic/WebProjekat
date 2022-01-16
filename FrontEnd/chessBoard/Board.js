


export default class Board {

    constructor(boardMatrix,parent = null) {
        this.boardMatrix = [];
        for(let i =0; i < 8; i++) {
            this.boardMatrix.push([]);
            for(let j = 0; j < 8;j++){
                this.boardMatrix[i].push(boardMatrix[i][j]);
            }
        }
        this.parent = parent;
        this.children = [];
    }

   
    toString() {
        let bs = "";
        for(let i = 0 ; i < 8 ; i++) {
            for(let j = 0 ; j < 8 ; j++) {
                bs += this.boardMatrix[i][j];
            }
        }
        return bs;
    }
    nasaFigura(i,j,fig) {
        let Crni = 'PRNBQK';
        let Beli = 'prnbqk';
        if (Crni.includes(fig) && Crni.includes(this.boardMatrix[i][j])) return true;
        else if(Crni.includes(fig) && Beli.includes(this.boardMatrix[i][j])) return false;
        else if(Beli.includes(fig) && Beli.includes(this.boardMatrix[i][j])) return true;
        else if (Beli.includes(fig) && Crni.includes(this.boardMatrix[i][j])) return false;
    }
    poteziPiunCrni(i,j) {
        let potezi = [];
        if (i+1 < 8 && this.boardMatrix[i+1][j] == 'E') potezi.push([i+1,j]);
        if (i == 1 && this.boardMatrix[3][j] == 'E' && this.boardMatrix[2][j] == 'E') potezi.push([3,j]);
        if (i+1 < 8 && j+1 < 8 && this.boardMatrix[i+1][j+1] != 'E') { 
        if(!this.nasaFigura(i+1,j+1,'P')) potezi.push([i+1, j+1]);
        }
        if (i+1 < 8 && j-1 >0 && this.boardMatrix[i+1][j-1] != 'E') {
            if(!this.nasaFigura(i+1,j-1,'P'))potezi.push([i+1, j-1]);
        }
        return potezi; 
    }

    poteziTopCrni(i, j) {
                let potezi = [];
                let p = i;
                while (true) {//Top napred provera
                    p++;
                    if(p>=8) break;
                    if (this.boardMatrix[p][j] == 'E') potezi.push([p,j]);
                    else if(!this.nasaFigura(p,j,'R')) {
                       potezi.push([p,j]);
                       break;
                        
                    }
                    else break;
                }
                p = i;
                while(true) {//Top nazad provera
                    p--;
                    if(p<0) break;
                    if(this.boardMatrix[p][j] == 'E') potezi.push([p,j]);
                    else if(!this.nasaFigura(p,j,'R')) {
                        potezi.push([p,j]);
                        break;
                    }
                    else break;
                }
                p=j;
                while (true) {//Top desno provera
                    p++;
                    if(p>=8) break;
                    
                    if(this.boardMatrix[i][p] == 'E') potezi.push([i,p]);
                    else if(!this.nasaFigura(i,p,'R')){
                        potezi.push([i,p]);
                        break;
                    }
                    else break;
                }

                p=j;
                while(true) {//Top levo provera
                    p--;
                    if(p<0) break;
                    
                    if(this.boardMatrix[i][p] == 'E') potezi.push([i,p]);
                    else if(!this.nasaFigura(i,p,'R')){

                        potezi.push([i,p]);
                        break
                    }
                    else break;
                }
                return potezi;
    }
    poteziKonjCrni(i,j) {
                let potezi = [];
                if(i+2 <8 && j+1<8){
                    if(this.boardMatrix[i][j] == 'E') potezi.push([i+2,j+1]);
                    else if (!this.nasaFigura(i+2,j+1,'N')) potezi.push([i+2,j+1]);
                }
                if(i+2 <8 && j-1>=0){ 
                    if(this.boardMatrix[i][j] == 'E') potezi.push([i+2,j-1]);
                    else if(!this.nasaFigura(i+2,j-1,'N')) potezi.push([i+2,j-1]);
                }
                if(i+1 <8 && j+2 <8) {
                    if(this.boardMatrix[i+1][j+2] == 'E')potezi.push([i+1,j+2]);
                    else if(!this.nasaFigura(i+1,j+2,'N')) potezi.push([i+1,j+2]);
                }
                if(i-1 >= 0 && j+2 <8 && !this.nasaFigura(i-1,j+2, 'N')) {
                    if(this.boardMatrix[i-1][j+2] == 'E')potezi.push([i-1,j+2]);
                    else if(!this.nasaFigura(i-1,j+2,'N')) potezi.push([i-1,j+2]);
                }
                if(i-2 >0 && j+1 <8) {
                    if(this.boardMatrix[i-2][j+1] == 'E') potezi.push([i-2,j+1]);
                    else if(!this.nasaFigura(i-2, j+1, 'N')) potezi.push([i-2,j+1]);
                }
                if(i-2 > 0 && j-1 >=0)  {
                    if(this.boardMatrix[i-2][j-1] == 'E')potezi.push([i-2,j-1]);
                    else if(!this.nasaFigura(i-2,j-1, 'N')) potezi.push([i-2,j-1]);
                }
                if(i-1 >= 0 && j-2 >= 0) {
                    if(this.boardMatrix[i-1][j-2] == 'E') potezi.push([i-1,j-2]);
                    else if(!this.nasaFigura(i-1,j-2,'N')) potezi.push([i-1,j-2]);
                }
                if(i+1 <8 && j-2 >= 0) {
                    if(this.boardMatrix[i][j] == 'E')potezi.push([i+1,j-2]);
                    else if(!this.nasaFigura(i+1,j-2,'N')) potezi.push([i+1,j-2]);
                }
                return potezi;
    }
    poteziLovacCrni(i,j) {
                let potezi = [];
                let p = 1;
                while(true) {//-> \/
                    if(i+p>=8 || j+p>=8) break;
                    else if (this.boardMatrix[i+p][j+p] == 'E') potezi.push([i+p,j+p]);
                    else if(!this.nasaFigura(i+p,j+p,'B')) {
                        potezi.push([i+p,j+p]);
                        break;
                    }
                    else break;
                    p++;
                }
                p = 1;
                while(true) {//<- \/
                    if(i+p>=8 || j-p<0) break;
                    else if(this.boardMatrix[i+p][j-p] == 'E') potezi.push([i+p,j-p]);
                    else if(!this.nasaFigura(i+p,j-p,'B')) {
                        potezi.push([i+p,j-p]);
                        break;
                    }
                    else break;
                    p++;
                }
                p=1;
                while(true) {//<- /\
                    if(i-p<0 || j-p<0) break;
                    else if(this.boardMatrix[i-p][j-p] == 'E') potezi.push([i-p,j-p]);
                    else if(!this.nasaFigura(i-p,j-p,'B')) {
                        potezi.push([i-p,j-p]);
                        break;
                    }
                    else break;
                    p++;
                }
                p=1;
                while(true) {//-> /\
                    if(i-p<0 || j+p >= 8) break;
                    else if(this.boardMatrix[i-p][j+p] == 'E') potezi.push([i-p,j+p]);
                    else if(!this.nasaFigura(i-p,j+p,'B')) {
                        potezi.push([i-p,j+p]);
                        break;
                    }
                    else break;
                    p++;
                }
                return potezi;
    }
    poteziKraljicaCrna(i,j) {
                let potezi = [];
                //pocetak kopije od lovca
                let p = 1;
                while(true) {//-> \/
                    if(i+p>=8 || j+p>=8) break;
                    else if (this.boardMatrix[i+p][j+p] == 'E') potezi.push([i+p,j+p]);
                    else if(!this.nasaFigura(i+p,j+p,'Q')) {
                        potezi.push([i+p,j+p]);
                        break;
                    }
                    else break;
                    p++;
                }
                p = 1;
                while(true) {//<- \/
                    if(i+p>=8 || j-p<0) break;
                    else if(this.boardMatrix[i+p][j-p] == 'E') potezi.push([i+p,j-p]);
                    else if(!this.nasaFigura(i+p,j-p,'Q')) {
                        potezi.push([i+p,j-p]);
                        break;
                    }
                    else break;
                    p++;
                }
                p=1;
                while(true) {//<- /\
                    if(i-p<0 || j-p<0) break;
                    else if(this.boardMatrix[i-p][j-p] == 'E') potezi.push([i-p,j-p]);
                    else if(!this.nasaFigura(i-p,j-p,'Q')) {
                        potezi.push([i-p,j-p]);
                        break;
                    }
                    else break;
                    p++;
                }
                p=1;
                while(true) {//-> /\
                    if(i-p<0 || j+p >= 8) break;
                    else if(this.boardMatrix[i-p][j+p] == 'E') potezi.push([i-p,j+p]);
                    else if(!this.nasaFigura(i-p,j+p,'Q')) {
                        potezi.push([i-p,j+p]);
                        break;
                    }
                    else break;
                    p++;
                }
                //kraj kopije od lovca

                //pocetak kopije od lovca
                p =i
                while (true) {//Top napred provera
                    p++;
                    if(p>=8) break;
                    if (this.boardMatrix[p][j] == 'E') potezi.push([p,j]);
                    else if(!this.nasaFigura(p,j,'Q')) {
                       potezi.push([p,j]);
                       break;
                        
                    }
                    else break;
                }
                p = i;
                while(true) {//Top nazad provera
                    p--;
                    if(p<0) break;
                    if(this.boardMatrix[p][j] == 'E') potezi.push([p,j]);
                    else if(!this.nasaFigura(p,j,'Q')) {
                        potezi.push([p,j]);
                        break;
                    }
                    else break;
                }
                p=j;
                while (true) {//Top desno provera
                    p++;
                    if(p>=8) break;
                    if(this.boardMatrix[i][p] == 'E') potezi.push([i,p]);
                    else if(!this.nasaFigura(i,p,'Q')){
                        potezi.push([i,p]);
                        break;
                    }
                    else break;
                }

                p=j;
                while(true) {//Top levo provera
                    p--;
                    if(p<0) break;
                    if(this.boardMatrix[i][p] == 'E') potezi.push([i,p]);
                    else if(!this.nasaFigura(i,p,'Q')){

                        potezi.push([i,p]);
                        break
                    }
                    else break;
                }
                //kraj kopije od topa

                return potezi;
    }
    poteziKraljCrni(i,j) {
                let potezi = [];
                if(i-1>0 && j-1>0) {                                              //x00
                    if(this.boardMatrix[i-1][j-1] == 'E') potezi.push([i-1,j-1]); //000
                    else if(!this.nasaFigura(i-1,j-1,'K')) potezi.push([i-1,j-1]);//000
                }
                if(i-1>0) {
                    if(this.boardMatrix[i-1][j] == 'E') potezi.push([i-1,j]);    //0x0
                    else if(!this.nasaFigura(i-1,j,'K')) potezi.push([i-1,j]);   //000
                }                                                                //000
                if(i-1>0 && j+1<8) {
                    if(this.boardMatrix[i-1][j+1] == 'E') potezi.push([i-1,j+1]); //00x
                    else if(!this.nasaFigura(i-1,j+1,'K')) potezi.push([i-1,j+1]);//000
                }                                                                 //000
                if(j-1>0) {
                    if(this.boardMatrix[i][j-1] == 'E') potezi.push([i,j-1]);    //000
                    else if(!this.nasaFigura(i,j-1,'K')) potezi.push([i,j-1]);   //x00
                }                                                                //000
                if(j+1<8) {
                    if(this.boardMatrix[i][j+1] == 'E') potezi.push([i,j+1]);    //000
                    else if(!this.nasaFigura(i,j+1,'K')) potezi.push([i,j+1]);   //00x
                }                                                                //000
                if(i+1<8 && j-1>0) {
                    if(this.boardMatrix[i+1][j-1] == 'E') potezi.push([i+1,j-1]);  //000
                    else if(!this.nasaFigura(i+1,j-1,'K')) potezi.push([i+1,j-1]); //000
                }                                                                  //x00
                if(i+1<8) {
                    if(this.boardMatrix[i+1][j] == 'E') potezi.push([i+1,j]);     //000
                    else if(!this.nasaFigura(i+1,j,'K')) potezi.push([i+1,j]);    //000
                }                                                                 //0x0
                if(i+1<8 && j+1<8) {
                    if(this.boardMatrix[i+1][j+1] == 'E') potezi.push([i+1,j+1]); //000
                    else if(!this.nasaFigura(i+1,j+1,'K')) potezi.push([i+1,j+1]);//000
                }    
                return potezi;
    }
    poteziPiunBeli(i,j) {
                let potezi = [];
                if(i-1 >= 0 && this.boardMatrix[i-1][j] == 'E') potezi.push([i-1,j]);
                if(i == 6 && this.boardMatrix[4][j] == 'E' && this.boardMatrix[5][j] == 'E') potezi.push([4,j])
                if(i-1 >= 0 && j+1 < 8 && this.boardMatrix[i-1][j+1] != 'E' && !this.nasaFigura(i-1,j+1,'p')) potezi.push([i-1,j+1]);
                if(i-1 >= 0 && j-1>=0 && this.boardMatrix[i-1][j-1] != 'E' && !this.nasaFigura(i-1,j-1,'p')) potezi.push([i-1,j-1]);
                return potezi;
    }
    poteziTopBeli(i,j) {
                let potezi = [];
                let p = 1;
                while(true) {//top potezi u desno
                    if(j+p >= 8) break;
                    else if(this.boardMatrix[i][j+p] == 'E') potezi.push([i,j+p]);
                    else if(!this.nasaFigura(i,j+p,'r')) {
                        potezi.push([i,j+p]);
                        break;
                    }
                    else break;
                    p++;
                }
                
                p = 1;
                while(true) {//top potezi u levo
                    if(j-p<0) break;
                    else if(this.boardMatrix[i][j-p] == 'E') potezi.push([i,j-p]);
                    else if(!this.nasaFigura(i,j-p,'r')) {
                        potezi.push([i,j-p]);
                        break;
                    }
                    else break;
                    p++;
                }

                p=1;
                while(true){//top potezi nagore
                    if(i-p < 0) break;
                    else if(this.boardMatrix[i-p][j] == 'E') potezi.push([i-p,j]);
                    else if(!this.nasaFigura(i-p,j,'r')) { potezi.push([i-p,j]);
                        break;
                    }
                    else break;
                    p++;
                }
                p=1;
                while(true) {//top potezi nadole
                    if(i+p >= 8) break;
                    else if(this.boardMatrix[i+p][j] == 'E') potezi.push([i+p,j]);
                    else if(!this.nasaFigura(i+p,j, 'r')) {potezi.push([i+p,j]);
                        break;}
                    else break;
                    p++;
                }
                return potezi;
    }
    poteziKonjBeli(i,j) {
                let potezi = [];
                if(i+2 < 8 && j+1 < 8) {
                    if(this.boardMatrix[i][j] == 'E') potezi.push([i+2,j+1]);
                    else if(!this.nasaFigura(i+2,j+1,'n')) potezi.push([i+2,j+1]);
                }
                if(i+1<8 && j+2 < 8) {
                    if(this.boardMatrix[i][j] == 'E') potezi.push([i+1,j+2]);
                    else if(!this.nasaFigura(i+1,j+2,'n')) potezi.push([i+1,j+2]);
                }
                if (i-1 >= 0 && j+2 < 8) {
                    if(this.boardMatrix[i][j] == 'E') potezi.push([i-1,j+2]);
                    else if(!this.nasaFigura(i-1,j+2, 'n')) potezi.push([i-1,j+2]);
                }
                if(i-2 >= 0 && j+1 < 8) {
                    if(this.boardMatrix[i-2][j+1] == 'E') potezi.push([i-2,j+1]);
                    else if(!this.nasaFigura(i-2,j+1,'n')) potezi.push([i-2,j+1]);
                }
                if(i-2>=0 && j-1 >= 0) {
                    if(this.boardMatrix[i-2][j-1] == 'E') potezi.push([i-2,j-1]);
                    else if(!this.nasaFigura(i-2,j-1, 'n')) potezi.push([i-2,j-1]);
                }
                if(i-1>=0 && j-2 >= 0) {
                    if(this.boardMatrix[i-1][j-2] == 'E') potezi.push([i-1,j-2]);
                    else if(!this.nasaFigura(i-1,j-2,'n')) potezi.push([i-1,j-2]);
                }
                if(i+1 < 8 && j-2 >= 0) {
                    if(this.boardMatrix[i+1][j-2] == 'E') potezi.push([i+1,j-2]);
                    else if(!this.nasaFigura(i+1,j-2,'n')) potezi.push([i+1,j-2]);
                }
                if(i+2 < 8 && j-1 >= 0) {
                    if(this.boardMatrix[i+2][j-1] == 'E') potezi.push([i+2, j-1]);
                    else if(!this.nasaFigura(i+2,j-1,'n')) potezi.push([i+2,j-1]);
                }
                return potezi;
    }
    poteziLovacBeli(i,j) {
                let potezi = [];
                let p = 1;
                while(true) {//-> \/
                    if(i+p >= 8 || j+p >= 8) break;
                    else if(this.boardMatrix[i+p][j+p] == 'E') potezi.push([i+p,j+p]);
                    else if(!this.nasaFigura(i+p,j+p,'b')) {
                        potezi.push([i+p,j+p]);
                        break;
                    }
                    else break;
                    p++;
                }
                p = 1;
                while(true) {//-> /\
                    if(i-p < 0 || j+p >= 8) break;
                    else if(this.boardMatrix[i-p][j+p] == 'E') potezi.push([i-p,j+p]);
                    else if(!this.nasaFigura(i-p,j+p,'b')) {
                        potezi.push([i-p,j+p]);
                        break;
                    }
                    else break;
                    p++;
                }
                p = 1;
                while(true) {//<- /\
                    if(i-p < 0  || j-p < 0) break;
                    else if(this.boardMatrix[i-p][j-p] == 'E') potezi.push([i-p,j-p]);
                    else if(!this.nasaFigura(i-p,j-p,'b')) {
                        potezi.push([i-p,j-p]);
                        break;
                    }
                    else break;
                    p++;
                }
                p = 1;
                while(true) {//<- \/
                    if(i+p >= 8 || j-p <0 ) break;
                    else if(this.boardMatrix[i+p][j-p] == 'E') potezi.push([i+p,j-p]);
                    else if(!this.nasaFigura(i+p,j-p,'b')) {
                        potezi.push([i+p,j-p]);
                        break;
                    }
                    else break;
                    p++;
                }

                return potezi;
    }
    poteziKraljicaBela(i,j) {
                let potezi = [];

                //kopija od lovca
                let p = 1;
                while(true) {//-> \/
                    if(i+p >= 8 || j+p >= 8) break;
                    else if(this.boardMatrix[i+p][j+p] == 'E') potezi.push([i+p,j+p]);
                    else if(!this.nasaFigura(i+p,j+p,'q')) {
                        potezi.push([i+p,j+p]);
                        break;
                    }
                    else break;
                    p++;
                }
                p = 1;
                while(true) {//-> /\
                    if(i-p < 0 || j+p >= 8) break;
                    else if(this.boardMatrix[i-p][j+p] == 'E') potezi.push([i-p,j+p]);
                    else if(!this.nasaFigura(i-p,j+p,'q')) {
                        potezi.push([i-p,j+p]);
                        break;
                    }
                    else break;
                    p++;
                }
                p = 1;
                while(true) {//<- /\
                    if(i-p < 0  || j-p < 0) break;
                    else if(this.boardMatrix[i-p][j-p] == 'E') potezi.push([i-p,j-p]);
                    else if(!this.nasaFigura(i-p,j-p,'q')) {
                        potezi.push([i-p,j-p]);
                        break;
                    }
                    else break;
                    p++;
                }
                p = 1;
                while(true) {//<- \/
                    if(i+p >= 8 || j-p <0 ) break;
                    else if(this.boardMatrix[i+p][j-p] == 'E') potezi.push([i+p,j-p]);
                    else if(!this.nasaFigura(i+p,j-p,'q')) {
                        potezi.push([i+p,j-p]);
                        break;
                    }
                    else break;
                    p++;
                }
                //kraj kopije od lovca

                //kopija od topa

                p = 1;
                while(true) {//top potezi u desno
                    if(j+p >= 8) break;
                    else if(this.boardMatrix[i][j+p] == 'E') potezi.push([i,j+p]);
                    else if(!this.nasaFigura(i,j+p,'q')) {
                        potezi.push([i,j+p]);
                        break;
                    }
                    else break;
                    p++;
                }
                
                p = 1;
                while(true) {//top potezi u levo
                    if(j-p<0) break;
                    else if(this.boardMatrix[i][j-p] == 'E') potezi.push([i,j-p]);
                    else if(!this.nasaFigura(i,j-p,'q')) {
                        potezi.push([i,j-p]);
                        break;
                    }
                    else break;
                    p++;
                }

                p=1;
                while(true){//top potezi nagore
                    if(i-p < 0) break;
                    else if(this.boardMatrix[i-p][j] == 'E') potezi.push([i-p,j]);
                    else if(!this.nasaFigura(i-p,j,'q')){ potezi.push([i-p,j]);
                        break;
                    }
                    else break;
                    p++;
                }
                p=1;
                while(true) {//top potezi nadole
                    if(i+p >= 8) break;
                    else if(this.boardMatrix[i+p][j] == 'E') potezi.push([i+p,j]);
                    else if(!this.nasaFigura(i+p,j, 'q')) {potezi.push([i+p,j]);
                        break;
                    }
                    else break;
                    p++;
                }

                //kraj kopije od topa
                return potezi;
    }
    poteziKraljBeli(i,j) {
                let potezi = [];

                if(i-1 > 0 && j - 1 > 0) {
                    if(this.boardMatrix[i-1][j-1] == 'E') potezi.push([i-1,j-1]);  //x00
                    else if(!this.nasaFigura(i-1,j-1,'k')) potezi.push([i-1,j-1]); //000
                }                                                                  //000
                if(i-1 > 0) {
                    if(this.boardMatrix[i-1][j] == 'E') potezi.push([i-1,j]);      //0x0
                    else if(!this.nasaFigura(i-1,j,'k')) potezi.push([i-1,j]);     //000
                }                                                                  //000
                if(i-1 > 0 && j + 1 < 8) {
                    if(this.boardMatrix[i-1][j+1] == 'E') potezi.push([i-1,j+1]);  //00x
                    else if(!this.nasaFigura(i-1,j+1,'k')) potezi.push([i-1,j+1]); //000
                }                                                                  //000
                if(j - 1 > 0) {
                    if(this.boardMatrix[i][j-1] == 'E') potezi.push([i,j-1]);      //000
                    else if(!this.nasaFigura(i,j-1,'k')) potezi.push([i,j-1]);     //x00
                }                                                                  //000
                if(j + 1 < 8) {
                    if(this.boardMatrix[i][j+1] == 'E') potezi.push([i,j+1]);      //000
                    else if(!this.nasaFigura(i,j+1,'k')) potezi.push([i,j+1]);     //00x
                }                                                                  //000
                if(i+1 < 8 && j - 1 > 0) {
                    if(this.boardMatrix[i+1][j-1] == 'E') potezi.push([i+1,j-1]);  //000
                    else if(!this.nasaFigura(i+1,j-1,'k')) potezi.push([i+1,j-1]); //000
                }                                                                  //x00
                if(i+1 < 8) {
                    if(this.boardMatrix[i+1][j] == 'E') potezi.push([i+1,j]);      //000
                    else if(!this.nasaFigura(i+1,j,'k')) potezi.push([i-1,j]);     //000
                }                                                                  //0x0
                if(i+1 < 8 && j + 1 < 8) {
                    if(this.boardMatrix[i+1][j+1] == 'E') potezi.push([i+1,j+1]);  //000
                    else if(!this.nasaFigura(i+1,j+1,'k')) potezi.push([i+1,j+1]); //000
                }                                                                  //00x
                return potezi;
    }
    potezi(i,j) {
        if (this.boardMatrix[i][j] == 'E') return null;
        else {
            if(this.boardMatrix[i][j] == 'P') //za piuna
               return this.poteziPiunCrni(i,j); 
            else if(this.boardMatrix[i][j] == 'R') //za top
               return this.poteziTopCrni(i,j);
            else if (this.boardMatrix[i][j] == 'N') //za konja
                
                return this.poteziKonjCrni(i,j);
            else if (this.boardMatrix[i][j] == 'B') //za lovca
                return this.poteziLovacCrni(i,j);
            else if(this.boardMatrix[i][j] == 'Q') //za kraljicu
                return this.poteziKraljicaCrna(i,j);
            else if(this.boardMatrix[i][j] == 'K') 
                return this.poteziKraljCrni(i,j);                                                            //00x
            
            else if(this.boardMatrix[i][j] == 'p') //za piuna
                return this.poteziPiunBeli(i,j);
            else if(this.boardMatrix[i][j] == 'r') //za topa
                return this.poteziTopBeli(i,j);
            else if(this.boardMatrix[i][j] == 'n') //za konja
                return this.poteziKonjBeli(i,j);
            
            else if (this.boardMatrix[i][j] == 'b') //za lovca
                return this.poteziLovacBeli(i,j);
            
            else if(this.boardMatrix[i][j] == 'q') //za kraljicu
                return this.poteziKraljicaBela(i,j);
            
            else if(this.boardMatrix[i][j] == 'k') //za kralja 
                return this.poteziKraljBeli(i,j);
            
        }
    }
}