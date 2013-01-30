from ..InterfazDB.DBmodule import DBModule
from txmongo._pymongo.objectid import ObjectId


def obtenerpuntos(stock,accion,param,skip,limit):
	db=DBModule("puntosinfo")
	db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def eliminarpuntos(accion,entityId, valuesToUpdate):
	db=DBModule("puntosinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))
	