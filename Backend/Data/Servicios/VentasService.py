from ..InterfazDB.DBmodule import DBModule
from txmongo._pymongo.objectid import ObjectId


def obtenerventas(stock,point,seller,accion,param,skip,limit):
	db=DBModule("ventasinfo")
	db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def eliminarventas(accion,entityId, valuesToUpdate):
	db=DBModule("ventasinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

def guardaventa(atributos,accion):
	atributos["status"]="1"
<<<<<<< HEAD
	if not "date" in atributos:
		atributos["date"]=str(sdatetime.datetime.date())

	if not "time" in atributos:
=======
	if not atributos["date"]:
		atributos["date"]=str(sdatetime.datetime.date())

	if not atributos["time"]:
>>>>>>> 91a729bf48dc762ef2025b52aa6b45c59fee2b71
		atributos["time"]=str(sdatetime.datetime.time())

	db=DBModule("ventasinfo")
	db.saveEntity(atributos).addCallback(lambda ign: accion(db.getResult()))

def editaventa(idvalor,atributos,accion):
	db=DBModule("ventasinfo")
	db.updateEntity(entityId=idvalor,valuesToUpdate=atributos).addCallback(lambda ign: accion(db.getResult()))