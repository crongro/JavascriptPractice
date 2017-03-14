
var sectionList = document.querySelectorAll("div");

function chkClassDashStr(lst){
    var count = 0;
    for (var i = 0; i < lst.length; i++){
        
        str = lst[i].className;
        if ( /[-_]/g.test(str)){
            lst[i].className = deleteClassStr(str);
            count++;
        }

    }
    return count;
}

chkClassDashStr(sectionList);

function deleteClassStr(){
    return '';
}