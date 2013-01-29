from txmongo._pymongo.objectid import ObjectId
import pymongo

if __name__ == '__main__':
	conection= pymongo.Connection('0.0.0.0',27017)
	db=conection["Mejorcita"]
	bodegasinfo= db["bodegasinfo"]
	for i in range(24):
		x={"_id":ObjectId(),"name":"Bodega"+str(i+1),"status":1,"address": {"district":"Colonia","street":"Calle","intNum": None, "extNum": 100} ,"phone":str(9789560+i),"businessName":"Negocio"+str(i+1),"manager":{"_id":ObjectId(),"status":"Valido","username":"Manager"+str(i+1),"password":"pass","curp":"89687800"+str(i),"phone":"9781200","email":"manager"+str(i+1)+"@gmail.com","type":"mamanger"},"geoposition":{"latitude":"22.8818","longitude":"-102.2913"},"maxSale":"1500","minSale":"0","products":{"_id":ObjectId(),"2013/01/01": "1500","2013/01/02": "1200"}}
		#x={"_id":str(ObjectId()),"name":"Punto"+str(1+1) ,"status":"Valido","phone":str(9789560+i),"email":"punto"+str(i+1)+"@gmail.com","joinDate":"15enero2010","fridge":{"serial":"4747464"+str(i),"temperature":"-5","status":"Valido"},"representative":{"name":"representante"+str(i+1),"phone":str(9789560+i),"email":"representante"+str(i+1)+"@gmail.com"},"stock":{"name":"Bodega"+str(i+1)}}
		#x={"_id":str(ObjectId()),"status":"Valido","name":"Vendedor"+str(i+1),"curp":"89687800"+str(i),"email":"vendedor"+str(i+1)+"@gmail.com","device":"74748848"+str(i),"phone":str(9789560+i),"stock":{"name":"Bodega"+str(i+1)}}
		#x={"_id":str(ObjectId()),"date":"15enero2011","time":"11:59pm","observations":"observacion","amount":"4","products":"1500","geoposition":{"latitude":"22.8818","longitude":"-102.2913"},"seller":{"name":"Vendedor"+str(i+1)},"salepoint":{"fridge":{"serial":"4747464"+str(i),"temperature":"-5","status":"Valido"}}}
		#x={"_id":str(ObjectId()),"status":"Valido","name":"carne1","salePrice":"150","registrationDate":"15enero2011","count":"1500"}
		bodegasinfo.insert(x)
		x={}

