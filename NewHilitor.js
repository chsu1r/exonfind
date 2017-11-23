// adapted from original JavaScript code by Chirp Internet: www.chirp.com.au

function NewHilitor(id) {

    var targetNode = document.getElementById(id) || document.body;
    var hiliteTag = "EM";
    var skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
    var colors = "#ff6";
    var wordColor = [];
    var colorIdx = 0;
    var newline = false;
    var tagOff = true;
    var total_count = 1;

    // recursively apply word highlighting
    this.hiliteWords = function (node) {
        if (node === undefined || !node) return;

        if (skipTags.test(node.nodeName)) return;

        if (node.hasChildNodes()) {
            for (var i = 0; i < node.childNodes.length; i++)
                this.hiliteWords(node.childNodes[i]);
        }
        if (node.nodeType == 3) { // NODE_TEXT

            if((nv = node.nodeValue) && (typeof node.nodeValue == "string")){
                    var current_start = 0;
                    var exon_start = "";
                    var offset=0;
                    for(i=0;i<nv.length;i++){
                        var cur_char = nv.charAt(i);
                        if(cur_char=="\n"){
                            newline = true;
                        }
                        
                        if((newline === true)&&((cur_char==='A')||(cur_char === 'C') || (cur_char === 'G') || (cur_char === 'T') || (cur_char === 't') || (cur_char === 'a')||(cur_char==='g')||(cur_char === 'c'))){
                            if(cur_char === cur_char.toUpperCase()){
                                if(tagOff===true){
                                    tagOff = false;
                                    current_start = i;
                                    exon_start = cur_char;
                                }
                            }
                            else{
                                if(tagOff===false){

                                    var match = document.createElement(hiliteTag);

                                    match.appendChild(document.createTextNode(nv.slice(current_start,i)));

                                    match.style.backgroundColor = colors;
                                    match.style.fontStyle = "inherit";
                                    match.style.color = "#000";
                                    str_total_count =  String(total_count);
                                    match.setAttribute('title',str_total_count);
                                    total_count=total_count+1;
                                    var after = node.splitText(current_start-offset);
                                    after.nodeValue = after.nodeValue.substring(i-current_start);
                                    node.parentNode.insertBefore(match,after);
                                    node = after;
                                    tagOff = true;
                                    offset = i;
                                }
                            }
                        }
                    }
                    if(tagOff===false){

                        var match = document.createElement(hiliteTag);

                        match.appendChild(document.createTextNode(nv.slice(current_start,nv.length)));

                        match.style.backgroundColor = colors;
                        match.style.fontStyle = "inherit";
                        match.style.color = "#000";
                        str_total_count =  String(total_count);
                        match.setAttribute('title',str_total_count);
                        total_count=total_count+1;
                        var after = node.splitText(current_start-offset);
                        after.nodeValue = after.nodeValue.substring(nv.length-current_start);
                        node.parentNode.insertBefore(match,after);
                        node = after;
                        tagOff = true;
                        offset = nv.length;
                    }
                }
            }
        };

    // remove highlighting
    this.remove = function () {
        var arr = document.getElementsByTagName(hiliteTag);
        while (arr.length && (el = arr[0])) {
            var parent = el.parentNode;
            parent.replaceChild(el.firstChild, el);
            parent.normalize();
        }
    };

    // start highlighting at target node
    this.apply = function () {
        this.hiliteWords(targetNode);
    };
}