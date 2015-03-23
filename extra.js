/**
 * Created with IntelliJ IDEA.
 * User: GIB
 * Date: 5/09/14
 * Time: 11:32
 * To change this template use File | Settings | File Templates.
 */

/**
 * Function that starts the window to show the different connections between a node and the SPARQL node, the user may choose one of them
 * @param node
 */
function showConnections(node){
    var nodesSPARQL = sessionStorage.getItem("nodesSPARQL");
    var con = sessionStorage.getItem("conIDS");
    con = con.split("[[")[1];
    con = con.split("]]")[0];
    con = con.split("], [");
    nodesSPARQL = nodesSPARQL.split(",")
    var text = "<div>";


    var id = "";
    for(var j = 0; j < con.length; j++){
        var con1 = con[j]
        con1 = con1.split(", ");
        var found = "false";
        for(var i = 0; i < nodesSPARQL.length; i++){
           if(con1[0].toString() == nodesSPARQL[i].toString()){
              found = "true";
               id = nodesSPARQL[i].toString();
           }
           if(con1[2].toString() == nodesSPARQL[i].toString()){
               found = "true";
               id = nodesSPARQL[i].toString();
           }
        }
        if(found.toString() == "true"){
            if(con1[3].toString() == "related to"){
                text = text + "<input type='radio' name='foo' value='"+con1.toString()+"'>"+con1[0]+ " and " + con1[2] + " that are " + con1[3] + " " + con1[1] + "<br>"
            }else{
                text = text + "<input type='radio' name='foo'   value='"+con1.toString()+"'>"+con1[1]+" in "+ con1[0] + " equals " + con1[3] + " in "+ con1[2] + "<br>"
            }
        }
    }
    var t = document.getElementById('checkBoxConnections')
    t.innerHTML = "    <div class='login-container' style='text-align: left'><b style='text-align: center'>The data base you want to include in the SPARQL query has more than one connection, please choose the one you want to use</b><br><br><br>"+
        text +
        "<br><button class='btn-primary' onclick='endShowConnections()'>Continue</button></div>";

    document.getElementById('checkBoxConnections').style.display = 'inline';
    document.getElementById('viewport').style.display = 'none';


}

/**
 * Function that stop showing the window that show the different connections between a node and the SPARQL node, the user may choose one of them
 * @param node
 */
function endShowConnections(){

    document.getElementById('checkBoxConnections').style.display = 'none';
    document.getElementById('viewport').style.display = 'inline';


}

/**
 * Function to convert the nodes size into a common reference
 * @param x the size
 * @returns {number}
 */
function convertSize(x){
    var result = 0;
    var sizes = sessionStorage.getItem("nodesSize")
    if(sizes == null){
        result = "none";
    }else{
        sizes = sizes.split("[")[1];
        sizes = sizes.split("]")[0];
        sizes = sizes.split(", ");

        var max = 0;
        var min = 9999;
        for(var i = 0; i < sizes.length; i++){
            if(parseInt(max) < parseInt(sizes[i])){
                max = sizes[i]

            }
            if(parseInt(min) > parseInt(sizes[i])){
                min = sizes[i]
            }
        }


        if(x < 0.1){
            result = max
        }else{
            if(x < 0.2){
                result = max*0.9
            }else{
                if(x < 0.3){
                    result = max*0.8
                }else{
                    if(x < 0.4){
                        result = max*0.7
                    }else{
                        if(x < 0.5){
                            result = max*0.6
                        }else{
                            if(x < 0.6){
                                result = max*0.5
                            }else{
                                if(x < 0.7){
                                    result = max*0.4
                                }else{
                                    if(x < 0.8){
                                        result = max*0.3
                                    }else{
                                        if(x < 0.9){
                                            result = max*0.2
                                        }else{
                                            var minL = max*0.2
                                            if(minL < min-1){
                                                result = max*0.1
                                            }else{
                                                result = min-1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    return result;
}

/**
 * Function to convert the nodes date into a common reference
 * @param x
 * @returns {string}
 */
function convertDate(x){
    var result = "";
    var nodesDate = sessionStorage.getItem("date")
    if(nodesDate == null){
        result = "none"
    }else{
        nodesDate = nodesDate.split("[")[1];
        nodesDate = nodesDate.split("]")[0];
        nodesDate = nodesDate.split(", ");

        var maxYear = 1900;
        var maxMonth = 01;
        var maxDay = 01;
        var minYear= 3000;
        for(var i = 0; i < nodesDate.length; i++){
            var date = nodesDate[i]
            var day = date.split("/")[0]
            var date1 = date.split("/")[1]
            var date2 = date.split("/")[2]
            var month = date1
            var year = date2
            if(parseInt(maxYear) < parseInt(year)){
                maxYear = year
                maxMonth = month
                maxDay = day
            }
            if(parseInt(minYear) > parseInt(year)){
                minYear = year;
            }

        }


        var a;

        var difference = parseInt(maxYear) - parseInt(minYear)

        if(difference <= 20){
            a = 1;
        }else{
            if(difference <= 40 ){
                a = 2;
            }else{
                if(difference <= 60){
                    a = 3;
                }else{
                    if(difference <= 80){
                        a = 4;
                    }else{
                        if(difference <= 100){
                            a = 5;
                        }
                    }
                }
            }
        }


        if(x < 0.1){
            result = maxYear
        }else{
            maxYear =maxYear-a
            if(x < 0.2){
                result = maxYear
            }else{
                maxYear =maxYear-a
                if(x < 0.3){
                    result = maxYear
                }else{
                    maxYear =maxYear-a
                    if(x < 0.4){
                        result = maxYear
                    }else{
                        maxYear =maxYear-a
                        if(x < 0.5){
                            result = maxYear
                        }else{
                            maxYear =maxYear-a
                            if(x < 0.5){
                                result = maxYear
                            }else{
                                maxYear =maxYear-a
                                if(x < 0.6){
                                    result =maxYear
                                }else{
                                    maxYear =maxYear-a
                                    if(x < 0.8){
                                        result = maxYear
                                    }else{
                                        if(x < 0.9){
                                            result = minYear
                                        }else{
                                            result =  minYear -1
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return result;
}

/**
 * Function that calculates if the coordinates of p (the mousse coordinates) are near the lines between the two point p1 and p2 (the edege between node1/p1 and node2/p2)
 * @param p1 the coordinates of the node1
 * @param p2 the coordinates of the node2
 * @param p  the coordinates of the mousse
 * @returns {number}  0 if near and 1 if is not near
 */
function line(p1, p2, p){

      var p1 = p1.normal();
      var p2 = p2.normal();
      var p = p.normal();

      var p1x = p1.x
      var p1y = p1.y
      var p2x = p2.x
      var p2y = p2.y
      var px = p.x
      var py = p.y

    //line between two points
    var m =  parseFloat(p1y) - parseFloat(p2y)
    var m1 = parseFloat(p1x) - parseFloat(p2x)
    m = parseFloat(m)/parseFloat(m1)
    var n = parseFloat(p1y) - (parseFloat(p1x)*parseFloat(m))



    //DISTANCE OF THE LINE TO A POINT
     var up = (-parseFloat(py)) + (parseFloat(m)*parseFloat(px)) + parseFloat(n)
     var upAbs = Math.abs(parseFloat(up))
     var down = 1 + parseFloat(m)^2
     var down2 = Math.sqrt(parseFloat(down))
     var distance = upAbs/down2
    if(parseFloat(distance) < 0.1 && parseFloat(distance) > -0.1){
        return 0;
    }
    return 1;


}


/**
 * Function to convert the nodes size into a common reference
 * @param name
 * @returns {number}
 */
function sizeNodeRepresentation(name){
    var sizes = sessionStorage.getItem("nodesSize")
    sizes = sizes.split("[")[1];
    sizes = sizes.split("]")[0];
    sizes = sizes.split(", ");

    var nodesNow = sessionStorage.getItem("nodes");
    nodesNow = nodesNow.split("[")[1];
    nodesNow = nodesNow.split("]")[0];
    nodesNow = nodesNow.split(", ");

    var max = 0;
    var min = 9999;
    for(var i = 0; i < sizes.length; i++){
        if(parseInt(max) < parseInt(sizes[i])){
            max = sizes[i]
        }
        if(parseInt(min) > parseInt(sizes[i])){
            min = sizes[i]
        }
    }
    var sizeEnd = 0;
    for(var i = 0; i < nodesNow.length; i++){
        if(nodesNow[i].toString() == name.toString()){
           sizeEnd = sizes[i];
        }
    }

    if(parseInt(sizeEnd) == parseInt(max)){
        return 200;
    }else{
        if(parseInt(sizeEnd) > parseInt(max)*0.85){
            return 200*0.9;
        }else{
            if(parseInt(sizeEnd) > parseInt(max)*0.7){
                return 200*0.8;
            }else{
                if(parseInt(sizeEnd) > parseInt(max)*0.55){
                    return 200*0.7;
                }else{
                    if(parseInt(sizeEnd) > parseInt(max)*0.4){
                        return 200*0.6;
                    }else{
                        if(parseInt(sizeEnd) > parseInt(max)*0.25){
                            return 200*0.5;
                        } else{
                                return 75;
                        }
                    }
                }
            }
        }
    }

}

/**
 * When the button clear is pushed we delete all the data stored in the session of the client
 */
function clearAction(){
   sessionStorage.clear();
}

/**
 * When the zoom in button is pushed we stored in the session the action to increase the graph
 */
function zoomActionIn(){
   sessionStorage.setItem("zoom", "in")
}

/**
 * When the zoom out button is pushed we stored in the session the action to decrease the graph
 */
function zoomActionOut(){
    sessionStorage.setItem("zoom", "out")
}

/**
 * When a key is pushed on the search input we translate the code of the keyboard into a string to check the nodes that agree with that key
 * @param e
 */
function makeLight(e){

    var e = window.event || e;
    var key = e.keyCode;
    key = String.fromCharCode(key)
    var keyBefore = sessionStorage.getItem("tecla")
    if(keyBefore != null){
        if(keyBefore.toString() != 'empty'){
            key = keyBefore + key
        }
    }
    sessionStorage.setItem("tecla", key)

}

/**
 * When the button reset is pushed we delete all the key values stored
 * @param e
 */
function teclaClear(e){

    var e = window.event || e;
    var tecla = e.keyCode;

    if(tecla === 8){
        var teclaAntes = sessionStorage.getItem("tecla")
        if(teclaAntes.toString() != 'empty'){
            if(teclaAntes.length !== 0){
                teclaAntes = teclaAntes.substring(0, teclaAntes.length-1);
                sessionStorage.setItem("tecla", teclaAntes)
            }
            if(teclaAntes.length === 0){
                sessionStorage.setItem("tecla", "empty")
            }
        }
    }

}

/**
 *
 */
function deleteKeyboard(){
    sessionStorage.setItem("tecla", 'empty')
    sessionStorage.setItem("searchIt", "1")
    var input = document.getElementsByName("termino")
    input.innerHTML = input.innerHTML
}

/**
 * Funtion to calculate the color of a node
 * @param nodeClick
 * @param nodeConnected
 * @returns {string}
 */
function colorNode(nodeClick, nodeConnected){
    var nodesNow = sessionStorage.getItem("nodes");
    var nodesSim = sessionStorage.getItem("simNodes");

    nodesNow = nodesNow.split("[")[1];
    nodesNow = nodesNow.split("]")[0];
    nodesNow = nodesNow.split(", ");

    nodesSim = nodesSim.split("[")[1];
    nodesSim = nodesSim.split("]")[0];
    nodesSim = nodesSim.split(", ");

    var sim;
    var counter = 0;
    for(var h = 0; h < nodesNow.length;h++){
        for(var p = 0; p < nodesNow.length;p++){
            if(nodesNow[h].toString() == nodeClick.toString() && nodesNow[p].toString() == nodeConnected.toString()){
                sim = nodesSim[counter];
            }
            counter++;
        }
    }
    var color;
    if(typeof sim == "undefined"){
      sim = 1;
    }

    sim = parseInt(sim)
    var red = 0x99;
    var green = 0x11;
    var blue = 0x00;
    red = red-(sim*11)
    blue = blue+(sim*11)
    red = red.toString(16);
    blue = blue.toString(16);
    green = green.toString(16);
    switch(red.length){
        case 0:
            red = '00';
            break;
        case 1:
            red = '0'+red;
            break;
        default:
            red = red;
            break;
    }
    switch(green.length){
        case 0:
            green = '00';
            break;
        case 1:
            green = '0'+green;
            break;
        default:
            green = green;
            break;
    }
    switch(blue.length){
        case 0:
            blue = '00';
            break;
        case 1:
            blue = '0'+blue;
            break;
        default:
            blue = blue;
            break;
    }
    color = '#'+ red + green + blue;
    return color;
}

/**
 * Function that checks what tag add into the description boxes
 * @param node
 */
function addTag(node){
    var rel = sessionStorage.getItem("relation")
    if(rel.toString() == "ok" || node.toString() == "relation"){
        var rel1 = sessionStorage.getItem("relationD")

        var tag = "<div class='tags' id='"+rel.toString()+"' style='padding:10px;background-color: lightgrey ;border: 1px solid white;margin:0px;'><p><b ><button id='b1' type=\"button\" class=\"btn btn-primary btn-xs\" onclick=\"removeTag('"+ rel.toString() + "')\" >-</button> " + rel1.toString() + "</b></p><p id='description"+rel.toString()+"'></p></div><label></label>";
        var tagsShown = document.getElementsByClassName("tags");
        var tagsShownLength = document.getElementsByClassName("tags").length;
        var iSimulation = sessionStorage.getItem("iSimulation")
        if(iSimulation == null){
            iSimulation = 0;
        }else{
            if(iSimulation.toString() == '0'){
                iSimulation = 0;
            }else{
                iSimulation = 1;
            }
        }
        if(iSimulation != 0){
            tagsShown[0].innerHTML = tag.toString();
        }else{
            iSimulation++;
            sessionStorage.setItem("iSimulation",iSimulation)
            var counter = 0;
            for(var i = 0; i < tagsShownLength - 1; i++){
                tagsShown[counter].remove();
            }
            tagsShown[0].innerHTML = tag.toString();
        }

        var id = "description"+rel.toString()
        var p = document.getElementById(id)

        var nodesNow = sessionStorage.getItem("nodesAll");
        nodesNow = nodesNow.split("[")[1];
        nodesNow = nodesNow.split("]")[0];
        nodesNow = nodesNow.split(", ");
        var con = sessionStorage.getItem("conIDS");
        con = con.split("[[")[1];
        con = con.split("]]")[0];
        con = con.split("], [");

        var text = "";
        var text1 = "";
        for(var j = 0; j < con.length; j++){
            var con1 = con[j]
            con1 = con1.split(", ");
            for(var i = 0; i < nodesNow.length; i++){
                if(con1[0].toString() == nodesNow[i].toString()){
                    if(con1[3].toString() == "related to"){
                        text = text + con1[0]+ " and " + con1[2] + " that are " + con1[3] + " " + con1[1] + "<br><br>"
                    }
                }
                if(con1[2].toString() == "related to"){
                    if(con1[2].toString() == nodesNow[i].toString()){
                        if(con1[3].toString() == "related to"){
                            text = text + con1[0]+ " and " + con1[2] + " that are " + con1[3] + " " + con1[1] + "<br><br>"
                        }
                    }
                }
            }
        }
        for(var j = 0; j < con.length; j++){
            var con1 = con[j]
            con1 = con1.split(", ");
            for(var i = 0; i < nodesNow.length; i++){
                if(con1[0].toString() == nodesNow[i].toString()){
                    if(con1[3].toString() != "related to"){
                        text1 = text1 + con1[1]+" in "+ con1[0] + " equals " + con1[3] + " in "+ con1[2] + "<br><br>";

                    }
                }else{
                    if(con1[2].toString() == nodesNow[i].toString()){
                        if(con1[3].toString() != "related to"){
                            text1 = text1 + con1[1]+" in "+ con1[0] + " equals " + con1[3] + " in "+ con1[2] + "<br><br>" ;
                        }
                    }
                }

            }
        }
        text = text1 + text;
        p.innerHTML = text;
        sessionStorage.setItem("relation", "noway")
        sessionStorage.setItem("relationDeploy", "ok")
    }else{
        sessionStorage.setItem("relationDeploy", "noway")
        sessionStorage.setItem("nodetagged", node)
        var descriptions = sessionStorage.getItem("nodesDescriptions")
        descriptions = descriptions.split("[")[1];
        descriptions = descriptions.split("]")[0];
        descriptions = descriptions.split(", ");

        var nodesTotal = sessionStorage.getItem("nodesAll")
        nodesTotal = nodesTotal.split("[")[1];
        nodesTotal = nodesTotal.split("]")[0];
        nodesTotal = nodesTotal.split(", ");

        var nodesDate = sessionStorage.getItem("date")
        nodesDate = nodesDate.split("[")[1];
        nodesDate = nodesDate.split("]")[0];
        nodesDate = nodesDate.split(", ");

        var nodesProvenance = sessionStorage.getItem("provenance")
        nodesProvenance = nodesProvenance.split("[")[1];
        nodesProvenance = nodesProvenance.split("]")[0];
        nodesProvenance = nodesProvenance.split(", ");

        var nodesAuthor = sessionStorage.getItem("author")
        nodesAuthor = nodesAuthor.split("[[")[1];
        nodesAuthor = nodesAuthor.split("]]")[0];
        nodesAuthor = nodesAuthor.split("], [");

        var nodesSize = sessionStorage.getItem("nodesSize")
        nodesSize = nodesSize.split("[")[1];
        nodesSize = nodesSize.split("]")[0];
        nodesSize = nodesSize.split(", ");

        var descriptionNode;
        var author;
        var provenance;
        var date;
        var size;

        for(var i = 0; i < nodesTotal.length; i++){
            if(nodesTotal[i].toString() == node.toString()){
                descriptionNode = descriptions[i].toString();
                author = nodesAuthor[i].toString();
                provenance = nodesProvenance[i].toString();
                date = nodesDate[i].toString();
                size = nodesSize[i].toString();
            }
        }



        var tag = "<div class='tags' id='"+node.toString()+"' style='padding:10px;background-color: lightgrey ;border: 1px solid white;margin:0px;'><p><b ><button id='b1' type=\"button\" class=\"btn btn-primary btn-xs\" onclick=\"removeTag('"+ node.toString() + "')\" >-</button> " + node.toString() + "</b></p><p id='description"+node.toString()+"'></p></div><label></label>";
        var tagsShown = document.getElementsByClassName("tags");
        var tagsShownLength = document.getElementsByClassName("tags").length;
        var iSimulation = sessionStorage.getItem("iSimulation")
        if(iSimulation == null){
            iSimulation = 0;
        }else{
            if(iSimulation.toString() == '0'){
                iSimulation = 0;
            }else{
                iSimulation = 1;
            }
        }
        if(iSimulation != 0){
            tagsShown[0].innerHTML = tag.toString();
        }else{
            iSimulation++;
            sessionStorage.setItem("iSimulation",iSimulation)
            var counter = 0;
            for(var i = 0; i < tagsShownLength - 1; i++){
                tagsShown[counter].remove();
            }
            tagsShown[0].innerHTML = tag.toString();
        }
        var id = "description"+node.toString()
        var p = document.getElementById(id)
        var toShow = "<p>"+descriptionNode+ "<br><br> <b>Author:</b> " + author + "<br>" + "<b>Date:</b> " + date + "<br>"+ "<b>Provenance:</b> " + provenance+ "<br> <b>Size: </b>" + size + " </p>";
        p.innerHTML = toShow;

    }

}

/**
 * Function to undeploy a tag
 * @param node
 */
function removeTag(node){
    var rel = sessionStorage.getItem("relationDeploy")
    if(rel.toString() == "ok"){
        var rel1 = sessionStorage.getItem("relationD")
        var tag = "<div class='tags' id='"+node.toString()+"' style='padding:10px;background-color: lightgrey ;border: 1px solid white;margin:0px;'><p><b ><button id='b1' type=\"button\" class=\"btn btn-primary btn-xs\" onclick=\"addTag('relation')\" >+</button> " + rel1.toString() + "</b></p><p id='description"+node.toString()+"'></p></div><label></label>";
        var tagsShown = document.getElementsByClassName("tags");

        tagsShown[0].innerHTML = tag.toString();
    }else{
        var tag = "<div class='tags' id='"+node.toString()+"' style='padding:10px;background-color: lightgrey ;border: 1px solid white;margin:0px;'><p><b ><button id='b1' type=\"button\" class=\"btn btn-primary btn-xs\" onclick=\"addTag('"+ node.toString() + "')\" >+</button> " + node.toString() + "</b></p><p id='description"+node.toString()+"'></p></div><label></label>";
        var tagsShown = document.getElementsByClassName("tags");

        tagsShown[0].innerHTML = tag.toString();
    }

}

/**
 * Function to make the smart search with tho stored key values
 */
function smartSearch(){
    var sparql = sessionStorage.getItem("nodesSPARQL")
    if(sparql != null){
        sparql = sparql.split(",")
        for(var i = 0; i < sparql.length; i++){
            var searchIA = document.getElementById("recomendations"+sparql[i].toString())
            if(searchIA != null){
                searchIA.remove()
            }
        }
    }
}

/**
 * Function to upload the data of the nodes introduced on the sparql query and node
 * @constructor
 */
function SPARQLUpload(){

    var nodeQuery = sessionStorage.getItem("addSPARQL");
   sessionStorage.setItem("addSPARQL", "empty")
    sessionStorage.setItem("addbox", nodeQuery)

    if(nodeQuery != null){
        if(nodeQuery != 'empty'){

            var SPARQLall = sessionStorage.getItem("sparqlSlider")
                SPARQLall = SPARQLall.split("[")[1];
                SPARQLall = SPARQLall.split("]")[0];
                SPARQLall = SPARQLall.split(", ");

            var ids = sessionStorage.getItem("idsDesc");
                ids = ids.split("[")[1];
                ids = ids.split("]")[0];
                ids = ids.split(", ");

            var  nodes = sessionStorage.getItem("nodesAll");
            nodes = nodes.split("[")[1];
            nodes = nodes.split("]")[0];
            nodes = nodes.split(", ");

            var query = "";
            var idsRepresented = "";
            for(var i = 0; i < nodes.length; i++){
                if(nodes[i].toString() == nodeQuery.toString()){
                    query = SPARQLall[i].toString();
                    idsRepresented = ids[i].toString();
                }
            }
            var p  = document.getElementById("queriesConnections");

            p.innerHTML = p.innerHTML + "<br><div class='tags2' id='"+ nodeQuery.toString() + "' style='padding:10px;background-color:darkgrey;border:0px;margin:0px;'>"+"<button onclick=\"checkBoxActive('"+nodeQuery+"')\" type='button' class='btn btn-primary btn-xs'  >+</button><b>"+query+"</b></div>" ;


            //////////////////////////////////////////////////////////////

            var nodesSPARQL = sessionStorage.getItem("nodesSPARQL");

            if(nodesSPARQL != null){
                var con = sessionStorage.getItem("conIDS");
                con = con.split("[[")[1];
                con = con.split("]]")[0];
                con = con.split("], [");
                nodesSPARQL = nodesSPARQL.split(",")
                var text = "";

                for(var j = 0; j < con.length; j++){
                    var con1 = con[j]
                    con1 = con1.split(", ");
                    var found = "false";
                    for(var i = 0; i < nodesSPARQL.length; i++){
                        if(con1[0].toString() == nodesSPARQL[i].toString()){
                            found = "true";
                        }
                        if(con1[2].toString() == nodesSPARQL[i].toString()){
                            found = "true";
                        }

                    }
                    if(found.toString() == "true"){

                        if(con1[3].toString() == "related to"){
                            text = text +con1[0]+ " and " + con1[2] + " that are " + con1[3] + " " + con1[1] + "<br>"
                        }else{
                            text = text +con1[1]+" in "+ con1[0] + " equals " + con1[3] + " in "+ con1[2] + "<br>"
                        }
                    }
                }
                var p1  = document.getElementById("queriesConnections2");

                p1.innerHTML = p1.innerHTML + text;

            }


        }
    }
}

/**
 * Function to show the window that shows the ids of a database that is been introducen on the sparq, the user may choose what ids he want to use on the query
 * @param node
 */
function checkBoxActive(node){
    var p = document.getElementById("conect2");
    var ids = sessionStorage.getItem("idsDesc");
    ids = ids.split("[")[1];
    ids = ids.split("]")[0];
    ids = ids.split(", ")
    var SPARQLall = sessionStorage.getItem("sparqlSlider")
    SPARQLall = SPARQLall.split("[")[1];
    SPARQLall = SPARQLall.split("]")[0];
    SPARQLall = SPARQLall.split(", ");
    for(var l = 0; l < SPARQLall.length; l++){
        if(SPARQLall[l].split("(")[0].toString() == node.toString()){
            var data = SPARQLall[l].split("(")[1]
            data = data.split(")")[0]
            data = data.split(",")
        }
    }
        var text = "";
                for(var j = 0; j < data.length; j++){
                    var ids1 = data[j]
                    text = text + "<input type='checkbox' name='attributes'  value='"+ids1.toString()+"'/>"+ ids1.toString() + "<br>";
                }



    p.innerHTML = text




    document.getElementById('checkBoxQueries').style.display = 'inline';
    document.getElementById('viewport').style.display = 'none';

}

/**
 * Function to get the sparq queries of a database
 */
function returnQueries(){

    document.getElementById('checkBoxQueries').style.display = 'none';
    document.getElementById('viewport').style.display = 'inline';

    var checkBox  = document.getElementById("probando");
    checkBox.innerHTML = "";

}

function progressBarGrown(a){
    document.getElementById("progress-bar").value = a + 5
    if(a < 101){
        window.setTimeout('progressBarGrown('+a+'+5)',1000);
    }else{
        document.getElementById('buttonSPARQL').style.display = 'inline';
    }

}

/**
 * Function that makes the action to download the sparql when finished
 */
function downloadSPARQL(){
    var nodesSPARQL = sessionStorage.getItem("nodesSPARQL");
    nodesSPARQL = nodesSPARQL.split(",")
    var data = ""
    for(var i = 0; i < nodesSPARQL.length; i++){
        data = data + nodesSPARQL[i].toString() + "&&&"
    }
    var dataP = document.getElementById("dataSPARQL")
    dataP.innerHTML = data;
    var checkboxes = document.getElementsByName("attributes");
    var cont = "";
    for (var x=0; x < checkboxes.length; x++) {
        if (checkboxes[x].checked) {
            cont = cont + "&&&" + checkboxes[x].value;
        }
    }

    var checkboxes1 = document.getElementsByName("foo");
    var cont1 = "";
    for (var x=0; x < checkboxes1.length; x++) {
        if (checkboxes1[x].checked) {
            cont1 = cont1 + "&&&" + checkboxes1[x].value;
        }
    }


    $.post("makeSPARQL.jsp", {sparql:data, att:cont, conect:cont1},
        function () {

        });

    document.getElementById('checkBoxSPARQL').style.display = 'inline';
    document.getElementById('viewport').style.display = 'none';

   progressBarGrown(0);

}

/**
 * To close the window of the sparql download
 */
function endDownloadSPARQL(){
    document.getElementById('checkBoxSPARQL').style.display = 'none';
    document.getElementById('viewport').style.display = 'inline';
}


function tutorial(){
    bootbox.dialog({
        title: "Tutorial",
        message: '<div id="tutorialDiv" style="height: 70%;overflow: auto;border: 1px solid #bdbdbd;">',
        buttons: {
            main: {
                label: '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>',
                className: "btn-primary"
            }
        }
    });
    $("#tutorialDiv").load("tutorial/tutorial.html");
}
