import cv2
from datetime import datetime
import cvzone
from cvzone.FaceMeshModule import FaceMeshDetector
from cvzone.PlotModule import LivePlot
import router

cap = cv2.VideoCapture(0)
#cap = cv2.VideoCapture('Video.mp4')
detector = FaceMeshDetector(maxFaces=1)
plotY = LivePlot(640, 360, [20, 50], invert=True)

idListLeft = [22, 23, 24, 26, 110, 157, 158, 159, 160, 161, 130, 243]
#idListRight = [263, 249, 390, 373, 374, 380, 381, 386, 362, 398, 384, 263] #382 8.sırada

# idListLeft = [33, 7, 163, 144, 145, 153, 154, 155, 133, 159, 157, 33]
idListRight = [263, 249, 390, 373, 374, 380, 381, 386, 362, 398, 384, 263]
idList = [22, 23, 24, 26, 110, 157, 158, 159, 160, 161, 130, 243, 263, 249, 390, 373, 374, 380, 381, 386, 362, 398, 384, 263]
ratioListRight = []
ratioListLeft = []
blinkCounterRight = 0
blinkCounterLeft = 0
counterRight = 0
counterLeft = 0
colorLeft = (255, 252, 51)
colorRight = (52, 152, 219)
isOpenedRight = False
isClosedRight = False
isOpenedLeft = False
isClosedLeft = False
isBeginLeft = False
isBeginRight = False
beginBlink = datetime.now()
EndBlink = datetime.now()
while True:

    if cap.get(cv2.CAP_PROP_POS_FRAMES) == cap.get(cv2.CAP_PROP_FRAME_COUNT):
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

    success, img = cap.read()
    img = cv2.flip(img, 1) # kameradaki ayna gorunumu kaldirir.
    img, faces = detector.findFaceMesh(img, draw=False)


    if faces:
        face = faces[0]

        # for id in idListLeft:
        #     cv2.circle(img, face[id], 3, colorLeft, cv2.FILLED)
        #
        # for id in idListRight:
        #     cv2.circle(img, face[id], 3, colorRight, cv2.FILLED)

        for id in idList:
            cv2.circle(img, face[id], 3, colorRight, cv2.FILLED)

        leftUp = face[159]
        leftDown = face[23]
        leftLeft = face[130]
        leftRight = face[243]

        lenghtVerLeft, _ = detector.findDistance(leftUp, leftDown)
        lenghtHorLeft, _ = detector.findDistance(leftLeft, leftRight)

    
        rightUp = face[386]
        rightDown = face[374]
        rightLeft = face[362]
        rightRight = face[263]

        lenghtVerRight, _ = detector.findDistance(rightUp, rightDown)
        lenghtHorRight, _ = detector.findDistance(rightLeft, rightRight)

        cv2.line(img, leftUp, leftDown, (0, 200, 0), 3)
        cv2.line(img, leftLeft, leftRight, (0, 200, 0), 3)

        cv2.line(img, rightUp, rightDown, (0, 200, 0), 3)
        cv2.line(img, rightLeft, rightRight, (0, 200, 0), 3)

        ratioLeft = int((lenghtVerLeft / lenghtHorLeft) * 100)
        ratioListLeft.append(ratioLeft)
        if len(ratioListLeft) >= 3:
            ratioListLeft.pop(0)
        ratioAvgLeft = sum(ratioListLeft) / len(ratioListLeft)

        ratioRight = int((lenghtVerRight / lenghtHorRight) * 100)
        ratioListRight.append(ratioRight)
        if len(ratioListRight) >= 3:
            ratioListRight.pop(0)
        ratioAvgRight = sum(ratioListRight) / len(ratioListRight)

        #Right eye closed
        if ratioAvgRight <=24 and isOpenedRight == False and isOpenedLeft == False:
            beginBlink = datetime.now()
            isOpenedRight = True
            isClosedRight = True
            color = (0, 200, 0)
            #cvzone.putTextRect(img, f'Right Eye Begin Blink: {beginBlink}', (0, 150), colorR=color)
            print(f'Right Eye Begin Blink: {beginBlink}')

        # Right eye opened
        if ratioAvgRight > 30  and isClosedRight == True and isOpenedLeft == False:
            endBlink = datetime.now()
            blinkCounterRight += 1
            isOpenedRight = False
            isClosedRight = False
            isBeginRight = False
            color = (255, 0, 255)
            #cvzone.putTextRect(img, f'End Blink: {endBlink}', (0, 200), colorR=color)
            print(f'Right Eye End Blink: {endBlink}')

        # Left eye closed
        if ratioAvgLeft <= 33 and isOpenedLeft == False and isOpenedRight == False:
            beginBlink = datetime.now()
            isOpenedLeft = True
            isClosedLeft = True
            color = (0, 200, 0)
            #cvzone.putTextRect(img, f'Left Eye Begin Blink: {beginBlink}', (0, 150), colorR=color)
            print(f'Left Eye Begin Blink: {beginBlink}')

        # Left eye opened
        if ratioAvgLeft > 38 and isClosedLeft == True and isOpenedRight == False:
            endBlink = datetime.now()
            blinkCounterLeft += 1
            isOpenedLeft = False
            isClosedLeft = False
            isBeginLeft = False
            color = (255, 0, 255)
            # cvzone.putTextRect(img, f'Left Eye End Blink: {endBlink}', (0, 200), colorR=color)
            print(f'Left Eye End Blink: {endBlink}')

        cvzone.putTextRect(img, f'Left Eye Blink Count: {blinkCounterLeft}', (0, 100), colorR=colorLeft)
        cvzone.putTextRect(img, f'Right Eye Blink Count: {blinkCounterRight}', (0, 150), colorR=colorRight)

        imgPlotRight = plotY.update(ratioAvgRight, colorRight)
        imgPlotLeft = plotY.update(ratioAvgLeft, colorLeft)
        img = cv2.resize(img, (640, 360))

        imgStack = cvzone.stackImages([img,   imgPlotLeft, imgPlotRight], 2, 1)
        #imgStackLeft = cvzone.stackImages([img, imgPlotLeft], 2, 1)
        #imgStackRight = cvzone.stackImages([img, imgPlotRight], 2, 1)
    else:
        img = cv2.resize(img, (640, 360))
        imgStack = cvzone.stackImages([img, img], 2, 1)

    cv2.imshow("Image", imgStack)
    #cv2.imshow("Image", imgStackLeft)
    #cv2.imshow("Image", imgStackRight)
    cv2.waitKey(25)