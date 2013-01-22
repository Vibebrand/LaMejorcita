import pymongo

if __name__ == '__main__':
	conection= pymongo.Connection('0.0.0.0',27017)
	db=conection["Mejorcita"]
	bodegasinfo= db["bodegasinfo"]
	bodegasinfo.remove()
