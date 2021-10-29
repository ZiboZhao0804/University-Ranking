# 2022 Best Universities in the United States

## Inspiration and Intro to APP
### Welcome to the Top US Universities Attributes and Visualization Application!! We are here to help you learn more about the best US universities. Some of the questions we can help you answer include:
- What are the best universities?
- What universities can I consider given my SAT score?
- Where are the best universities located?
- Which schools are hardest to get into?
- What is the estimated Net Cost of Attendance for a given School?
- How many top universities are there in your state?

## Data Sources and App Development:
<a href=https://www.niche.com ><img src="Images/NicheLogo.png" alt="niche" style="width:200px;" /></a>
<a href=https://https://developers.google.com/maps/documentation/geocoding/overview ><img src="Images/GeocodingAPI.png" alt="Geocoding" style="width:200px;" /></a>
<a href=https://leafletjs.com ><img src="Images/LeafletLogo.png" alt="Leaflet" style="width:200px;" /></a>
<a href=https://www.mongodb.com/ ><img src="Images/mongoDBLogo.png" alt="mongoDB" style="width:200px;" /></a>
<a href=https://flask.palletsprojects.com/en/2.0.x/ ><img src="Images/FlaskappLogo.png" alt="FlaskApp" style="width:200px;" /></a>
<a href=https://id.heroku.com/login ><img src="Images/herokuLogo.png" alt="heroku" style="width:200px;" /></a>

* According to Niche, the best colleges ranking is based on rigorous analysis of academic, admissions, financial, and student life data from the U.S. Department of Education along with millions of reviews from students and alumni. The ranking compares more than 1,000 top colleges and universities in the U.S. This year's rankings have reduced the weight of ACT/SAT scores to reflect a general de-emphasis on test scores in the college admissions process.*

#### Methodology
- Factors considered
- Academics Grade - 40.0%
- Value Grade - 27.5%
- Professors Grade - 7.5%
- Campus Grade - 5.0%
- Diversity Grade - 5.0%
- Student Life Grade - 5.0%
- Student Surveys on Overalll Experience - 5.0%
- Local Area Grade - 2.5%
- Safety Grade - 2.5%

## Extraction, Transformation and Load:
- [Web Scraping](Niche_Scraping): We did a web scraping from Niche.com to obtain data from top 800 universities in the United States.<br>
- [Geocoding API for locations](Location_Info): We obtained the locations of the universities using Google Geocoding API.<br>
- [Final data file](Data): After data transformation, we saved our data here. <br>
- [Load data](insert_data.py): We stored our data using MongoDB Atlas Database.

## Flask app and deploy:
[Flask app](app.py): We used Flask to develop our app and the final deployment used Heroku.

## More about our App:
### Main page
- A snapshot of information in the metadata form.
- A visualization of best universities in the United States with multiple layers.
- A bar chart showing 15 states with the highest number of the top 800 universities.
- A boxplot showing SAT score distribution in different Niche grade categories.
- A panel of scatter plots showing the correlations of Averge Acceptance Rate, Average SAT, Average net cost($) versus ranking for the top 800 universities.
### Data page
- You may enter the university name, Niche grade, city and/or state to perform your own search.
### About us
- You will meet our team members and learn more about the project here.

## Check our univeristy ranking app website to learn more. Have fun!

<strong>[University Ranking App](https://university-ranking.herokuapp.com/)</strong>
