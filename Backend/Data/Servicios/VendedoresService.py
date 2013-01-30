from ..InterfazDB.DBmodule import DBModule
from txmongo._pymongo.objectid import ObjectId


def obtenervendedores(stock,point,accion,param,skip,limit):
	db=DBModule("vendedoresinfo")
	db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def eliminarvendedores(accion,entityId, valuesToUpdate):
	db=DBModule("vendedoresinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))
	