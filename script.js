let meteoActuelleParVille = document.querySelector("#meteoActuelle")
let inputRecherche = document.querySelector("#recherche")

let staticBackdropLabel = document.querySelector('#staticBackdropLabel')
let previsionTable = document.querySelector('#previsionTable')

villes_de_france = [
    "Paris", "Marseille"
    , "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg",
    "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre", "Cannes",
    "Saint-Étienne", "Toulon", "Grenoble", "Dijon", "Angers", "Nîmes", "Villeurbanne",
    "Saint-Denis", "Le Mans", "Aix-en-Provence", "Clermont-Ferrand", "Brest",
    "Tours", "Limoges", "Amiens", "Annecy", "Perpignan", "Boulogne-Billancourt",
    "Metz", "Besançon", "Orléans", "Saint-Denis", "Argenteuil", "Rouen", "Mulhouse",
    "Montreuil", "Caen", "Nancy", "Saint-Paul", "Roubaix", "Tourcoing", "Nanterre",
    "Avignon", "Vitry-sur-Seine", "Créteil", "Dunkerque", "Poitiers", "Asnières-sur-Seine",
    "Courbevoie", "Versailles", "Colombes", "Fort-de-France", "Aulnay-sous-Bois", "Saint-Pierre",
    "Rueil-Malmaison", "Pau", "Aubervilliers", "Le Tampon", "Champigny-sur-Marne", "Antibes",
    "La Rochelle", "Calais", "Saint-Maur-des-Fossés", "Cannes", "Drancy", "Ajaccio", "Béziers",
    "Bourges", "La Seyne-sur-Mer", "Lorient", "Saint-Quentin", "Pessac", "Ivry-sur-Seine", "Épinal",
    "Albi", "La Roche-sur-Yon", "Maisons-Alfort", "Chelles", "Meaux", "Issy-les-Moulineaux",
    "Charleville-Mézières", "Châteauroux", "Cayenne", "Troyes", "Chambéry", "Le Perreux-sur-Marne",
    "Vénissieux", "Cagnes-sur-Mer", "Niort", "Villejuif", "Saint-Nazaire", "Montauban", "Saint-André",
    "Hyères", "Épinay-sur-Seine", "Vannes", "Sarcelles", "Saint-Brieuc", "Sète", "Saint-Louis",
    "Cholet", "Salon-de-Provence", "Gennevilliers", "La Courneuve", "Bagneux", "Saint-Herblain",
    "Quimper", "Vaulx-en-Velin", "Villeneuve-d'Ascq", "Vitrolles", "Échirolles", "Talence", "Puteaux",
    "Rosny-sous-Bois", "Martigues", "Noisy-le-Grand", "Évreux", "Narbonne", "Colmar", "Massy",
    "Bondy", "La Ciotat", "Grasse", "Blois", "Meudon", "Épinal", "Clamart", "Vincennes",
    "Sartrouville", "Évry-Courcouronnes", "Fontenay-sous-Bois", "Châtillon", "Sevran", "Alfortville",
    "Laval", "Clichy-sous-Bois", "Cannes", "Montrouge", "Bastia", "Suresnes", "Meaux", "Livry-Gargan",
    "Bron", "Pantin", "Saint-Malo", "Saint-Ouen", "La Seyne-sur-Mer", "Valenciennes", "Villeneuve-Saint-Georges",
    "Caluire-et-Cuire", "Épinay-sur-Seine", "Évreux", "Choisy-le-Roi", "Nogent-sur-Marne", "Garges-lès-Gonesse",
    "Saint-Laurent-du-Maroni", "Angoulême", "Talence", "Cambrai", "Rosny-sous-Bois", "Saint-Germain-en-Laye",
    "Houilles", "Saint-Cloud", "Annemasse", "Bagneux", "Le Cannet", "Compiègne", "Saint-Ouen-sur-Seine",
    "Châlons-en-Champagne", "Gennevilliers", "Arras", "Sainte-Geneviève-des-Bois", "Marignane",
    "Villepinte", "Gagny", "Montigny-le-Bretonneux", "Saint-Leu", "Gap", "Saint-Martin-d'Hères",
    "Sainte-Marie", "Anglet", "Villeneuve-la-Garenne", "Poissy", "Viry-Châtillon", "Yerres",
    "Conflans-Sainte-Honorine", "L'Haÿ-les-Roses", "Charenton-le-Pont", "Élancourt", "Pontault-Combault",
    "Saint-Genis-Laval", "Sotteville-lès-Rouen", "Les Ulis", "Le Perreux-sur-Marne", "Le Plessis-Robinson",
    "Haguenau", "Sainte-Foy-lès-Lyon", "Franconville", "Châtellerault", "Villefranche-sur-Saône",
    "Vigneux-sur-Seine", "Montbéliard", "Guyancourt", "Fresnes", "Chatou", "Thionville", "Athis-Mons",
    "Hénin-Beaumont", "Saint-Mandé", "Franconville", "Sainte-Rose", "Châtillon", "Lens", "Vandœuvre-lès-Nancy",
    "Saint-Michel-sur-Orge", "Hérouville-Saint-Clair", "Saint-Martin", "Saint-Avold", "La Garenne-Colombes",
    "La Teste-de-Buch", "Montgeron", "Viry-Châtillon", "Le Kremlin-Bicêtre", "Villiers-sur-Marne",
    "Romans-sur-Isère", "Charenton-le-Pont", "Thonon-les-Bains", "Montélimar", "Vallauris", "Dreux",
    "Plaisir", "Saint-Raphaël", "Villenave-d'Ornon", "Ris-Orangis","melun"
]

async function fetchJson(url){
    let reponse = await fetch(url)
    let data = await reponse.json()
    return data
}

for (const ville of villes_de_france) {
   // console.log(ville);
    fetchJson(`https://prevision-meteo.ch/services/json/${ville}`).then(function(data){
        // Traiter les données météorologiques ici
        console.log(data['fcst_day_4']); // Pour l'instant, nous affichons simplement les données reçues dans la console
        
        meteoActuelleParVille.innerHTML+=afficherMeteo(data)
        
    }).catch(function(error) {
        console.error("Une erreur s'est produite lors de la récupération des données météorologiques :", error);
    });
}

function afficherMeteo(uneVille){

    return `
    <tr> 
            <td> ${uneVille['city_info'].name}</td>
            <td> ${uneVille['current_condition'].date} </td>
            <td style="text-align:center"> ${uneVille['current_condition'].hour} </td>
            <td style="text-align:center"> ${uneVille['current_condition'].tmp}° </td>
               <td style="text-align:center"> ${uneVille['fcst_day_0'].tmin}° </td> 
               <td style="text-align:center"> ${uneVille['fcst_day_0'].tmax}°</td> 
            <td><img src="${uneVille['fcst_day_0'].icon}" alt="">  </td>
            <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="afficherPrevision('${uneVille['city_info'].name}')">
            prévision
          </button>
        </td>
     </tr>
     
    `

}
function afficherPrevision(uneville) {
    console.log(uneville)
    staticBackdropLabel.innerHTML = uneville
    fetchJson(`https://prevision-meteo.ch/services/json/`+uneville).then(function(data){
        console.log("laaaaa")
    previsionTable.innerHTML=afficheprevision(data)
})

    
    
}
function afficheprevision(uneVille){
    console.log(uneVille)
    return `
    <tr>
    <th>Date</th>
    <th>Température min</th>
    <th>Température max</th>
    
    </tr>
    <tr>
    <td>${uneVille['fcst_day_1'].date}</td>
    <td>${uneVille['fcst_day_1'].tmax}°</td>
    <td>${uneVille['fcst_day_1'].tmin}°</td>
    <td><img src="${uneVille['fcst_day_1'].icon}" alt=""></td>
    </tr>
    <tr>
    <td>${uneVille['fcst_day_2'].date}</td>
    <td>${uneVille['fcst_day_2'].tmax}°</td>
    <td>${uneVille['fcst_day_2'].tmin}°</td>
    <td><img src="${uneVille['fcst_day_2'].icon}" alt=""></td>
    </tr>
    <tr>
    <td>${uneVille['fcst_day_3'].date}</td>
    <td>${uneVille['fcst_day_3'].tmax}°</td>
    <td>${uneVille['fcst_day_3'].tmin}°</td>
    <td><img src="${uneVille['fcst_day_3'].icon}" alt=""></td>
    </tr>
    <tr>
    <td>${uneVille['fcst_day_4'].date}</td>
    <td>${uneVille['fcst_day_4'].tmax}°</td>
    <td>${uneVille['fcst_day_4'].tmin}°</td>
    <td><img src="${uneVille['fcst_day_4'].icon}" alt=""></td>
    </tr>
    `
  }
inputRecherche.addEventListener("keyup",function(){
 fetchJson(`https://prevision-meteo.ch/services/json/`+inputRecherche.value).then(function(data){
    meteoActuelleParVille.innerHTML=afficherMeteo(data) 
    })   
})



