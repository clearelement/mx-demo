Framer.Device.deviceType = "fullscreen"

frame = new Layer
	width: 1280, height: 950
	backgroundColor: "#F1F2F4"
frame.style["outline"] = "1px solid #565656"
frame.center()
	
navBar = new Layer
	width: frame.width, height: 70
	backgroundColor: "#002E4D"
	superLayer: frame
	
