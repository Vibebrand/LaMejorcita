from ..InterfazDB.DBmodule import DBModule
from txmongo._pymongo.objectid import ObjectId
import datetime


def obtenerventas(stock,accion,param,skip,limit):
	db=DBModule("ventasinfo")
	db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def eliminarventas(accion,entityId, valuesToUpdate):
	db=DBModule("ventasinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

def guardaproducto(atributos,accion):
	atributos["status"]="1"
	if not atributos["registrationDate"]:
		atributos["registrationDate"]=str(datetime.datetime.isoformat())

	db=DBModule("productosinfo")
	db.saveEntity(atributos).addCallback(lambda ign: accion(db.getResult()))

def editaproducto(idvalor,atributos,accion):
	db=DBModule("productosinfo")
	db.updateEntity(entityId=idvalor,valuesToUpdate=atributos).addCallback(lambda ign: accion(db.getResult()))