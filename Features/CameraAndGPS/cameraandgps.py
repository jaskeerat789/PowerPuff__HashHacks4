import serial
import pynmea2
from picamera import PiCamera
from time import sleep

camera = PiCamera()
def parseGPS(str):
    if str.find('GGA') > 0:
        msg = pynmea2.parse(str)
        #print "Timestamp: %s -- Lat: %s %s -- Lon: %s %s -- Altitude: %s %s" %
        #(msg.timestamp,msg.lat,msg.lat_dir,msg.lon,msg.lon_dir,msg.altitude,msg.altitude_units)
#serialPort = serial.Serial("/dev/ttyAMA0", 9600, timeout=0.5)

#while True:
#    str = serialPort.readline()
#    parseGPS(str)
i=0
camera.start_preview()
while True:
    
    sleep(5)
    camera.capture('/home/pi/Desktop/image/image%s.jpg' %i)
    i=i+1
camera.stop_preview()
