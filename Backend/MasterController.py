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

def obtenerlotes(accion,stock=None,product=None,param={},skip=0,limit=0):
	LotesService.obtenerlotes(product=product,stock=stock,accion=accion,param=param,skip=skip,limit=limit)

def eliminarbodegas(accion,entityId, valuesToUpdate):
	BodegasService.eliminarbodegas(entityId=entityId,valuesToUpdate=valuesToUpdate,accion=accion)
	
def eliminarpuntos(accion,entityId, valuesToUpdate):
	PuntosService.eliminarpuntos(entityId=entityId,valuesToUpdate=valuesToUpdate,accion=accion)

def eliminarvendedores(accion,entityId, valuesToUpdate):
	VendedoresService.eliminarvendedores(entityId=entityId,valuesToUpdate=valuesToUpdate,accion=accion)

def eliminarventas(accion,entityId, valuesToUpdate):
	VentasService.eliminarventas(entityId=entityId,valuesToUpdate=valuesToUpdate,accion=accion)

def eliminarproductos(accion,entityId, valuesToUpdate):
	ProductosService.eliminarproductos(entityId=entityId,valuesToUpdate=valuesToUpdate,accion=accion)

def eliminarlotes(accion,entityId, valuesToUpdate):
	LotesService.eliminarlotes(entityId=entityId,valuesToUpdate=valuesToUpdate,accion=accion)

def guardabodega(atributos,accion):
	BodegasService.guardabodega(atributos=atributos,accion=accion)

def editabodega(idvalor,atributos,accion):
	BodegasService.editabodega(idvalor=idvalor,atributos=atributos,accion=muestra)

def guardapunto(atributos,accion):
	PuntosService.guardapunto(atributos=atributos,accion=accion)

def editapunto(idvalor,atributos,accion):
	PuntosService.editapunto(idvalor=idvalor,atributos=atributos,accion=muestra)

def guardavendedor(atributos,accion):
	VendedoresService.guardavendedor(atributos=atributos,accion=accion)

def editavendedor(idvalor,atributos,accion):
	VendedoresService.editavendedor(idvalor=idvalor,atributos=atributos,accion=muestra)

def guardaventa(atributos,accion):
	VentasService.guardaventa(atributos=atributos,accion=accion)

def editaventa(idvalor,atributos,accion):
	VentasService.editaventa(idvalor=idvalor,atributos=atributos,accion=muestra)

def guardaproducto(atributos,accion):
	ProductosService.guardaproducto(atributos=atributos,accion=accion)

def editaproducto(idvalor,atributos,accion):
	ProductosService.editaproducto(idvalor=idvalor,atributos=atributos,accion=muestra)

def guardalote(atributos,accion):
	LotesService.guardalote(atributos=atributos,accion=accion)

def editalote(idvalor,atributos,accion):
	LotesService.editalote(idvalor=idvalor,atributos=atributos,accion=muestra)
