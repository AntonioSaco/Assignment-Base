const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'; // Where we fetch from

const empty = ""; // Empty string that replaces suggestions if query becomes empty

const places = []; // The array of data

//Get the json data then push it into the array
fetch(endpoint) 
    .then(blob => blob.json())
    .then(data => places.push(...data));

// Search array using filterWord, then return matches of specific criteria (ie city/state/name)
function findMatch(filterWord, places){
    return places.filter(place => {
        const regex = new RegExp(filterWord, 'gi'); // Global and not case sensitive
        return place.name.match(regex) || place.city.match(regex) || place.category.match(regex);
    });
}

// Display results of findMatch with specific criteria (name, category, etc)
function showMatches(){
    const results = findMatch(this.value, places);
    const html = results.map(place => {
        return `
            <li>
              <span class="name"> ${place.name} <br/> </span>
              <span class="category"> ${place.category} </span>
              <span class="address"> ${place.address_line_1} </span>
              <span class="address"> ${place.city}, ${place.state} </span>
              <span class="address"> Owner: ${place.owner} </span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;

    // Make suggestions list empty if user deletes all characters in search box
    if (this.value.length === 0){
        suggestions.innerHTML = empty;
    }
}

const userSearch = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// Call the getMatches function everytime the user types into the searchbar
userSearch.addEventListener('change', showMatches);
userSearch.addEventListener('keyup', showMatches);