from ..InterfazDB.DBmodule import DBModule
from txmongo._pymongo.objectid import ObjectId
import datetime

def obtenerlotes(stock,accion,param,skip,limit):
	db=DBModule("bodegasinfo")
	db.getEntities(param={"_id":ObjectId(stock)},args={"productos":True,"_id":False},skip=skip,limit=limit).addCallback(lambda ign: ver(db.getResult()))

def eliminarlotes(accion,entityId, valuesToUpdate):
	db=DBModule("productosinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

def guardalote(atributos,accion):
	db=DBModule("productosinfo")
	db.saveEntity(atributos).addCallback(lambda ign: accion(db.getResult()))

def editalote(idvalor,atributos,accion):
	db=DBModule("productosinfo")
	db.updateEntity(entityId=idvalor,valuesToUpdate=atributos).addCallback(lambda ign: accion(db.getResult()))