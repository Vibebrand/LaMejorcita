from ..InterfazDB.DBmodule import DBModule
from txmongo._pymongo.objectid import ObjectId
import datetime
from BodegasService import obtenerbodegas

def obtenerproductos(stock,accion,param,skip,limit):
	def ver(resultados):
		db=DBModule("productosinfo")
		db.getEntities(resultados["productos"],skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))
	
	if stock == None:             
		db=DBModule("productosinfo")
		db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))
	else:
		db=DBModule("bodegasinfo")
		db.getEntities(param={"_id":ObjectId(stoc k)},args={"productos":True,"_id":False},skip=skip,limit=limit).addCallback(lambda ign: ver(db.getResult()))

def eliminarproductos(accion,entityId, valuesToUpdate):
	db=DBModule("productosinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

def guardaproducto(atributos,accion):
	atributos["valor"]="1"
	if not "registrationDate" in atributos:
		atributos["registrationDate"]=str(datetime.datetime.now())
	if not "status" in atributos:
		atributos["status"]=""

	db=DBModule("productosinfo")
	db.saveEntity(atributos).addCallback(lambda ign: accion(db.getResult()))

def editaproducto(idvalor,atributos,accion):
	db=DBModule("productosinfo")
	db.updateEntity(entityId=idvalor,valuesToUpdate=atributos).addCallback(lambda ign: accion(db.getResult()))