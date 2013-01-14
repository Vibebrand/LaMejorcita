import cyclone.web
from twisted.internet import reactor
from twisted.python import log
from handlers import Bodegainfo
import sys

class Application(cyclone.web.Application):
    def __init__(self):
        handlers = [
        (r"/Bodegainfo/(.*)",Bodegainfo)
        
        ]    
       

        settings = dict()
        cyclone.web.Application.__init__(self, handlers, **settings)

def main():
    log.startLogging(sys.stdout)
    reactor.listenTCP(8904, Application(), interface="0.0.0.0")
    reactor.run()

if __name__ == "__main__":
    main()