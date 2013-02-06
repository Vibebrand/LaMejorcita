from ..InterfazDB.DBmodule import DBModule
from txmongo._pymongo.objectid import ObjectId
import datetime
<<<<<<< HEAD
from BodegasService import obtenerbodegas
from BodegasService import editabodega

def obtenerproducto(stock,accion,param,skip,limit):
	def ver(resultados):
		pass	
	if stock == None:             
		db=DBModule("productoinfo")
		db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))
	else:
		BodegasService.obtenerbodegas(param,fields={"productos":1},skip=skip,limit=limit,accion=accion)
#El producto de una bodega se define por la existencia de lotes de ese tipo en la bodega , o por los productos que decide el administrador se distribuyen en una bodega
def eliminarproducto(accion,entityId, valuesToUpdate):
	#def ():

	#BodegasService.obtenerbodegas(param ,fields={"productos":1},accion=accion)

	db=DBModule("productoinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

def guardaproducto(atributos,accion):
	atributos["status"]="1"
	if not "registrationDate" in atributos:
		atributos["registrationDate"]=str(datetime.datetime.now())

	db=DBModule("productosinfo")
	db.saveEntity(atributos).addCallback(lambda ign: accion(db.getResult()))

def editaproducto(idvalor,atributos,accion):
	db=DBModule("productosinfo")
	db.updateEntity(entityId=idvalor,valuesToUpdate=atributos).addCallback(lambda ign: accion(db.getResult()))