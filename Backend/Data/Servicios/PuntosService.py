from ..InterfazDB.DBmodule import DBModule
from txmongo._pymongo.objectid import ObjectId
import datetime


def obtenerpuntos(stock,accion,param,skip,limit):
	db=DBModule("puntosinfo")
	db.getEntities(param,skip=skip,limit=limit).addCallback(lambda ign: accion(db.getResult()))

def eliminarpuntos(accion,entityId, valuesToUpdate):
	db=DBModule("puntosinfo")
	db.updateEntity(entityId, valuesToUpdate).addCallback(lambda ign: accion(db.getResult()))

def guardapunto(atributos,accion):
	self.Diccionario={"valor":1}
	if not "joinDate" in atributos:
		self.Diccionario["joinDate"]=str(datetime.datetime.now())
	self.Diccionario["serial"]=atributos["fridge"]["serial"]
	self.Diccionario["status"]=""
	self.Diccionario["stock"]=ObjectId(atributos["stock"])
	self.Diccionario["puntos"]["name"]=atributos["name"]
	self.Diccionario["puntos"]["phone"]=atributos["phone"]
	self.Diccionario["puntos"]["email"]=atributos["email"]
	self.Diccionario["puntos"]["adress"]=atributos["adress"]
	self.Diccionario["puntos"]["representative"]=atributos["representative"]

	db=DBModule("puntosinfo")
	db.saveEntity(self.Diccionario).addCallback(lambda ign: accion(db.getResult()))

def editapunto(idvalor,atributos,accion):
	self.Diccionario["puntos.name"]=atributos["name"]
	self.Diccionario["puntos.phone"]=atributos["phone"]
	self.Diccionario["puntos.email"]=atributos["email"]
	self.Diccionario["puntos.adress"]=atributos["adress"]
	self.Diccionario["puntos.representative"]=atributos["representative"]

	db=DBModule("puntosinfo")
	db.updateEntity(entityId=idvalor,valuesToUpdate=self.Diccionario).addCallback(lambda ign: accion(db.getResult()))
	