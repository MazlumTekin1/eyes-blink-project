import cv2
from datetime import datetime
import cvzone
from cvzone.FaceMeshModule import FaceMeshDetector
from cvzone.PlotModule import LivePlot
from add_data import add_data




def StartTracking():
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    cap.set(cv2.CAP_PROP_FPS, 144.0)
    cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter.fourcc('m','j','p','g'))
    cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter.fourcc('M','J','P','G'))
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)

    detector = FaceMeshDetector(maxFaces=1)
    plotY = LivePlot(640, 360, [20, 50], invert=True)

    idList = {22, 23, 24, 26, 110, 157, 158, 159, 160, 161, 130, 243, 263, 249, 390, 373, 374, 380, 381, 386, 362, 398,
              384,
              263}
    ratioListRight = []
    ratioListLeft = []
    BlinkCounterBoth = 0
    ColorLeft = (255, 252, 51)
    ColorRight = (52, 152, 219)
    ColorBoth = (255, 0, 0)
    BothEyesClosed = False

    while True:
        if cap.get(cv2.CAP_PROP_POS_FRAMES) == cap.get(cv2.CAP_PROP_FRAME_COUNT):
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

        _, img = cap.read()
        img = cv2.flip(img, 1)
        img, faces = detector.findFaceMesh(img, draw=False)


        if faces:
            face = faces[0]
            for id in idList:
                cv2.circle(img, face[id], 3, ColorLeft, cv2.FILLED)

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

            #Both Eyes Closed
            if ratioAvgLeft <= 36 and ratioAvgRight <= 25 and BothEyesClosed == False:
                beginBlink = datetime.now()
                BothEyesClosed = True
                print("İki Göz Kapatıldı. Sol Göz Değeri:", ratioAvgLeft, " Sağ Göz Değeri: ", ratioAvgRight)
                ColorBoth = (0, 200, 0)

            #Both Eyes Opened
            if ratioAvgLeft >= 38 and  ratioAvgRight >= 28 and BothEyesClosed == True:
                endBlink = datetime.now()
                BlinkCounterBoth += 1
                BothEyesClosed = False
                print("İki Göz Açıldı. Sol Göz Değeri:", ratioAvgLeft, " Sağ Göz Değeri: ", ratioAvgRight)
                print("*****************************************************************************************************")
                ColorBoth = (255, 0, 255)
                BlinkDuration = (endBlink - beginBlink).total_seconds()
                if BlinkDuration <= 1.0:
                    add_data(BlinkDuration, 1)
                    print(BlinkDuration)
                elif BlinkDuration >= 1.1 and BlinkDuration <= 3.0:
                    add_data(BlinkDuration, 2)
                    print(BlinkDuration)
                elif BlinkDuration >= 3.1:    
                    add_data(BlinkDuration, 3)
                    print(BlinkDuration)

            cvzone.putTextRect(img, f'Both Eyes Blink Count: {BlinkCounterBoth}', (0, 200), colorR=ColorBoth)
            cvzone.putTextRect(img, f'Left Eye RatioAvg: {ratioAvgLeft}', (0, 250), colorR=ColorBoth)
            cvzone.putTextRect(img, f'Right Eye RatioAvg: {ratioAvgRight}', (0, 300), colorR=ColorBoth)

            imgPlotLeft = plotY.update(ratioAvgLeft, ColorLeft)
            imgPlotRight = plotY.update(ratioAvgRight, ColorRight)
            img = cv2.resize(img, (640, 360))

            imgStack = cvzone.stackImages([img,   imgPlotLeft, imgPlotRight], 2, 1)
        else:
            img = cv2.resize(img, (640, 360))
            imgStack = cvzone.stackImages([img, img], 2, 1)

        cv2.imshow("Image", imgStack)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

StartTracking()
