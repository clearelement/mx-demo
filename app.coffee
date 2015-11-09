{FontFace} = require "FontFace"
SVGLayer = require "SVGLayer"

TextLayer = require 'TextLayer'
pnRegular = new FontFace
	name: "PN Regular"
	file: "ProximaNova-Reg.otf"

pnSemiBold = new FontFace
	name: "PN SemiBold"
	file: "ProximaNova-Sbold.otf"

# Remove framer cursor
document.body.style.cursor = "auto"

Framer.Device.deviceType = "fullscreen"

Framer.Defaults.Animation =
	curve: "ease-in-out"
	time: 0.3

bg = new BackgroundLayer
	backgroundColor: "#F1F2F4"
	
navBarBG = new Layer
	width: screen.width, height: 70
	backgroundColor: "#002E4D"

frame = new Layer
	width: 1280, height: 950
	backgroundColor: null
frame.centerX()

navBarContainer = new Layer
	width: frame.width, height: 70
	backgroundColor: "002E4D"
	superLayer: frame

mgpLogo = new Layer
	width: 45, height: 29
	x: 24, y: 22
	image: "images/mgpLogo.png"
	superLayer: navBarContainer

overviewNav = new TextLayer
	autoSize: true
	text: "Overview"
	fontSize: 15
	color: "white"
	fontFamily: "PN SemiBold"
	superLayer: navBarContainer
	x: 92
	
planNav = new TextLayer
	autoSize: true
	text: "Plan"
	fontSize: 15
	color: "white"
	fontFamily: "PN SemiBold"
	superLayer: navBarContainer
	x: overviewNav.maxX + 34
	
investmentsNav = new TextLayer
	autoSize: true
	text: "Investments"
	fontSize: 15
	color: "white"
	fontFamily: "PN SemiBold"
	superLayer: navBarContainer
	x: planNav.maxX + 33
	
networthNav = new TextLayer
	autoSize: true
	text: "Networth"
	fontSize: 15
	color: "white"
	fontFamily: "PN SemiBold"
	superLayer: navBarContainer
	x: investmentsNav.maxX + 33
	
accountsNav = new TextLayer
	autoSize: true
	text: "Accounts"
	fontSize: 15
	color: "white"
	fontFamily: "PN SemiBold"
	superLayer: navBarContainer
	x: networthNav.maxX + 33
	
spendingNav = new TextLayer
	autoSize: true
	text: "Spending"
	fontSize: 15
	color: "white"
	fontFamily: "PN SemiBold"
	superLayer: navBarContainer
	x: accountsNav.maxX + 33
	
budgetsNav = new TextLayer
	autoSize: true
	text: "Budgets"
	fontSize: 15
	color: "white"
	fontFamily: "PN SemiBold"
	superLayer: navBarContainer
	x: spendingNav.maxX + 33
	
alertsSettings = new Layer
	width: 64, height: 25
	maxX: navBarContainer.width - 24, y: 20
	image: "images/alertsSettings.png"
	superLayer: navBarContainer
	
mainNav = [
	overviewNav
	planNav
	investmentsNav
	networthNav
	accountsNav
	spendingNav
	budgetsNav
]

for layer in mainNav
	layer.y = 25
	
	layer.states.add
		inactive: opacity: 0.6
	layer.states.switchInstant("inactive")
	
overviewNav.states.switchInstant("default")

contentScroll = new ScrollComponent
	width: frame.width, height: frame.height - 70
	y: 70
	mouseWheelEnabled: true
	scrollHorizontal: false
	superLayer: frame
contentScroll.contentInset = 
	bottom: 100


cardContainer = new Layer
	width: 1064, height: 703
	y: 50
	backgroundColor: null
	clip: false
	superLayer: contentScroll.content
cardContainer.centerX()

planSuccess = new Layer
	width: 250, height: 220
	backgroundColor: "white"
	superLayer: cardContainer
	
netWorth = new Layer
	width: 250, height: 220
	x: planSuccess.maxX + 20
	backgroundColor: "white"
	superLayer: cardContainer
	
investments = new Layer
	width: 250, height: 220
	x: netWorth.maxX + 20
	backgroundColor: "white"
	superLayer: cardContainer
	
spending = new Layer
	width: 250, height: 220
	x: investments.maxX + 20
	backgroundColor: "white"
	superLayer: cardContainer
	
goalsPlanning = new Layer
	width: 793, height: 460
	y: planSuccess.maxY + 20
	backgroundColor: "white"
	superLayer: cardContainer
	
budgets = new Layer
	width: 250, height: 220
	x: goalsPlanning.maxX + 20, y: goalsPlanning.y
	backgroundColor: "white"
	superLayer: cardContainer
	
chat = new Layer
	width: 250, height: 220
	x: goalsPlanning.maxX + 20, y: budgets.maxY + 20
	backgroundColor: "white"
	superLayer: cardContainer
	
for layer, index in cardContainer.subLayers
	layer.shadowY = 5
	layer.shadowColor = "rgba(23, 29, 59, 0.13)"
	layer.shadowBlur = 50
	layer.originX = 0
	layer.originY = 0
	
	layer.states.add
		init:
			scale: 0.8
			opacity: 0
			x: layer.x - 20
			y: layer.y - 20
	layer.states.animationOptions =
		curve: "spring(120, 16, 5)"
		delay: 0.04 * index
	layer.states.switchInstant("init") # TURN THIS BACK ON 

planHeader = new Layer
	width: 239, height: 25
	y: 12
	image: "images/planHeader.png"
	superLayer: planSuccess
planHeader.centerX()

networthHeader = new Layer
	width: 239, height: 25
	y: 12
	image: "images/networthHeader.png"
	superLayer: netWorth
networthHeader.centerX()

investmentsHeader = new Layer
	width: 239, height: 25
	y: 12
	image: "images/investmentsHeader.png"
	superLayer: investments
investmentsHeader.centerX()

spendingHeader = new Layer
	width: 239, height: 25
	y: 12
	image: "images/spendingHeader.png"
	superLayer: spending
spendingHeader.centerX()

budgetsHeader = new Layer
	width: 239, height: 25
	y: 12
	image: "images/budgetsHeader.png"
	superLayer: budgets
budgetsHeader.centerX()

goalsHeader = new Layer
	width: 100, height: 14
	x: 13, y: 11
	image: "images/goalsPlanning.png"
	superLayer: goalsPlanning
	
planArc = new Layer
	width: 141, height: 78
	y: 80
	image: "images/planArc.png"
	superLayer: planSuccess
planArc.centerX()

chartMask = new Layer
	width: 186, height: 107
	maxY: planArc.maxY + 5
	originY: 1
	image: "images/chartMask.png"
	superLayer: planSuccess
chartMask.centerX()

successProbability = new TextLayer
	autoSize: true
	text: "Success Probability"
	fontSize: 15
	letterSpacing: 0.5
	color: "#595959"
	fontFamily: "PN Regular"
	superLayer: planSuccess
	y: 50
successProbability.centerX(5)

chartPointer = new Layer
	width: 103, height: 102
	y: 100
	rotation: -165
	image: "images/chartPointer.png"
	superLayer: planSuccess
chartPointer.centerX()

successPercent = new TextLayer
	autoSize: true
	text: "82%"
	fontSize: 21
	letterSpacing: 0.5
	color: "#595959"
	fontFamily: "PN Regular"
	superLayer: planSuccess
	y: 130
successPercent.centerX(3)

confidenceZone = new TextLayer
	autoSize: true
	text: "In Confidence Zone"
	fontSize: 12
	letterSpacing: 0.5
	color: "#21C04B"
	fontFamily: "PN Regular"
	superLayer: planSuccess
	y: 164
confidenceZone.centerX()

playZone = new Layer
	width: 122, height: 26
	x: 12, y: 186
	image: "images/playZone.png"
	superLayer: planSuccess
	
networthValue = new TextLayer
# 	autoSize: true
	width: 113, height: 26
	text: "$2,089,663"
	fontSize: 21
	letterSpacing: 0.5
	color: "#595959"
	fontFamily: "PN Regular"
	superLayer: netWorth
	x: 130, y: 44
	
networthGains = new Layer
	width: 112, height: 12
	maxX: networthValue.maxX - 2, y: 68
	image: "images/networthGains.png"
	superLayer: netWorth
	
networthChart = new Layer
	width: 218, height: 61
	y: 114
	scaleY: 0
	image: "images/networthChart.png"
	superLayer: netWorth
networthChart.centerX()

investmentsValue = new TextLayer
	autoSize: true
	text: "$1,754,437"
	fontSize: 21
	letterSpacing: 0.5
	color: "#595959"
	fontFamily: "PN Regular"
	superLayer: investments
	maxX: investments.width - 10, y: 44
	
marketValue = new TextLayer
	autoSize: true
	text: "Market Value"
	fontSize: 12
	letterSpacing: 0.5
	color: "#A8A8A8"
	fontFamily: "PN Regular"
	superLayer: investments
	maxX: investments.width + 18, y: investmentsValue.maxY
	
investmentsPercent = new Layer
	width: 82, height: 35
	y: 110
	image: "images/investmentsPercent.png"
	superLayer: investments
investmentsPercent.centerX()

changeThisMonth = new TextLayer
	autoSize: true
	text: "Change This Month"
	fontSize: 13
	letterSpacing: 0.5
	color: "#595959"
	fontFamily: "PN Regular"
	superLayer: investments
	y: investmentsPercent.maxY + 10
changeThisMonth.centerX()

monthYearLabel = new Layer
	width: 120, height: 18
	x: -23, y: 44
	scale: 0.5
	image: "images/monthYearLabel.png"
	superLayer: spending
	
spendingPie = new Layer
	width: 141, height: 141
	y: 66
	image: "images/spendingPie.png"
	superLayer: spending
spendingPie.centerX()

spendingValue = new TextLayer
	width: 67, height: 26
	text: "$6,754"
	fontSize: 21
	letterSpacing: 0.5
	color: "#595959"
	fontFamily: "PN Regular"
	textAlign: "center"
	superLayer: spending
	y: 122
spendingValue.centerX()

spendingMonth = new TextLayer
	autoSize: true
	text: "November"
	fontSize: 12
	letterSpacing: 0.5
	color: "#A8A8A8"
	fontFamily: "PN Regular"
	superLayer: spending
	y: spendingValue.maxY
spendingMonth.centerX()

homeBudget = new Layer
	width: 89, height: 86
	x: 72, y: 93
	image: "images/Home.png"
	superLayer: budgets
	
autoBudget = new Layer
	width: 69, height: 67
	x: 162, y: 89
	image: "images/Auto.png"
	superLayer: budgets
	
utilitiesBudget = new Layer
	width: 51, height: 50
	x: 148, y: 153
	image: "images/Utilities.png"
	superLayer: budgets
	
healthBudget = new Layer
	width: 30, height: 30
	x: 199, y: 153
	image: "images/Health.png"
	superLayer: budgets
	
giftsBudget = new Layer
	width: 34, height: 34
	x: 139, y: 72
	image: "images/Gifts.png"
	superLayer: budgets
	
kidsBudget = new Layer
	width: 51, height: 50
	x: 93, y: 43
	image: "images/Kids.png"
	superLayer: budgets
	
entertainmentBudget = new Layer
	width: 57, height: 55
	x: 35, y: 54
	image: "images/Entertainment.png"
	superLayer: budgets
	
foodBudget = new Layer
	width: 55, height: 54
	x: 15, y: 108
	image: "images/Food.png"
	superLayer: budgets
	
travelBudget = new Layer
	width: 32, height: 32
	x: 50, y: 156
	image: "images/Travel.png"
	superLayer: budgets
	
advisorPic = new Layer
	width: 78, height: 78
	y: 36
	image: "images/advisorPic.png"
	superLayer: chat
advisorPic.centerX()

advisorName = new TextLayer
# 	autoSize: true
	width: 114, height: 17
	text: "Rob Jensen, CFP"
	fontSize: 14
	letterSpacing: 0.5
	color: "#595959"
	fontFamily: "PN SemiBold"
	superLayer: chat
	y: 119
advisorName.centerX()

advisorEmail = new TextLayer
	autoSize: true
	text: "robert.jensen@money.com"
	fontSize: 12
	letterSpacing: 0.5
	color: "#595959"
	fontFamily: "PN Regular"
	superLayer: chat
	y: advisorName.maxY + 4
advisorEmail.centerX()

advisorPhone = new TextLayer
# 	autoSize: true
	width: 80, height: 15
	text: "453.558.9592"
	fontSize: 12
	letterSpacing: 0.5
	color: "#595959"
	fontFamily: "PN Regular"
	superLayer: chat
	y: advisorEmail.maxY + 4
advisorPhone.centerX()

timeline = new Layer
	width: 533, height: 410
	maxY: goalsPlanning.height
	image: "images/timeline.png"
	superLayer: goalsPlanning
	
goalsSidebar = new Layer
	width: 261, height: goalsPlanning.height
	x: goalsPlanning.width - 261
	backgroundColor: null
	superLayer: goalsPlanning
goalsSidebar.style =
	'borderLeft': '1px solid #E4E6E7'

goal = []
for i in [0..6]
	goal[i] = new Layer
		width: 242, height: 51
		maxX: goalsSidebar.width
		y: (i * 51) + 54
		image: "images/goal" + [i] + ".png"
		name: "goal" + [i]
		superLayer: goalsSidebar
		
	goal[i].states.add
		off: x: 261, opacity: 0
	goal[i].states.animationOptions =
		curve: "spring(85, 15, 5)"
		delay: 0.05 * [i]
	goal[i].states.switchInstant('off')
		
collegeGoal = new Layer
	width: 161, height: 253
	x: 186, y: 148
	image: "images/College.png"
	superLayer: goalsPlanning
	
retirementGoal = new Layer
	width: 125, height: 151
	x: 284, y: 92
	image: "images/Retirement.png"
	superLayer: goalsPlanning
	
hawaiiGoal = new Layer
	width: 32, height: 42
	x: 205, y: 101
	image: "images/Hawaii.png"
	superLayer: goalsPlanning
	
bizGoal = new Layer
	width: 29, height: 32
	x: 248, y: 69
	image: "images/Biz.png"
	superLayer: goalsPlanning
	
timelineGoals = [
	collegeGoal
	retirementGoal
	hawaiiGoal
	bizGoal
]

loginForm = new Layer
	width: 260, height: 236
	y: 300
	image: "images/loginForm.png"
	superLayer: frame
loginForm.centerX()

spinner = new Layer
	width: 100
	height: 100
	midX: loginForm.midX - 5 
	y: 260
	opacity: 0
	backgroundColor: "transparent"
	superLayer: frame
spinner.html = "<svg><path fill='#ACB0B3' d='M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50'></path></svg>"
	

# STATES ##########

navBarContainer.states.add
	start: opacity: 0
navBarContainer.states.switchInstant('start')

addStartState = (card) ->
	for layer in card.subLayers
		layer.states.add
			start: opacity: 0
		layer.states.switchInstant('start')
			
addStartState(planSuccess)
addStartState(netWorth)
addStartState(investments)
addStartState(spending)
addStartState(goalsPlanning)
addStartState(budgets)
addStartState(chat)

fadeIn = (layer) ->
	layer.animate
		properties: opacity: 1
		time: 0.5

for layer, index in timelineGoals
	layer.originY = 0
	layer.states.add
		hide: height: 0
	layer.states.switchInstant('hide')
	layer.states.animationOptions =
		time: 0.8
		delay: 0.08 * index

bubbleBudgets = [
	homeBudget
	autoBudget
	utilitiesBudget
	healthBudget
	giftsBudget
	kidsBudget
	entertainmentBudget
	foodBudget
	travelBudget
]

for layer, index in bubbleBudgets
	layer.states.add
		hide:
			opacity: 0
			midX: budgets.width/2
			midY: budgets.height/2
			scale: 0.8
	layer.states.switchInstant('hide')
	layer.states.animationOptions =
		curve: ('spring(90, 10, 10)')
		delay: 0.02 * index			



# EVENTS ###############################
	
loginForm.on Events.Click, ->
	loginForm.animate
		properties: opacity: 0
		
	spinner.animate
		properties: opacity: 1
		
	spinner.animate
		properties: {rotation: 360*10}
		curve: "linear"
		time: 4
		
	Utils.delay 1.5, ->
		spinner.animate
			properties: opacity: 0
	
	Utils.delay 1.7, ->
		navBarContainer.states.switch('default')
		
		for layer, index in cardContainer.subLayers
			layer.states.switch("default")
			
		fadeIn(chartMask)
			
		Utils.delay 0.5, ->
			fadeIn(planHeader)
			fadeIn(planArc)
			fadeIn(successProbability)
			fadeIn(chartPointer)
			fadeIn(playZone)
			
			Utils.delay 0.2, ->
				chartMask.animate
					properties: 
						rotation: 180
					curve: "ease-in-out"
					time: 0.5
				
				Utils.delay 0.5, ->
					chartPointer.animate
						properties: rotation: 0
						time: 0.6
						
					fadeIn(successPercent)
					fadeIn(confidenceZone)
				
		Utils.delay 1, ->
			fadeIn(networthChart)
			networthChart.animate
				properties: 
					scaleY: 1
				curve: "spring(400, 20, 0)"
				
			for layer in netWorth.subLayers
				fadeIn(layer)
				
		Utils.delay 1.25, ->
			for layer in investments.subLayers
				fadeIn(layer)
				
			spendingPie.rotation = -360
			spendingPie.scale = 1.5
				
		Utils.delay 1.5, ->
			for layer in spending.subLayers
				fadeIn(layer)
				
			spendingPie.animate
				properties: rotation: 0, scale: 1
				curve: "spring(80, 20, 0)"
				
		Utils.delay 1.75, ->
			fadeIn(budgetsHeader)
			for layer in bubbleBudgets
				layer.states.switch('default')
				
			for layer in chat.subLayers
				fadeIn(layer)
				
		Utils.delay 2, ->
			for layer in goalsPlanning.subLayers
				fadeIn(layer)
			
			for layer in timelineGoals
				layer.states.switch('default')
				
			for layer in goal
				layer.states.switch('default')
				layer.ignoreEvents = true
				
for layer, index in cardContainer.subLayers
	layer.on Events.MouseOver, ->
		@.originX = 0.5
		@.originY = 0.5
		@.animate
			properties: scale: if @.index is 5 then 1.01 else 1.03
			
	layer.on Events.MouseOut, ->
		@.animate
			properties: scale: 1
			
goalsSidebar.ignoreEvents = true

navBarContainer.bringToFront()
			
		
		
# window.onload = init() 

