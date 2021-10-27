from flask import Flask, render_template, jsonify
import json
import pymongo
import pandas as pd
import os
import certifi

# change to True when deploy to Heroku
heroku = False
if heroku:
    mongoKey = os.environ.get("MONGO_KEY")
else:
    from config import mongoKey

app = Flask(__name__)


##-------------api call data, storing data---------------##
## if you have more collections inserted into the database, please add another route with a different name
## in each route, only add the collection that you will need for the returned data

@app.route('/data')
def data():
    # Setup mongo connection
    conn = f"mongodb+srv://UniversityRankings:{mongoKey}@cluster0.02mpl.mongodb.net/collegeDB?retryWrites=true&w=majority"
    client = pymongo.MongoClient(conn,tlsCAFile=certifi.where())
    # Connect to mongo db and collection
    db = client.collegeDB
    #for Unimap, datapage, scatter plot
    colleges = db.colleges
    # Finds all the items in the db and sets it to a variable
    college_list = list(colleges.find())
    college_df = pd.DataFrame(college_list).iloc[:,1:]
    collegeData = college_df.to_json(orient="records")
    collegeData = json.loads(collegeData)
    return jsonify(collegeData)


@app.route('/state')
def state():
    # Setup mongo connection
    conn = f"mongodb+srv://UniversityRankings:{mongoKey}@cluster0.02mpl.mongodb.net/collegeDB?retryWrites=true&w=majority"
    client = pymongo.MongoClient(conn,tlsCAFile=certifi.where())
    # Connect to mongo db and collection
    db = client.collegeDB
    #for pie plot
    states = db.states
    stateNumData = json.loads(pd.DataFrame(list(states.find())).iloc[:,1:].to_json(orient="records"))
    return jsonify(stateNumData)

@app.route('/statesData')
def statesData():
    # Setup mongo connection
    conn = f"mongodb+srv://UniversityRankings:{mongoKey}@cluster0.02mpl.mongodb.net/collegeDB?retryWrites=true&w=majority"
    client = pymongo.MongoClient(conn,tlsCAFile=certifi.where())
    # Connect to mongo db and collection
    db = client.collegeDB
    #for Unimap
    statesData = db.statesData
    statesData = json.loads(pd.DataFrame(list(statesData.find())).iloc[:,1:].to_json(orient="records"))
    return jsonify(statesData)    


# landing page
@app.route('/')
def index():
    # render an index.html template and pass it the data you retrieved from the database
    # this is the main page
    return render_template('index.html')

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
