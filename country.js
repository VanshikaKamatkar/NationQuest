const countryName = new URLSearchParams(location.search).get('name');
const flagImage = document.querySelector('.country-details img');
const countryNameH1 = document.querySelector('.country-details h1');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.top-level-domain');
const currencies = document.querySelector('.currencies');
const languages = document.querySelector('.languages');
const borderCountries = document.querySelector('.border-countries');

const themeChanger = document.querySelector(".theme-changer");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        console.log(country);
        flagImage.src = country.flags.svg;

        countryNameH1.innerText = country.name.common;

        if(nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName).map((native) => native.official)[0]
        } else {
            nativeName.innerText = country.name.common;
        }
        
        population.innerText = country.population.toLocaleString('en-IN');

        if (country.region) {
            region.innerText = country.region
        } else {
            region.innerText = "Not Available";
        }

        if(country.subregion) {
            subRegion.innerText = country.subregion;
        } else {
            subRegion.innerText = "Not Available";
        }

        if(country.capital) {
            capital.innerText = country.capital.join(", ");
        } else {
            capital.innerText = "Not Available";
        }

        if(topLevelDomain) {
            topLevelDomain.innerText = country.tld.join(", ");
        } else {
            topLevelDomain.innerText = "Not Available";
        }

        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(", ");
        } else {
            currencies.innerText = "Not Available";
        }

        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(", ");
        } else {
            languages.innerText = "Not Available";
        }

        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        const borderCountryTag = document.createElement('a');
                        borderCountryTag.innerText = borderCountry.name.common;
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                        borderCountries.append(borderCountryTag);
                    });
            });
        } 
        // else {
        //     country.borders.innerHTML = "Not Available";
        // }
    });

    window.addEventListener("load", () => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.body.classList.add("dark");
        }
    });
    
    // Theme toggle logic
    themeChanger.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
    