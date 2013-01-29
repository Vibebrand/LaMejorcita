#!/usr/bin/env python
import txmongo
from txmongo._pymongo.objectid import ObjectId
from twisted.internet import defer

class DBModule:

    def __init__(self, collection):
        #This are used for the mongo connection
        self.collectionName = collection  # To be defined at init
        self.result = ""

    @defer.inlineCallbacks
    def saveEntity(self, entity):
        """
        Inserts or updates a new enterprise entity in the db
        """
        mongo = yield txmongo.MongoConnection()
        mejorcita = mongo.Mejorcita
        entityCollection = mejorcita[self.collectionName]
        #if hasattr(entity, "type"):
            #Delete type attribute as it's useless to save it to the database
            #delattr(entity, "type")
        self.result = yield entityCollection.save(entity, safe=True)
        mongo.disconnect()

    @defer.inlineCallbacks
    def getEntities(self, param={}, args={}, limit=0, skip=0, filter={}):
        """
        Gets the entity indicated by its parameters
        changing id for an objectId if necessary.
        If there are no parameters, it searches for all
        the objects in the db.
        """
        mongo = yield txmongo.MongoConnection()
        mejorcita = mongo.Mejorcita
        entityCollection = mejorcita[self.collectionName]
        if isinstance(param, list):
            self.result = []
            for item in param:
                if "_id" in item:
                    if isinstance(item["_id"], str):
                        item["_id"] = ObjectId(item["_id"])
                ent = yield entityCollection.find(item, fields=args, limit=limit, skip=skip, filter=filter)
                self.result.append(ent)
        else:
            if "_id" in param:
                param["_id"] = ObjectId(param["_id"])
            self.result = yield entityCollection.find(param, fields=args, limit=limit, skip=skip, filter=filter)
        mongo.disconnect()

    @defer.inlineCallbacks
    def updateEntity(self, entityId, valuesToUpdate, multi=False, extraParameters=None):
        """
        Does an atomic update of the object depending on its id
        """
        mongo = yield txmongo.MongoConnection()
        mejorcita = mongo.Mejorcita
        entityCollection = mejorcita[self.collectionName]
        entityId = ObjectId(entityId)
        if "_id" in valuesToUpdate:
            del valuesToUpdate["_id"]
        if not extraParameters:
            ent = yield entityCollection.update({"_id": entityId}, {"$set": valuesToUpdate}, safe=True, multi=multi)
        else:
            param = extraParameters
            ent = yield entityCollection.update(param, {"$set": valuesToUpdate}, safe=True, multi=multi)
        if not ent["err"]:
            self.result = "True"
        else:
            self.result = "False"
        mongo.disconnect()

    @defer.inlineCallbacks
    def deleteEntity(self, param):
        """
        Deletes enterprise entity indicated by its parameters
        """
        mongo = yield txmongo.MongoConnection()
        mejorcita = mongo.Mejorcita
        entityCollection = mejorcita[self.collectionName]
        if "_id" in param:
            param["_id"] = ObjectId(param["_id"])
        self.result = yield entityCollection.remove(param)
        mongo.disconnect()

    def getResult(self, parseObjectId=True):
        items = []

        def changeId(item):
            if isinstance(item, ObjectId):
                return unicode(str(item))
            elif isinstance(item, dict):
                for v in item.values():
                    if "_id" in item and parseObjectId and not isinstance(v,dict):
                        item["_id"] = unicode(str(item["_id"]))
                    else:
                        changeId(v)
                return item
            else:
                return item

        def cleanLists(item):
            if isinstance(item, list):
                if len(item) == 1:
                    if isinstance(item[0], list):
                        item = cleanLists(item[0])
                        return changeId(item)
                    else:
                        return changeId(item[0])
                else:
                    finalList = []
                    for i in item:
                        finalItem = cleanLists(i)
                        finalList.append(changeId(finalItem))
                    return finalList
            else:
                return changeId(item)
        items = cleanLists(self.result)
        return items
