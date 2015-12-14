function Person(n, a, c) {
    this.constructor,
        this.name = n,
        this.address = a,
        this.cell = c,
        this.santaFor = null;
}
function SecretSanta(g) {
    this.constructor,
        this.group = g,
        this.raffle = false,
        this.fromCell = '';
}
Person.prototype = {
    setSanta: function(s) {
        this.santaFor = s;
    }
};
SecretSanta.prototype = {
    DurstenfeldShuffle: function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },
    setFromCell: function(c) {
        if (!this.raffle) {
            this.fromCell = c;
        }
    },
    addPerson: function(person) {
        if (!this.raffle) {
            this.group.push(person);
        }
    },
    raffleComplete: function() {
        this.raffle = true;
        this.sendSMS();
    },
    sendSMS: function() {
        var g = this.group;
        var i;
        for (i = 0; g.length; i++) {
          console.log(g[i].name + ", you are Secret Santa for " + g[i].santaFor); 

          /*
          //Use this to send the sms. this code is for  
          message(g[i].name + ", you are Secret Santa for " + g[i].santaFor, {
            to: g[i].cell,
            callerID: this.fromCell,
            network: "SMS"
          });
          */
        }

        /*
        //Use this algorythm to send or print the names every 3 seconds
        //useful for communicating with sms api engines because those
        //cheeky bastards regulate for soam and blah blah

         var i = g.length;
        (function theLoop (g, i) {
          setTimeout(function () {
            console.log(g[i-1].name + ", you are Secret Santa for " + g[i-1].santaFor);
            
            message(g[i-1].name + ", you are Secret Santa for " + g[i-1].santaFor, {
              to: g[i-1].cell,
              callerID: this.fromCell,
              network: "SMS"
            });
            
            if (--i) {
              theLoop(g, i);
            }
          }, 3000);
        })(g, i);
        */
    },
    draw: function() {
        var hat = this.group.slice(0);
        var success = false;
        var i;
        while (!success) {
            this.DurstenfeldShuffle(this.group);
            this.DurstenfeldShuffle(hat);
            for (i = 0; i < this.group.length; i++) {
                if ((this.group[i].name == hat[i].name) || (this.group[i].address == hat[i].address) || ((this.group[i].name == "Barry") && (hat[i].name == "Kerry")) || ((this.group[i].name == "Kerry") && (hat[i].name == "Barry")) ){
                    success = false;
                    break;
                } else {
                    success = true;
                }
            }
        }
        for (i = 0; i < this.group.length; i++) {
            this.group[i].santaFor = hat[i].name;
        }
        this.raffleComplete();
    }
};
