export type CountryCapitalPair = {
  country: string;
  capital: string;
  continent: string;
  region?: string;
  neighbors?: string[];
};


export const countryCapitalPairs: CountryCapitalPair[] = [

  // Europe
  { country: "Austria", capital: "Vienna", continent: "Europe", region: "Western Europe", neighbors: ["Germany", "Czech Republic", "Slovakia", "Hungary", "Slovenia", "Italy", "Switzerland", "Liechtenstein"] },
  { country: "Belgium", capital: "Brussels", continent: "Europe", region: "Western Europe", neighbors: ["France", "Netherlands", "Germany", "Luxembourg"] },
  { country: "Bulgaria", capital: "Sofia", continent: "Europe", region: "Eastern Europe", neighbors: ["Romania", "Serbia", "North Macedonia", "Greece", "Turkey"] },
  { country: "Croatia", capital: "Zagreb", continent: "Europe", region: "Eastern Europe", neighbors: ["Slovenia", "Hungary", "Serbia", "Bosnia and Herzegovina", "Montenegro"] },
  { country: "Cyprus", capital: "Nicosia", continent: "Europe", region: "Southern Europe", neighbors: [] },
  { country: "Czech Republic", capital: "Prague", continent: "Europe", region: "Eastern Europe", neighbors: ["Germany", "Poland", "Slovakia", "Austria"] },
  { country: "Denmark", capital: "Copenhagen", continent: "Europe", region: "Northern Europe", neighbors: ["Germany"] },
  { country: "Estonia", capital: "Tallinn", continent: "Europe", region: "Northern Europe", neighbors: ["Latvia", "Russia"] },
  { country: "Finland", capital: "Helsinki", continent: "Europe", region: "Northern Europe", neighbors: ["Sweden", "Norway", "Russia"] },
  { country: "France", capital: "Paris", continent: "Europe", region: "Western Europe", neighbors: ["Belgium", "Luxembourg", "Germany", "Switzerland", "Italy", "Spain", "Andorra", "Monaco"] },
  { country: "Germany", capital: "Berlin", continent: "Europe", region: "Western Europe", neighbors: ["Denmark", "Poland", "Czech Republic", "Austria", "Switzerland", "France", "Belgium", "Netherlands", "Luxembourg"] },
  { country: "Greece", capital: "Athens", continent: "Europe", region: "Southern Europe", neighbors: ["Albania", "North Macedonia", "Bulgaria", "Turkey"] },
  { country: "Hungary", capital: "Budapest", continent: "Europe", region: "Eastern Europe", neighbors: ["Austria", "Slovakia", "Ukraine", "Romania", "Serbia", "Croatia", "Slovenia"] },
  { country: "Iceland", capital: "Reykjavik", continent: "Europe", region: "Northern Europe", neighbors: [] },
  { country: "Ireland", capital: "Dublin", continent: "Europe", region: "Western Europe", neighbors: ["United Kingdom"] },
  { country: "Italy", capital: "Rome", continent: "Europe", region: "Southern Europe", neighbors: ["France", "Switzerland", "Austria", "Slovenia", "San Marino", "Vatican City"] },
  { country: "Latvia", capital: "Riga", continent: "Europe", region: "Northern Europe", neighbors: ["Estonia", "Russia", "Lithuania", "Belarus"] },
  { country: "Lithuania", capital: "Vilnius", continent: "Europe", region: "Northern Europe", neighbors: ["Latvia", "Belarus", "Poland", "Russia"] },
  { country: "Luxembourg", capital: "Luxembourg", continent: "Europe", region: "Western Europe", neighbors: ["Belgium", "France", "Germany"] },
  { country: "Malta", capital: "Valletta", continent: "Europe", region: "Southern Europe", neighbors: [] },
  { country: "Netherlands", capital: "Amsterdam", continent: "Europe", region: "Western Europe", neighbors: ["Belgium", "Germany"] },
  { country: "Norway", capital: "Oslo", continent: "Europe", region: "Northern Europe", neighbors: ["Sweden", "Finland", "Russia"] },
  { country: "Poland", capital: "Warsaw", continent: "Europe", region: "Eastern Europe", neighbors: ["Germany", "Czech Republic", "Slovakia", "Ukraine", "Belarus", "Lithuania", "Russia"] },
  { country: "Portugal", capital: "Lisbon", continent: "Europe", region: "Southern Europe", neighbors: ["Spain"] },
  { country: "Romania", capital: "Bucharest", continent: "Europe", region: "Eastern Europe", neighbors: ["Ukraine", "Moldova", "Bulgaria", "Serbia", "Hungary"] },
  { country: "Slovakia", capital: "Bratislava", continent: "Europe", region: "Eastern Europe", neighbors: ["Czech Republic", "Austria", "Hungary", "Poland", "Ukraine"] },
  { country: "Slovenia", capital: "Ljubljana", continent: "Europe", region: "Eastern Europe", neighbors: ["Italy", "Austria", "Hungary", "Croatia"] },
  { country: "Spain", capital: "Madrid", continent: "Europe", region: "Southern Europe", neighbors: ["Portugal", "France", "Andorra", "Gibraltar"] },
  { country: "Sweden", capital: "Stockholm", continent: "Europe", region: "Northern Europe", neighbors: ["Norway", "Finland"] },
  { country: "Switzerland", capital: "Bern", continent: "Europe", region: "Western Europe", neighbors: ["Germany", "France", "Italy", "Austria", "Liechtenstein"] },
  { country: "United Kingdom", capital: "London", continent: "Europe", region: "Western Europe", neighbors: ["Ireland"] },
  { country: "Ukraine", capital: "Kyiv", continent: "Europe", region: "Eastern Europe", neighbors: ["Poland", "Slovakia", "Hungary", "Romania", "Moldova", "Belarus", "Russia"] },
  { country: "Serbia", capital: "Belgrade", continent: "Europe", region: "Eastern Europe", neighbors: ["Hungary", "Romania", "Bulgaria", "North Macedonia", "Croatia", "Bosnia and Herzegovina", "Montenegro", "Kosovo"] },
  { country: "Bosnia and Herzegovina", capital: "Sarajevo", continent: "Europe", region: "Eastern Europe", neighbors: ["Croatia", "Serbia", "Montenegro"] },
  { country: "North Macedonia", capital: "Skopje", continent: "Europe", region: "Eastern Europe", neighbors: ["Serbia", "Kosovo", "Albania", "Greece", "Bulgaria"] },
  { country: "Albania", capital: "Tirana", continent: "Europe", region: "Southern Europe", neighbors: ["Montenegro", "Kosovo", "North Macedonia", "Greece"] },
  { country: "Montenegro", capital: "Podgorica", continent: "Europe", region: "Southern Europe", neighbors: ["Bosnia and Herzegovina", "Serbia", "Kosovo", "Albania", "Croatia"] },
  { country: "Kosovo", capital: "Pristina", continent: "Europe", region: "Southern Europe", neighbors: ["Serbia", "Montenegro", "Albania", "North Macedonia"] },
  { country: "Moldova", capital: "Chișinău", continent: "Europe", region: "Eastern Europe", neighbors: ["Ukraine", "Romania"] },

  // North America
  { country: "United States", capital: "Washington, D.C.", continent: "North America", region: "North America", neighbors: ["Canada", "Mexico"] },
  { country: "Canada", capital: "Ottawa", continent: "North America", region: "North America", neighbors: ["United States"] },
  { country: "Mexico", capital: "Mexico City", continent: "North America", region: "Latin America", neighbors: ["United States", "Guatemala", "Belize"] },

  // South America
  { country: "Brazil", capital: "Brasília", continent: "South America", region: "Latin America", neighbors: ["Argentina", "Uruguay", "Paraguay", "Bolivia", "Peru", "Colombia", "Venezuela", "Guyana", "Suriname", "French Guiana"] },
  { country: "Argentina", capital: "Buenos Aires", continent: "South America", region: "Latin America", neighbors: ["Chile", "Brazil", "Uruguay", "Paraguay", "Bolivia"] },
  { country: "Chile", capital: "Santiago", continent: "South America", region: "Latin America", neighbors: ["Argentina", "Peru", "Bolivia"] },
  { country: "Peru", capital: "Lima", continent: "South America", region: "Latin America", neighbors: ["Ecuador", "Colombia", "Brazil", "Bolivia", "Chile"] },
  { country: "Colombia", capital: "Bogotá", continent: "South America", region: "Latin America", neighbors: ["Venezuela", "Brazil", "Peru", "Ecuador", "Panama"] },
  { country: "Ecuador", capital: "Quito", continent: "South America", region: "Latin America", neighbors: ["Colombia", "Peru"] },
  { country: "Uruguay", capital: "Montevideo", continent: "South America", region: "Latin America", neighbors: ["Brazil", "Argentina"] },
  { country: "Paraguay", capital: "Asunción", continent: "South America", region: "Latin America", neighbors: ["Brazil", "Argentina", "Bolivia"] },
  { country: "Venezuela", capital: "Caracas", continent: "South America", region: "Latin America", neighbors: ["Colombia", "Brazil", "Guyana"] },
  { country: "Bolivia", capital: "Sucre", continent: "South America", region: "Latin America", neighbors: ["Brazil", "Paraguay", "Argentina", "Chile", "Peru"] },

  // Africa
  { country: "Egypt", capital: "Cairo", continent: "Africa", region: "North Africa", neighbors: ["Libya", "Sudan", "Israel"] },
  { country: "South Africa", capital: "Pretoria", continent: "Africa", region: "Sub-Saharan Africa", neighbors: ["Namibia", "Botswana", "Zimbabwe", "Mozambique", "Eswatini", "Lesotho"] },
  { country: "Nigeria", capital: "Abuja", continent: "Africa", region: "Sub-Saharan Africa", neighbors: ["Benin", "Niger", "Chad", "Cameroon"] },
  { country: "Kenya", capital: "Nairobi", continent: "Africa", region: "Sub-Saharan Africa", neighbors: ["Uganda", "Tanzania", "Ethiopia", "Somalia", "South Sudan"] },
  { country: "Morocco", capital: "Rabat", continent: "Africa", region: "North Africa", neighbors: ["Algeria", "Western Sahara"] },
  { country: "Ghana", capital: "Accra", continent: "Africa", region: "Sub-Saharan Africa", neighbors: ["Côte d'Ivoire", "Burkina Faso", "Togo"] },
  { country: "Algeria", capital: "Algiers", continent: "Africa", region: "North Africa", neighbors: ["Tunisia", "Libya", "Niger", "Mali", "Mauritania", "Western Sahara", "Morocco"] },
  { country: "Ethiopia", capital: "Addis Ababa", continent: "Africa", region: "Sub-Saharan Africa", neighbors: ["Eritrea", "Djibouti", "Somalia", "Kenya", "South Sudan", "Sudan"] },
  { country: "Tunisia", capital: "Tunis", continent: "Africa", region: "North Africa", neighbors: ["Algeria", "Libya"] },

  // Asia
  { country: "China", capital: "Beijing", continent: "Asia", region: "East Asia", neighbors: ["Russia", "Mongolia", "India", "Pakistan", "Nepal", "Bhutan", "Myanmar", "Laos", "Vietnam", "North Korea", "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Afghanistan"] },
  { country: "Japan", capital: "Tokyo", continent: "Asia", region: "East Asia", neighbors: [] },
  { country: "India", capital: "New Delhi", continent: "Asia", region: "South Asia", neighbors: ["Pakistan", "China", "Nepal", "Bangladesh", "Bhutan", "Myanmar"] },
  { country: "South Korea", capital: "Seoul", continent: "Asia", region: "East Asia", neighbors: ["North Korea"] },
  { country: "Indonesia", capital: "Jakarta", continent: "Asia", region: "Southeast Asia", neighbors: [] },
  { country: "Thailand", capital: "Bangkok", continent: "Asia", region: "Southeast Asia", neighbors: ["Myanmar", "Laos", "Cambodia", "Malaysia"] },
  { country: "Malaysia", capital: "Kuala Lumpur", continent: "Asia", region: "Southeast Asia", neighbors: ["Thailand", "Indonesia", "Brunei"] },
  { country: "Philippines", capital: "Manila", continent: "Asia", region: "Southeast Asia", neighbors: [] },
  { country: "Vietnam", capital: "Hanoi", continent: "Asia", region: "Southeast Asia", neighbors: ["China", "Laos", "Cambodia"] },
  { country: "Saudi Arabia", capital: "Riyadh", continent: "Asia", region: "Middle East", neighbors: ["Jordan", "Iraq", "Kuwait", "Qatar", "UAE", "Oman", "Yemen"] },
  { country: "Israel", capital: "Jerusalem", continent: "Asia", region: "Middle East", neighbors: ["Egypt", "Jordan", "Lebanon", "Syria"] },
  { country: "Turkey", capital: "Ankara", continent: "Asia", region: "Middle East", neighbors: ["Greece", "Bulgaria", "Georgia", "Armenia", "Azerbaijan", "Iran", "Iraq", "Syria"] },
  { country: "Pakistan", capital: "Islamabad", continent: "Asia", region: "South Asia", neighbors: ["India", "China", "Afghanistan", "Iran"] },
  { country: "Bangladesh", capital: "Dhaka", continent: "Asia", region: "South Asia", neighbors: ["India", "Myanmar"] },
  { country: "United Arab Emirates", capital: "Abu Dhabi", continent: "Asia", region: "Middle East", neighbors: ["Saudi Arabia", "Oman"] },
  { country: "Iran", capital: "Tehran", continent: "Asia", region: "Middle East", neighbors: ["Armenia", "Azerbaijan", "Turkmenistan", "Afghanistan", "Pakistan", "Turkey", "Iraq"] },
  { country: "Iraq", capital: "Baghdad", continent: "Asia", region: "Middle East", neighbors: ["Turkey", "Iran", "Kuwait", "Saudi Arabia", "Jordan", "Syria"] },
  { country: "Qatar", capital: "Doha", continent: "Asia", region: "Middle East", neighbors: ["Saudi Arabia"] },
  { country: "Jordan", capital: "Amman", continent: "Asia", region: "Middle East", neighbors: ["Israel", "Palestine", "Syria", "Iraq", "Saudi Arabia"] },
  { country: "Singapore", capital: "Singapore", continent: "Asia", region: "Southeast Asia", neighbors: [] },
  { country: "Mongolia", capital: "Ulaanbaatar", continent: "Asia", region: "East Asia", neighbors: ["Russia", "China"] },
  { country: "Kazakhstan", capital: "Astana", continent: "Asia", region: "Central Asia", neighbors: ["Russia", "China", "Kyrgyzstan", "Uzbekistan", "Turkmenistan"] },
  { country: "Uzbekistan", capital: "Tashkent", continent: "Asia", region: "Central Asia", neighbors: ["Kazakhstan", "Kyrgyzstan", "Tajikistan", "Afghanistan", "Turkmenistan"] },
  { country: "Armenia", capital: "Yerevan", continent: "Asia", region: "Caucasus", neighbors: ["Georgia", "Turkey", "Iran", "Azerbaijan"] },
  { country: "Georgia", capital: "Tbilisi", continent: "Asia", region: "Caucasus", neighbors: ["Russia", "Azerbaijan", "Armenia", "Turkey"] },
  { country: "Azerbaijan", capital: "Baku", continent: "Asia", region: "Caucasus", neighbors: ["Russia", "Georgia", "Armenia", "Iran"] },
  { country: "Sri Lanka", capital: "Sri Jayawardenepura Kotte", continent: "Asia", region: "South Asia", neighbors: [] },
  { country: "Nepal", capital: "Kathmandu", continent: "Asia", region: "South Asia", neighbors: ["India", "China"] },
  { country: "Myanmar", capital: "Naypyidaw", continent: "Asia", region: "Southeast Asia", neighbors: ["India", "Bangladesh", "China", "Laos", "Thailand"] },
  { country: "Cambodia", capital: "Phnom Penh", continent: "Asia", region: "Southeast Asia", neighbors: ["Thailand", "Laos", "Vietnam"] },
  { country: "Laos", capital: "Vientiane", continent: "Asia", region: "Southeast Asia", neighbors: ["China", "Vietnam", "Cambodia", "Thailand", "Myanmar"] },
  { country: "Bhutan", capital: "Thimphu", continent: "Asia", region: "South Asia", neighbors: ["India", "China"] },
  { country: "Maldives", capital: "Malé", continent: "Asia", region: "South Asia", neighbors: [] },
  { country: "Kuwait", capital: "Kuwait City", continent: "Asia", region: "Middle East", neighbors: ["Iraq", "Saudi Arabia"] },
  { country: "Oman", capital: "Muscat", continent: "Asia", region: "Middle East", neighbors: ["Saudi Arabia", "UAE", "Yemen"] },
  { country: "Bahrain", capital: "Manama", continent: "Asia", region: "Middle East", neighbors: ["Saudi Arabia"] },
  { country: "Lebanon", capital: "Beirut", continent: "Asia", region: "Middle East", neighbors: ["Israel", "Syria"] },
  { country: "Yemen", capital: "Sana'a", continent: "Asia", region: "Middle East", neighbors: ["Saudi Arabia", "Oman"] },
  { country: "Syria", capital: "Damascus", continent: "Asia", region: "Middle East", neighbors: ["Turkey", "Iraq", "Jordan", "Israel", "Lebanon"] },
  { country: "Afghanistan", capital: "Kabul", continent: "Asia", region: "South Asia", neighbors: ["Iran", "Pakistan", "Turkmenistan", "Uzbekistan", "Tajikistan", "China"] },

  // Oceania / Extras
  { country: "Australia", capital: "Canberra", continent: "Oceania", region: "Oceania", neighbors: [] },
  { country: "New Zealand", capital: "Wellington", continent: "Oceania", region: "Oceania", neighbors: [] },
  { country: "Fiji", capital: "Suva", continent: "Oceania", region: "Oceania", neighbors: [] },
  { country: "Papua New Guinea", capital: "Port Moresby", continent: "Oceania", region: "Oceania", neighbors: ["Indonesia"] }

];


