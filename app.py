from flask import Flask, render_template, jsonify, url_for
import json
import pymongo
import pandas as pd

app = Flask(__name__)

# Setup mongo connection
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# Connect to mongo db and collection
db = client.collegeDB
colleges = db.colleges

# Finds all the items in the db and sets it to a variable
college_list = list(colleges.find())
college_df = pd.DataFrame(college_list).iloc[:,1:]
collegeData = college_df.to_json(orient="records")
collegeData = json.loads(collegeData)

# landing page
@app.route('/')
def index():
    # render an index.html template and pass it the data you retrieved from the database
    # this is the main page
    return render_template('index.html')

# api call data, not used in our final pages, just a page for storing data
@app.route('/data')
def data():
    return jsonify(collegeData)

# data page to perform searching by user
@app.route('/datapage')
def datapage():
    return render_template('datapage.html')

# about us page
@app.route('/aboutus')
def aboutus():
    return render_template('aboutus.html')

if __name__ == "__main__":
    app.run(debug=True)
