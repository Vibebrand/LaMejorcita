from ..InterfazDB.DBmodule import DBModule

def obtenerbodegas(param,skip,limit,accion):
	db=DBModule("bodegasinfo")
	db.getEntities(param=param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def eliminarbodegas(accion,entityId, valuesToUpdate):
	db=DBModule("bodegasinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

def guardabodega(atributos,accion):
	atributos["valor"]="1" 

	db=DBModule("bodegasinfo")
	db.saveEntity(atributos).addCallback(lambda ign: accion(db.getResult()))

def editabodega(idvalor,atributos,accion):
	db=DBModule("bodegasinfo")
	db.updateEntity(entityId=idvalor,valuesToUpdate=atributos).addCallback(lambda ign: accion(db.getResult()))
