var classifier

const TestModel = () => {
    let image = new Image()
    return new Promise((resolve, reject) => {
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAcCAYAAABlL09dAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAAoSURBVEhL7cwxEQAgAAMx/JsuC/cO2BIBOftEHHHEEUccccQRR/xsF60QlugBZnhUAAAAAElFTkSuQmCC'
    classifier.classify(image, (err, results) => {
            if(err){reject (err)}
            else { resolve (results) }
        }) 
    })
}

const ClassifyImage = () => {
    let image = new Image()
    let final = new Image()
    return new Promise((resolve, reject) => {
        CameraPreview.takeSnapshot({quality: 30}, function(base64PictureData){
            imageSrcData = 'data:image/jpeg;base64,' +base64PictureData;
            image.src = imageSrcData;
            let canvas=document.createElement('canvas');
            let ctx=canvas.getContext("2d");
            let img=new Image();
            img.onload=function(){
                crop();
            }
            img.src=image.src;
            canvas.height = window.innerHeight/3
            canvas.width = window.innerWidth-40
    
            function crop(){
                ctx.drawImage(img,0, (img.height-image.width)/2, img.width, image.width,0, 0, canvas.width, canvas.height);
                final.src=canvas.toDataURL();
            }

            classifier.classify(final, (err, results) => {
                if(err){
                    reject(err) 
                }
                else {
                    resolve(results)
                }
            });
        })  
    });
}