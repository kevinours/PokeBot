const Discord = require("discord.js");
const client = new Discord.Client();
var fs = require('fs');
var apiai = require('apiai');
var config = require('./config');
var app = apiai(config.Dialogflow);
console.log(config);


let etat = "base";
var choice = "none";


let url ='http://pokeapi.co/api/v2/pokemon?limit=949';
let request = require('request');
    var listePokemon = [];

    //Call API
    request({
        url: url,
        json: true
    },

    function(err, res, body){

    if(err){
        console.log('Erreur connexion API');
        return;
    }
        
    if(body.count <= 949){
    for(let p of body.results){
    listePokemon.push(p.name);
       // console.log(listePokemon);
    }
        
    } else {
    console.log('Aucune type trouvé avec ce nom');
    }

    }
);


let urlType ='http://pokeapi.co/api/v2/type';
let requestType = require('request');
    var listeType = [];

    //Call API
    requestType({
        url: urlType,
        json: true
    },

    function(err, res, body){

    if(err){
        console.log('Erreur connexion API');
        return;
    }
        
    if(body.count <= 20){
    for(let t of body.results){
    listeType.push(t.name);
    }
        
    } else {
    console.log('Aucune type trouvé avec ce nom');
    }

    }
);

let urlNature ='http://pokeapi.co/api/v2/nature';
let requestNature = require('request');
var pokemonNature = [];

    //Call API
    requestType({
        url: urlNature,
        json: true
    },

    function(err, res, body){

    if(err){
        console.log('Erreur connexion API');
        return;
    }
        
    if(body.count <= 25){
    for(let n of body.results){
    pokemonNature.push(n.name);
        console.log(pokemonNature);
    }
        
    } else {
    console.log('Aucune type trouvé avec ce nom');
    }

    }
);


//var listePokemon = ["bulbasaur", "pikachu", "mewtwo", "mew"];

//var listeType = ["fire", "water", "grass"];
	

var pokemonListOfType = [];


;



client.on('ready', () => {
	console.log(`En avant ${client.user.tag}!`);
	
    var channel = client.channels.get('409699064091901955');
    channel.send("Saisissez le nom d'un pokemon pour avoir sa ficher détaillée.");
    channel.send("Ou donner un type pour trouver le pokemon que vous recherchez");

});




/*
fs.readFile('pokemon.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
	for(let n of obj.results){
	console.log(n.name); }*/

	

	
	client.on('message', msg => {    
        // contient le mot "type" mais pas un type de pokemon
        if (msg.content.indexOf("type") !== -1 && msg.content.indexOf("normal") == -1 && msg.content.indexOf("fighting") == -1 && msg.content.indexOf("flying") == -1 && msg.content.indexOf("poison") == -1 && msg.content.indexOf("ground") == -1 && msg.content.indexOf("rock") == -1 && msg.content.indexOf("bug") == -1 && msg.content.indexOf("ghost") == -1 && msg.content.indexOf("steel") == -1 && msg.content.indexOf("fire") == -1 && msg.content.indexOf("water") == -1 && msg.content.indexOf("grass") == -1 && msg.content.indexOf("electric") == -1 && msg.content.indexOf("psychic") == -1 && msg.content.indexOf("ice") == -1 && msg.content.indexOf("dragon") == -1 && msg.content.indexOf("dark") == -1 && msg.content.indexOf("fairy") == -1 && msg.content.indexOf("unknow") == -1 && msg.content.indexOf("shadow") == -1)
        {
            if(msg.author.bot) return;
            //console.log("contient type MAIS pas fire ou water");
            choice = "type";
            msg.channel.send("Quel est le type que vous cherchez ?");
        } 
        
        for(var type of listeType) {
            // contient le mot "type" et un type de pokemon
            if (msg.content.indexOf("type") !== -1 && msg.content.indexOf(type) !== -1 )
            {
                if(msg.author.bot) return;
                //console.log("contient 'type' et un type de pokemon");
                var choices = ["je vais chercher les pokemon de type "+type+", un instant", "Merci de ne pas presser le bot", "savoir attendre est une qualité", "je me depeche de vous donner ça"];
                
                ChooseChoice = choices[Math.floor(Math.random() * choices.length)];
                
                msg.channel.send(ChooseChoice);
                
                
                
                
                
                let url ='http://pokeapi.co/api/v2/type/'+type;
						let request = require('request');

						//Call API
						request({
							url: url,
							json: true
						},
						function(err, res, body){

						if(err){
							console.log('Erreur connexion API');
							return;
						}
						if(body.id <= 18){                            
                            pokemonListOfType = [];
							for(let t of body.pokemon){
                                pokemonListOfType.push(t.pokemon.name);
							}
                        msg.channel.send("Précisez au moins une partie du nom du pokemon");
                                etat = "chooseNamePart";
                                
						} else {
							console.log('Aucune type trouvé avec ce nom');
							}

						}
						);

                
                
                
                
                return;
              
            } //else console.log(" ne rentre pas dans le if");

        }
                if(etat == "chooseNamePart")
                    {

                        for(let t of pokemonListOfType){
                            if (t.includes(msg.content)){
                                if(msg.author.bot) return;
                                msg.channel.send(t);
                                etat = "none";
                            } 
                        }
                    }
        

        
if (msg.content.indexOf("pokemon") !== -1 && msg.content.indexOf("nature") == -1){
    if(msg.author.bot) return;
			choice = "pokemon";
			msg.channel.send("Quel est le pokemon que vous cherchez ?");
		}
	});

	


/* --------------------------------------- */
		client.on('message', msg => {
		if(choice == "pokemon"){	
				for(let p of listePokemon){
                  if (msg.content.indexOf(p) !== -1){
					{
                        if(msg.author.bot) return;
						let url ='http://pokeapi.co/api/v2/pokemon/'+p;
						let request = require('request');

						//Call API
						request({
							url: url,
							json: true
						},
						function(err, res, body){

						if(err){
							console.log('Erreur connexion API');
							return;
						}
						if(body.id < 750){
							msg.channel.send(body.name+' est de type ');
							for(let t of body.types){
								msg.channel.send(t.type.name);
							}

							msg.channel.send('Les capacités de '+body.name+' sont ');
							for(let a of body.abilities){
								msg.channel.send(a.ability.name);
							}
                            msg.channel.send('Son poids est de '+body.weight);
                            msg.channel.send('Sa taille est de '+body.height);

						} 

						}
						);

					}

				} //else msg.channel.send('Aucune pokemon trouvé avec ce nom');
                }
			


	} else if (choice == "type"){
				for(let t of listeType){
					if (msg.content === t)
					{
                        if(msg.author.bot) return;
						let url ='http://pokeapi.co/api/v2/type/'+t;
						let request = require('request');

						//Call API
						request({
							url: url,
							json: true
						},
						function(err, res, body){

						if(err){
							console.log('Erreur connexion API');
							return;
						}
						if(body.id <= 18){
                            pokemonListOfType = [];
							for(let t of body.pokemon){
                                pokemonListOfType.push(t.pokemon.name);
							}
                        msg.channel.send("Précisez au moins une partie du nom du pokemon");
                                etat = "chooseNamePart";
						} else {
							console.log('Aucune type trouvé avec ce nom');
							}

						}
						);

					}

				}
								
	} else console.log(choice);
}); 



// info sur les natures
client.on('message', msg => {  
 if (msg.content.indexOf("nature") !== -1 && msg.content.indexOf("hardy") == -1 && msg.content.indexOf("bold") == -1 && msg.content.indexOf("modest") == -1 && msg.content.indexOf("calm") == -1 && msg.content.indexOf("timid") == -1 && msg.content.indexOf("lonely") == -1 && msg.content.indexOf("docile") == -1 && msg.content.indexOf("mild") == -1 && msg.content.indexOf("gentle") == -1 && msg.content.indexOf("hasty") == -1 && msg.content.indexOf("adamant") == -1 && msg.content.indexOf("impish") == -1 && msg.content.indexOf("bashful") == -1 && msg.content.indexOf("careful") == -1 && msg.content.indexOf("rash") == -1 && msg.content.indexOf("jolly") == -1 && msg.content.indexOf("naughty") == -1 && msg.content.indexOf("lax") == -1 && msg.content.indexOf("quirky") == -1 && msg.content.indexOf("naive") == -1)
    {
        if(msg.author.bot) return;
        let url ='http://pokeapi.co/api/v2/nature';
        let request = require('request');

        //Call API
        request({
            url: url,
            json: true
        },
        function(err, res, body){

        if(err){
            console.log('Erreur connexion API');
            return;
        }
            msg.channel.send("De quelle nature voulez vous avoir les infos ?");
        
        }
    );
    
 }
    
// if (msg.content.indexOf("hardy") !== -1 || msg.content.indexOf("bold") !== -1 || msg.content.indexOf("modest") !== -1 || msg.content.indexOf("calm") !== -1 || msg.content.indexOf("timid") !== -1 || msg.content.indexOf("lonely") !== -1 || msg.content.indexOf("docile") !== -1 || msg.content.indexOf("mild") !== -1 || msg.content.indexOf("gentle") !== -1 || msg.content.indexOf("hasty") !== -1 || msg.content.indexOf("adamant") !== -1 || msg.content.indexOf("impish") !== -1 || msg.content.indexOf("bashful") !== -1 || msg.content.indexOf("careful") !== -1 || msg.content.indexOf("rash") !== -1 || msg.content.indexOf("jolly") !== -1 || msg.content.indexOf("naughty") !== -1 || msg.content.indexOf("lax") !== -1 || msg.content.indexOf("quirky") !== -1 || msg.content.indexOf("naive") !== -1)    {
//                     msg.channel.send("ok");

// }
    
    for(let n of pokemonNature){
        if(msg.content.indexOf(n) !== -1){
            if(msg.author.bot) return;
           	let url ='http://pokeapi.co/api/v2/nature/'+n;
						let request = require('request');

						//Call API
						request({
							url: url,
							json: true
						},
						function(err, res, body){

						if(err){
							console.log('Erreur connexion API');
							return;
						}
                            var plus = 0;
						if(body.name == n){
                            for(let p of body.pokeathlon_stat_changes){
                                if(plus == 0)
                                    msg.channel.send("- "+p.pokeathlon_stat.name);
                                else
                                    msg.channel.send("+ "+p.pokeathlon_stat.name);
                                plus++;
                            }
                        }
                        }
                                );
        }
    }
 });

/* dialoglow part */

/*
client.on('message', function(message){
        if((message.cleanContent.startsWith("@" + client.user.username) || message.channel.type == 'dm') && client.user.id != message.author.id){
        var mess = remove(client.user.username, message.cleanContent);
        console.log(mess);
        const user = message.author.id;
        var promise = new Promise(function(resolve, reject) {
            var request = app.textRequest(mess, {
                sessionId: user
            });
            request.on('response', function(response) {
                console.log(response);
                var rep = response.result.fulfillment.speech;
                resolve(rep);
            });

            request.on('error', function(error) {
                resolve(null);
            });

            request.end();
        });

        (async function(){
            var result = await promise;
            if(result){
                message.reply(result);
            } else{
                message.reply("nothing here");
            }
        }());

    }
});


function remove(username, text){
    return text.replace("@" + username + " ", "");
}


*/



client.login('NDA5Njk5MjYzNDg5MjQ1MjAw.DViZsQ.RoYDprHkrXx3uq7T7y7n_Sx-Lc8');
