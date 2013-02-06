from ..InterfazDB.DBmodule import DBModule
from txmongo._pymongo.objectid import ObjectId
import datetime


def obtenerpuntos(stock,accion,param,skip,limit):
	db=DBModule("puntosinfo")
	db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def eliminarpuntos(accion,entityId, valuesToUpdate):
	db=DBModule("puntosinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

def guardapunto(atributos,accion):
	atributos["status"]="1"
	if not "joinDate" in atributos:
		atributos["joinDate"]=str(datetime.datetime.now())

	db=DBModule("puntosinfo")
	db.saveEntity(atributos).addCallback(lambda ign: accion(db.getResult()))

def editapunto(idvalor,atributos,accion):
	db=DBModule("puntosinfo")
	db.updateEntity(entityId=idvalor,valuesToUpdate=atributos).addCallback(lambda ign: accion(db.getResult()))
	