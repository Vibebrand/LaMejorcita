import pymongo

if __name__ == '__main__':
	conection= pymongo.Connection('0.0.0.0',27017)
	db=conection["Mejorcita"]
	bodegasinfo= db["bodegasinfo"]
	for i in range(24):
		x={"name":"Bodega"+str(i+1),"businessName":"Negocio"+str(i+1),"adress":"Direccion"+str(i+1),"manager":"Responsable"+str(i+1)},
		bodegasinfo.insert(x)
		x={}

