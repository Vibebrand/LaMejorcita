from Backend.Data.InterfazDB.DBmodule import DBModule

def obtenerbodegas(accion,param={},skip=0,limit=0):
	db=DBModule("bodegasinfo")
	db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def obtenerpuntos(accion,param={},skip=0,limit=0):
	db=DBModule("puntosinfo")
	db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def obtenervendedores(accion,param={},skip=0,limit=0):
	db=DBModule("vendedoresinfo")
	db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def obtenerventas(accion,param={},skip=0,limit=0):
	db=DBModule("ventasinfo")
	db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def obtenerproductos(accion,param={},skip=0,limit=0):
	db=DBModule("productosinfo")
	db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def eliminarbodegas(accion,entityId, valuesToUpdate):
	db=DBModule("bodegasinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

