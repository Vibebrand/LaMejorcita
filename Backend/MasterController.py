from Data.Servicios import BodegasService
from Data.Servicios import PuntosService
from Data.Servicios import VendedoresService
from Data.Servicios import VentasService
from Data.Servicios import ProductosService




def obtenerbodegas(accion,param={},skip=0,limit=0):
	BodegasService.obtenerbodegas(param=param,skip=skip,limit=limit,accion=accion)

def obtenerpuntos(accion,stock=None,param={},skip=0,limit=0):
	PuntosService.obtenerpuntos(stock=stock,accion=accion,param=param,skip=skip,limit=limit)

def obtenervendedores(accion,stock=None,point=None,param={},skip=0,limit=0):
	VendedoresService.obtenervendedores(stock=stock,point=point,accion=accion,param=param,skip=skip,limit=limit)

def obtenerventas(accion,stock=None,point=None,seller=None,param={},skip=0,limit=0):
	VentasService.obtenerventas(stock=stock,point=point,seller=seller,accion=accion,param=param,skip=skip,limit=limit)
	
def obtenerproductos(accion,stock=None,param={},skip=0,limit=0):
	ProductosService.obtenerproductos(stock=stock,accion=accion,param=param,skip=skip,limit=limit)

def eliminarbodegas(accion,entityId, valuesToUpdate):
	BodegasService.eliminarbodegas(entityId=entityId,valuesToUpdate=valuesToUpdate,accion=accion)
	
def eliminarpuntos(accion,entityId, valuesToUpdate):
	PuntosService.eliminarpuntos(entityId=entityId,valuesToUpdate=valuesToUpdate,accion=accion)

def eliminarvendedores(accion,entityId, valuesToUpdate):
	PuntosService.eliminarvendedores(entityId=entityId,valuesToUpdate=valuesToUpdate,accion=accion)

def eliminarventas(accion,entityId, valuesToUpdate):
	VentasService.eliminarventas(entityId=entityId,valuesToUpdate=valuesToUpdate,accion=accion)

def eliminarproductos(accion,entityId, valuesToUpdate):
	ProductosService.eliminarproductos(entityId=entityId,valuesToUpdate=valuesToUpdate,accion=accion)

def llena(bodega,accion):
	def x1():
		pass
	db=DBModule("bodegasinfo")
	for i in range(24):
		x={"_id":ObjectId(),"name":"Bodega"+str(i+1),"status":"1","address": {"district":"Colonia","street":"Calle","intNum": None, "extNum": 100} ,"phone":str(9789560+i),"businessName":"Negocio"+str(i+1),"manager":{"_id":ObjectId(),"status":"Valido","username":"Manager"+str(i+1),"password":"pass","curp":"89687800"+str(i),"phone":"9781200","email":"manager"+str(i+1)+"@gmail.com","type":"mamanger"},"geoposition":{"latitude":"22.8818","longitude":"-102.2913"},"maxSale":"1500","minSale":"0","products":{"_id":ObjectId(),"2013/01/01": "1500","2013/01/02": "1200"}}
		db.saveEntity(x).addCallback(lambda ign: x1())
	accion()


