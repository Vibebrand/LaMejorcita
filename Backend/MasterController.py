from Backend.Data.InterfazDB.DBmodule import DBModule

def obtenerbodegas(skip,limit, accion):
	db=DBModule("bodegasinfo")
	db.getEntities(skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def obtenerpuntos(skip,limit, accion):
	db=DBModule("puntosinfo")
	db.getEntities(skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def obtenervendedores(skip,limit, accion):
	db=DBModule("vendedoresinfo")
	db.getEntities(skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def obtenerventas(skip,limit, accion):
	db=DBModule("ventasinfo")
	db.getEntities(skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def obtenerproductos(skip,limit, accion):
	db=DBModule("productosinfo")
	db.getEntities(skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

