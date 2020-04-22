function setupCamera(){
    let options = {
        x: 20,
        y: window.innerHeight * 0.575 - (window.innerHeight/6),
        width:window.innerWidth-40,
        height: window.innerHeight/3,
        camera: CameraPreview.CAMERA_DIRECTION.BACK,
        toBack: false,
        tapPhoto: true,
        tapFocus: true,
        previewDrag: false,
        storeToFile: false,
        disableExifHeaderStripping: false
    };
        
    CameraPreview.startCamera(options);
    CameraPreview.show()
}