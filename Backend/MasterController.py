from Backend.Data.InterfazDB.DBmodule import DBModule
from txmongo._pymongo.objectid import ObjectId

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

def eliminarpuntos(accion,entityId, valuesToUpdate):
	db=DBModule("puntosinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

def eliminarvendedores(accion,entityId, valuesToUpdate):
	db=DBModule("vendedoresinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

def eliminarventas(accion,entityId, valuesToUpdate):
	db=DBModule("ventasinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

def eliminarproductos(accion,entityId, valuesToUpdate):
	db=DBModule("productosinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

def llena(bodega,accion):
	def x1():
		pass
	db=DBModule("bodegasinfo")
	for i in range(24):
		x={"_id":ObjectId(),"name":"Bodega"+str(i+1),"status":"1","address": {"district":"Colonia","street":"Calle","intNum": None, "extNum": 100} ,"phone":str(9789560+i),"businessName":"Negocio"+str(i+1),"manager":{"_id":ObjectId(),"status":"Valido","username":"Manager"+str(i+1),"password":"pass","curp":"89687800"+str(i),"phone":"9781200","email":"manager"+str(i+1)+"@gmail.com","type":"mamanger"},"geoposition":{"latitude":"22.8818","longitude":"-102.2913"},"maxSale":"1500","minSale":"0","products":{"_id":ObjectId(),"2013/01/01": "1500","2013/01/02": "1200"}}
		db.saveEntity(x).addCallback(lambda ign: x1())
	accion()


