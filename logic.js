setup = function() {

    let height = 400
    preset_size = window.innerWidth
    paper = Raphael('paper',preset_size, height)

    function adjustSize(){
        paper.remove()
        let height = 400
        preset_size = window.innerWidth
        paper = Raphael('paper',preset_size, height)
    }
    window.onresize = adjustSize;

    let r
    
    $("")
    
    counter = 0
    x = 0

    var slider = document.getElementById("myRange");

    let objectSelect = "Objects"

    $('#object_select').on('change',function(){
        objectSelect = $("#object_select option:selected").text();
        paper.clear()
        document.getElementById("output").innerHTML = ""
        document.getElementById("time_complex").innerHTML = "" 
        console.log(objectSelect)
    });

    let colors = []
    let shapeArray = []
    slider_value = 0
    slider.oninput = function() {
        textBoxValue = this.value
        document.getElementById("output").innerHTML = "Size of Data: " + textBoxValue
        document.getElementById("time_complex").innerHTML = "Time Complexity: O(" + (textBoxValue * textBoxValue) + ")"
        
        if(objectSelect == "Colors"){
            paper.clear()
            arrayCounter = 0
            colors.length = 0
            
            for(i = 0; i <textBoxValue; i++){
                
                square_size = preset_size/textBoxValue
                pos_square_x = square_size
                
                colors[arrayCounter] = generate_random_color()
                arrayCounter += 1
            }
            
            drawDiagram(colors)
            console.log(colors.length)

        } else if(objectSelect == "Objects"){
            paper.clear()
            shapeArray.length = 0
            colors.length = 0

            for(i = 0; i < textBoxValue; i++){
                shapeArray[i] = Math.floor(Math.random() * 300) + 20;
                colors[i] = generate_random_color()
            }
            console.log(colors)
            drawShapes(shapeArray,colors)

        }
        
    }

    function drawShapes(arr, colorarr){
        let x = 0
        let square_size = preset_size/textBoxValue
        pos_square_x = square_size

        for(v = 0; v < arr.length; v++){
            r = paper.rect(x,arr[v], pos_square_x, (400-arr[v]))
            filled = {
                'fill':colorarr[v]
            }
            r.attr(filled)
            x += square_size
        }
    }

    function drawDiagram(arr){
        x = 0
        square_size = preset_size/textBoxValue
        pos_square_x = square_size

        for(z = 0; z < arr.length; z++){
            r = paper.rect(x,0,pos_square_x, height)
            filled = {
                'fill': colors[z]
            }
            r.attr(filled)
            x += square_size
        }
    }

    function modifyPosition(pos, color){
        square_size = preset_size/textBoxValue
        x = 0
        pos = pos * square_size
        r = paper.rect(x + pos, 0, square_size, height)
        filled = {
            'fill':color
        }
        r.attr(filled)
    }

    function modifyShapePos(pos, size, color){
        square_size = preset_size/textBoxValue
        x = 0
        pos = pos * square_size

        r = paper.rect(x+pos,size,square_size,height-size)
        // r = paper.rect(x+pos, size,square_size,height-size)
        filled = {
            'fill': color
        }
        r.attr(filled)
    }

    $("#animated_sort").click(function(){
        if(objectSelect == "Colors"){
            swaps = -1
            counter = 0
            sortCounter = 0;
            var startTime = new Date();
            var timeDraw = setInterval(drawSteps,1)
            
            function drawSteps(){
                if(colors[counter] > colors[counter+1]){
                    temp = colors[counter+1]
                    colors[counter+1] = colors[counter]
                    modifyPosition(counter + 1, colors[counter+1])
                    colors[counter] = temp
                    modifyPosition(counter, colors[counter])
                    swaps += 1
                }
                counter += 1
                
                console.log(counter)
                if(counter >= colors.length-1 && swaps == 0){
                    clearInterval(timeDraw)
                }else if(counter >= (colors.length-1-sortCounter) && swaps != 0){
                    swaps = 0
                    counter = 0
                    sortCounter += 1
                }
                
            }
        } else if (objectSelect == "Objects"){
            swaps = -1
            counter = 0
            sortCounter = 0;
            var startTime = new Date();
            var timeDraw = setInterval(drawSteps,1)
            
            function drawSteps(){
                if(shapeArray[counter] < shapeArray[counter+1]){
                    temp = shapeArray[counter+1]
                    temp2 =colors[counter+1]

                    shapeArray[counter+1] = shapeArray[counter]
                    colors[counter+1] = colors[counter]

                    clearPosition(counter+1)
                    modifyShapePos(counter + 1, shapeArray[counter+1],colors[counter+1])
                    
                    colors[counter] = temp2
                    shapeArray[counter] = temp

                    clearPosition(counter)
                    modifyShapePos(counter, shapeArray[counter],colors[counter])

                    swaps += 1
                }
                counter += 1
                
                console.log(counter)
                if(counter >= shapeArray.length-1 && swaps == 0){
                    clearInterval(timeDraw)
                }else if(counter >= (shapeArray.length-1-sortCounter) && swaps != 0){
                    swaps = 0
                    counter = 0
                    sortCounter += 1
                }
                
            }
        }
        
    });

    $("#selection_sort").click(function(){
        
        if(objectSelect == "Colors"){
            if(checkSort(colors) != true){
                counter = 0
                
                var timeDraw = setInterval(findSmallest,1)
                
                function findSmallest(){
                    let min = colors[counter]
                    let minIndex = counter
                    console.log(0+counter)
                    for(i = 1+counter; i < colors.length; i++){
                        if(colors[i] < min){
                            min = colors[i]
                            minIndex = i
                        }
                    }
    
                    temp = colors[minIndex]
                    
                    colors[minIndex] = colors[counter]
                    modifyPosition(minIndex, colors[minIndex])
                    colors[counter] = temp
                    modifyPosition(counter, colors[counter])
    
                    counter += 1
                    // console.log(counter)
                    if(counter == colors.length){
                        clearInterval(timeDraw)
                        counter = 0
                    }
                }
            }
        }else if(objectSelect == "Objects"){
                counter = 0
                var timeDraw = setInterval(findSmallest,1)
                
                function findSmallest(){
                    let min = shapeArray[counter]
                    let minIndex = counter

                    console.log(0+counter)
                    for(i = 1+counter; i < shapeArray.length; i++){
                        if(shapeArray[i] > min){
                            min = shapeArray[i]
                            minIndex = i
                        }
                    }
    
                    temp = shapeArray[minIndex]
                    temp2 = colors[minIndex]

                    shapeArray[minIndex] = shapeArray[counter]
                    colors[minIndex] = colors[counter]
                    clearPosition(minIndex)
                    
                    modifyShapePos(minIndex, shapeArray[minIndex],colors[minIndex])
                    shapeArray[counter] = temp
                    colors[counter] = temp2
                    
                    clearPosition(counter)
                    modifyShapePos(counter, shapeArray[counter],colors[counter])
    
                    counter += 1
                    // console.log(counter)
                    if(counter == shapeArray.length){
                        clearInterval(timeDraw)
                        counter = 0
                    }
            }
        }
    });

    function clearPosition(pos){
        square_size = preset_size/textBoxValue
        x = 0
        pos = pos * square_size

        r = paper.rect(x+pos,0,square_size,height)

        filled = {
            'fill': "#fff",
            'stroke': '#fff'
        }
        r.attr(filled)
    }

    function generate_random_color(){
        final_color = "#"
        for(y = 0; y < 3; y++){
            let random = Math.floor(Math.random() * 16);
            if(random > 9){
                letter = String.fromCharCode(87 + random)
                final_color += letter
            }else{
                final_color+=random
            }
        }
        return final_color
        
    }

    $("#fill_btn").click(function(){
        paper.clear()
        x = 0
        arrayCounter = 0
        textBoxValue = $("#text_field").val()
        for(i = 0; i <textBoxValue; i++){
            
            square_size = preset_size/textBoxValue
            pos_square_x = square_size
            
            colors = []
            color.push("#"+((1<<24)*Math.random()|0).toString(16))
            
            r = paper.rect(x,0,pos_square_x, height)
            filled = {
                'fill': colors[arrayCounter]
            }
            r.attr(filled)

            x += square_size
            arrayCounter += 1
        }
    });
    
    var timer
    // $("#sort_btn_1").click(function(){
    //     swaps = -1

    //     while(swaps != 0){
    //         swaps = 0
    //         counter = 0
    //         while(counter < colors.length-1){
    //             if(colors[counter] > colors[counter+1]){
    //                 temp = colors[counter+1]
    //                 colors[counter+1] = colors[counter]
    //                 colors[counter] = temp
    //                 swaps += 1
    //             }
                
    //             counter += 1
    //         }
    //     }

    //     drawDiagram(colors)
    //     console.log(colors)
    // });

    function checkSort(colors){
        swaps = 0
        counter = 0
        while(counter < colors.length-1){
            if(colors[counter] > colors[counter+1]){
                temp = colors[counter+1]
                colors[counter+1] = colors[counter]
                colors[counter] = temp
                swaps += 1
            }
            
            counter += 1
        }

        if(swaps == 0){
            return true
        }else{
            return false
        }
    }
}
jQuery(document).ready(setup)