# RocketMiles - WeatherApp

WeatherApp is a single page app the fetches the weather either by zip code or city name in the US.

## Directions

As provided to me:

```
We’d like a single page web app that displays a weather forecast. Ideally your app will get today's weather and the next 5 days. We travel a lot here at Rocketmiles so we'd love to be able to search for any destination and see the forecast for wherever we might end up next.

Some guidelines before you get started:

- Write your app using standard Angular 1.x conventions.
- Your application should run flawlessly in the latest version of Chrome.
- We'd like to see the forecast populated when the user first enters your app with their current location. Should the user decline to offer their location, default to our office in the 60661 zip code.
- We use CSS every single day and we value thoughtful presentation. You certainly don’t have to animate or draw to Canvas, but a little polish goes a long way.
- It’s reasonable to have the browser refresh to fetch new data, it’s better if it doesn’t.
- We recommend using this API: http://openweathermap.org.
- We highly value well tested code.
```

## Installing

Clone the project from https://github.com/dannywynne355/RocketMiles.WeatherApp.git and install onto your webserver.  Because the project is lightweight and with few external libraries, everything has been put into the repository.

Optionally, I have also set up a demo at http://the355group.com/dev/rocketmiles/weatherapp.

## Approach

### Libraries
* Angular 1.4
* Bootstrap 3.2
* Font Awesome 4.7

### App Features
* Per the directions, the app will ask the first time if you wish to use your current geolocation.  If the user accepts, the app determines their geocoordinates and calls the api.  Otherwise the zip code 60661 is used.
* The user can enter a zip code or city name in the search bar.  Any location search that returns a valid weather report has the underlying location stored as a cookie.  
* Previous searches are listed in the "View Locations" area at the bottom left.  The locations are sorted with the most recently added location at the top of the list.  
* The current geocoordinate location is always the first option in the "View Location" dropdown.  NOTE: The app only stores searched locations - views of the current geocoordinates or the default location (60661) are not stored unless searched for explicitly.
* The weather report for a location consists of three entities: 
1) Current conditions - the temperature, an icon reflecting the weather, the humidity, wind, and cloudiness level.
2) 12 hour forecast - the temperature and icon for the next 12 hours, as presented in 4 snapshots over 3 hours.
3) Extended daily forecast - the next 6 days, with the high and low temperatures plus the icon.
* The Api provided the data under 3 possible units - F, C, and K (side note: much respect to them for making Kelvin the default choice).  In the bottom right of the app, you can toggle the units to use for the forecast.
* There is a toggle link to show the Admin panel, which is where I was sticking state information.  

## Technical Notes
* For the UI, I went with Bootstrap.  I felt that the clean approach would address the thought that "we value thoughtful presentation".  I have toggled the site between normal browser and the phone view using Chrome developer tools to confirm that it rendered nicely there.  No other tests were performed.
* The app uses the $cookieStore to store locations for future use.  From a usage standpoint, it seemed like a basic requirement for it to remember the last location.  NOTE: I did not set a formal expiration date on the cookie.
* The app uses the $cacheFactory to store queries.  Api owners can get cranky when you plow a bunch of requests on their systems, so it always a best practice to limit the requests to the api.
* I did have a few pieces previous code that I brought into this project, such as the apiBase, appEnvironment, and appCookie.
* The structure of this is perhaps a touch overboard for a project of this size, but I thought it would be best to demonstrate better practices for the sake of this homework.
* I broke up the page into the following sections: the search bar in the header, the main content, the canned searches in the footer area, and the admin area.  Those sections were all included via ng-include and have standalone controllers to ease the glut of coding in the main area.  
* The weather data is made using 3 Api calls - one for the current weather, one for a 3 day forecast in 3 hour chunks, and another for the extended faily forecast.  Each request is made as a promise and they are chained together.
* The geolocation is provided by a service that calls http://ip-api.com.  This service is used on app startup, both for the modal request to the user on startup, and then in the "View Locations" area.
* I created a helper function to convert the wind expressed in polar coordinates from the Api to a more typical compass direction (e.g. NNE).
* I created a json parser for the Api content because all three used mostly similar formats to deliver the data.  Instead of having 3 different reads, I wrote one parser and passed in offsets from the top node to tell the parser where to get the necessary data.
* I made use or $broadcast and $emit to handle changes to the displayed weather report.  
* The app will use the city name as typed to perform its search, but the returned city info is used for display purposes.  This means you can type "las vegas" but the end result will be the far more eye-pleasing "Las Vegas".

## Limitations and Known Issues
* The app is currently limited to the United States because the Api requires a country code.
* The Api seems to limit search results to 1 even when entering in a city name that should have multiple results (e.g. "Springfield").  The Api mentions have a city download as they want users to use their city id field.
* The start-up modal window can be circumvented by clicking outside the modal or hitting ESC.  This does not create an error but it does leave an empty weather area.
* All weather requests are executed as promises.  I have done my best to provide error checks, but I did not simulate all of them.  
* There is a image load issue on startup.  I have looked but cannot peg the culprit.
* The app returns the weather description (e.g. "cloudy") in lower case at all times.
