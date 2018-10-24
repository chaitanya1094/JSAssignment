function getMovies() {
	
	var fetchpromise = fetch("http://localhost:3000/movies")
	return fetchpromise
		.then((response) => {
			if (response.status === 200){
				//console.log(response);
				 return response.json()
				}
			else

				return Promise.reject(new Error('Could not fetch data'));

		})
		.then((movies) => {
			//console.log(movies);
			let ulInnerHTML = "";
			const data=document.getElementById('moviesList');
			for (let i = 0; i < movies.length; ++i) {
				var val = movies[i]["title"];
				var pp = movies[i]["posterPath"];

				ulInnerHTML += `<div class="card" style="width: 10rem;">
  <img class="card-img-top" src=${pp} alt=${val}>
  <div class="card-body">
    <h5 class="card-title">${val}</h5>
     <a  onclick=addFavourite(${movies[i].id}) class="btn btn-primary">Add to fav</a>
  </div>
</div>`
   data.innerHTML=ulInnerHTML
			}
			 return movies;
			
		})
		.catch((error) => {
			//return Promise.reject(new Error('Could not fetch data'));
			console.log(error);

		})

	//return fetchpromise;

}


function getFavourites() {
	
	var fetchpromise = fetch("http://localhost:3000/favourites")
	return fetchpromise
		.then((response) => {
			if (response.status === 200){
				//console.log(response);
				 return response.json()
				}
			else

				return Promise.reject(new Error('Could not fetch data'));

		})
		.then((movies) => {
			//console.log(movies);
			let ulInnerHTML = "";
			const data=document.getElementById('favouritesList');
			for (let i = 0; i < movies.length; ++i) {
				var val = movies[i]["title"];
				var pp = movies[i]["posterPath"];

				ulInnerHTML += `<div class="card" style="width: 10rem;">
  <img class="card-img-top" src=${pp} alt=${val}>
  <div class="card-body">
    <h5 class="card-title">${val}</h5>

  </div>
</div>`
   data.innerHTML=ulInnerHTML
			}
			 return movies;
			
		})
		.catch((error) => {
			return Promise.reject(new Error('Could not fetch data'));
			console.log(error);

		})

	//Sreturn fetchpromise;

}



function addFavourite(id) {
	var fav=[];
	var movie;
	var url = "http://localhost:3000/movies";
	fetchpromise = fetch(url)
	return fetchpromise
   .then((response) => {
	   if (response.status === 200)			
			return response.json()			
	   else
		   return Promise.reject(new Error('Could not fetch data'))
   })
   .then((movies) => {
	   	   for(var i=0;i<movies.length;++i){
		   if(movies[i].id==id){
			return movies[i];
		   }
	   }
	   //return movies
   })
   .then((movies) => {
	  console.log(movies);
	  movie=movies;
	    fetch("http://localhost:3000/favourites", {
		   method: 'POST',
		   headers: {
			   'Content-Type': 'application/json'
		   },
		   body: JSON.stringify(movies)
	   })
   })
   .then((response) => {
	//console.log(response);
	//if(response.status==200){
	//	console.log(response);
		//console.log('Record Added________________________________________________________________________________--')
		return response;
		
	//	}
	//	else{
	//		return Promise.reject(new Error('Movie alredy present in DB'))
			//console.log("Movie alredy present in DB");
	//	}
   }).then((response)=>{
	   fav=getFavourites();
	   return fav.push(movie);
   }).then((result)=>{
	console.log(result);
	console.log("-----");
   })
 

   .catch((error => {
	  console.log(error);
	   return Promise.reject(new Error(error))
   }))



}



module.exports = {

	getMovies,

	getFavourites,

	addFavourite

};



	// You will get error - Uncaught ReferenceError: module is not defined

	// while running this script on browser which you shall ignore

	// as this is required for testing purposes and shall not hinder

	// it's normal execution