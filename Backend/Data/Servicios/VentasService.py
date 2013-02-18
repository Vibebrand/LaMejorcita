from ..InterfazDB.DBmodule import DBModule

def obtenerventas(stock,point,seller,accion,param,skip,limit):
	db=DBModule("ventasinfo")
	db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def eliminarventas(accion,entityId, valuesToUpdate):
	db=DBModule("ventasinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

def guardaventa(atributos,accion):
	atributos["valor"]="1"
	if not "date" in atributos:
		atributos["date"]=str(sdatetime.datetime.date())

	if not "time" in atributos:
		atributos["time"]=str(sdatetime.datetime.time())

	db=DBModule("ventasinfo")
	db.saveEntity(atributos).addCallback(lambda ign: accion(db.getResult()))

def editaventa(idvalor,atributos,accion):
	db=DBModule("ventasinfo")
	db.updateEntity(entityId=idvalor,valuesToUpdate=atributos).addCallback(lambda ign: accion(db.getResult()))