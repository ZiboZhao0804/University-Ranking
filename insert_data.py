#import dependencies
import pandas as pd
from pymongo import MongoClient, InsertOne
import json
import os
import certifi

heroku = False
if heroku:
    mongoKey = os.environ.get("MONGO_KEY")
else:
    from config import mongoKey


def mongoimport(csv_path, db_name, coll_name):
    """ Imports a csv file at path csv_name to a mongo colection
    returns: count of the documants in the new collection
    """
   
    client = MongoClient(f"mongodb+srv://UniversityRankings:{mongoKey}@cluster0.02mpl.mongodb.net/collegeDB?retryWrites=true&w=majority",tlsCAFile=certifi.where())
    db = client[db_name]
    coll = db[coll_name]
    data = pd.read_csv(csv_path)
    payload = json.loads(data.to_json(orient = 'records'))
    coll.remove()
    coll.insert(payload)
    # return coll.count()
    client.close()


mongoimport('Data/data.csv','collegeDB','colleges')
mongoimport('Data/states.csv','collegeDB','states')

# def mongoimportjson(json_path,db_name,coll_name):
#     client = MongoClient("mongodb+srv://UniversityRankings:{mongoKey}@cluster0.02mpl.mongodb.net/collegeDB?retryWrites=true&w=majority")
#     db = client[db_name]
#     coll = db[coll_name]
#     requesting = []

#     with open(json_path) as f:
#         for jsonObj in f:
#             myDict = json.loads(jsonObj)
#             requesting.append(InsertOne(myDict))

#     coll = coll.bulk_write(requesting)
#     client.close()

# mongoimportjson('Data/fullStatesData.json','collegeDB','statesData')




