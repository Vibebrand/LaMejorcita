from ..InterfazDB.DBmodule import DBModule
from txmongo._pymongo.objectid import ObjectId


def obtenerbodegas(param,skip,limit,accion):
	db=DBModule("bodegasinfo")
	db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def eliminarbodegas(accion,entityId, valuesToUpdate):
	db=DBModule("bodegasinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))
