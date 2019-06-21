
var mods=[];
var listaAristos=[];
var listaEquipo1, listaEquipo2,listaTemporal;
var rutaImg = '/aristeia/images/';



function init(){
	loadExpansiones();	
	loadMods();
	$('#emparejamiento').hide();

	// funcion de boton enviar
	$(function(){
		$('#enviar').click(function(){
			listaAristos=[];
		    $(":checkbox:checked").each(function(i){
		      	if ( $( this ).is( ".checkexpansion" ) ) { 
		      		let idexp=$(this).val();
		      		$.each(Aristos,function(key,value){
		      			if (value.expansion == idexp){
		      				listaAristos.push(value);
		      			}
		      		});
		    	};
		    	if ( $( this ).is( ".checkmod" ) ) { mods.push($(this).val());} 
		  	});
		  	$('#emparejamiento').show();
		  	generarEscaleta();
		});
		$('#selExpansiones').click(function(){
			$(":checkbox[name='exps[]']").each(function(i){
		      	$( this ).prop('checked', $(this))	});
		});

	});
};

function loadExpansiones(){
	for (i=0;i<Expansiones.length;i++)
	{

		var contenido=Expansiones[i].Name + 
		'<input type="checkbox" value="'+Expansiones[i].Id+'" name="exps[]" class="checkexpansion">'+
		'<span class="checkmark"></span>';

    	var item = document.createElement('label');
    	item.className="container"
    	item.innerHTML = contenido;
		$("#expansiones").append( item );

	}    
	var bttn = $('<input type="button" class="button" value="Seleccionar todo" id="selExpansiones"/>');
	
	$("#expansiones").append( bttn );
};

function loadMods(){

	for (i=0;i<Mods.length;i++)
	{

		var contenido=Mods[i].Name + 
		'<input type="checkbox" name="'+Mods[i].Name+'" value="'+Mods[i].Name+'" class="checkmod">'+
		'<span class="checkmark"></span>';

    	var item = document.createElement('label');
    	item.className="container"
    	item.innerHTML = contenido;
		$("#mods").append( item );

	}    
};

function generarEscaleta(){

    let numJugadores = 4;
    let zlavin,petiso,full;
	
    error="";
    
	zlavin = ( $.inArray('Zlavin',mods) > -1) ? 1 : 0;
	petiso = ( $.inArray('Petiso',mods) > -1) ? 1 : 0;
	full = ( $.inArray('Full Random',mods) > -1) ? 1 : 0;
	// Check de numero de jugadores por mod

    
    
	if ( (zlavin == 1) && (petiso == 1) && (listaAristos.length < numJugadores*4)  )
    {
        error= "No se puede aplicar el Mod Zlavin junto con el Mod Petiso. Insuficiente numero de aristos " ;
        petiso =0;
        if (zlavin == 1 && listaAristos.length < numJugadores*2)
        {
            zlavin = 0;
        }
        
    }
    else if ((zlavin == 1) && (listaAristos.length < numJugadores*2) )
    {
        error= "No se puede aplicar el Mod Zlavin. Insuficiente número de aristos ";
        zlavin = 0;
    }
    else if ( (petiso == 1)  && (listaAristos.length < numJugadores*4) ) {
        error= "No se puede aplicar el Mod Petiso. Insuficiente número de aristos";
        petiso = 0;
    }

    if (petiso == 1) 
    { 
        numJugadores = numJugadores*2; 
    }

    if (error.length > 0) { alert(error); }


 	if (zlavin == 1)
    {
        
          //zlavin
        listaTemporal = shuffle(listaAristos); 
        listaEquipo1= listaTemporal.slice(0,numJugadores);
        listaEquipo2= listaTemporal.slice(numJugadores,numJugadores*2);
    }
    else{
        listaEquipo1 = shuffle(listaAristos).slice(0,numJugadores); 
        listaEquipo2 = shuffle(listaAristos).slice(0,numJugadores); 
    }

    // Clear divs
    $("#equipo_verde").html("");
    $("#equipo_naranja").html("");

    $.each(listaEquipo1, function(index, object){
    	let div_img = document.createElement('div');
    	
    	div_img.className="div_team"
    	div_img.setAttribute("id", "team1_"+index);

    	let img_div = document.createElement('img');
    	img_div.src = rutaImg + listaEquipo1[index].Image;
    	img_div.className = "img_team";

    	if ( (petiso == 1) && (index%2 == 1) )
    	{
    		img_div.className = "img_team2";	
    		let t = index -1;
    		$("#team1_" + t).append(img_div);

    	}
    	else
    	{
    		div_img.append(img_div);
    		$("#equipo_verde").append(div_img);
    	}
    	

    });
    $.each(listaEquipo2, function(index, object){
    	let div_img = document.createElement('div');
    	
    	div_img.className="div_team"
    	div_img.setAttribute("id", "team2_"+index);

    	let img_div = document.createElement('img');
    	img_div.src = rutaImg + listaEquipo2[index].Image;
    	img_div.className = "img_team";

    	if ( (petiso == 1) && (index%2 == 1) )
    	{
    		img_div.className = "img_team2";	
    		let t = index -1;
    		$("#team2_" + t).append(img_div);

    	}
    	else
    	{
    		div_img.append(img_div);
    		$("#equipo_naranja").append(div_img);
    	}
    	

    });


}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
