

		
async function getContent() {
	const options = {
		method: 'GET',
		mode: 'cors',
		cache: 'default'
	}

	try{
	fetch('http://127.0.0.1:8081/rotas_user').then(function (response){
		return response.json();
	})
	.then(function(data){
		console.log(data);
	})

	console.log(response)

	let output = ''
	for (let user of users){
		output += `<li>${user.local}</li>`
	}
	document.querySelector('user').innerHTML=output

	}catch (error){
		console.log(error)
	}
}

function show(user){

//let output = ''
//for (let user of users){
//		output += `<li>${user.name}</li>`
//	}
//	document.querySelector('user').innerHTML=output
	
	const tbody = document.getElementById('tbody')
	tbody.innerHTML = people.map( user=> {
//	people = document.createElement('user').innerHTML = person;

	//tbody.appendChild(people)
	document.write("Novo usuario" + user.nome + " ")

return `	<tr>
		<h2 id = "user"></h2>	
		<td>${user.id}</td>
		<td>${user.nome}</td>
		</tr>`
	})
}


async function getContent() {
		const options = {
			method: 'GET',
			mode: 'cors',
			cache: 'default'
		}

		try{
		fetch('http://127.0.0.1:8081/rotas_user').then(function (response){
			return response.json();
		})
		.then(function(data){
			console.log(data);
		})
	
		console.log(response)

		let output = ''
		for (let user of users){
			output += `<li>${user.local}</li>`
		}
		document.querySelector('user').innerHTML=output
	
		}catch (error){
			console.log(error)
		}
}

function show(user){
	
	//let output = ''
	//for (let user of users){
	//		output += `<li>${user.name}</li>`
	//	}
	//	document.querySelector('user').innerHTML=output
		
		const tbody = document.getElementById('tbody')
		tbody.innerHTML = people.map( user=> {
	//	people = document.createElement('user').innerHTML = person;
	
		//tbody.appendChild(people)
		document.write("Novo usuario" + user.nome + " ")
	
	return `	<tr>
			<h2 id = "user"></h2>	
			<td>${user.id}</td>
			<td>${user.nome}</td>
			</tr>`
		})
	}


function altera(form2)
{
	var name=prompt("Digite a Sala:","A B C D E F G H");
	
	if (name!=null && name!="")
	 
	var TA=document.form2.input.value
	var TB=document.form2.input.value

		document.write("Sala A");
		document.write(TA);
		document.write("Sala B");
		document.write(TB);
}