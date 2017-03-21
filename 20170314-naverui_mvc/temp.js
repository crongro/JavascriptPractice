
document.addEventListener("DOMContentLoaded", function() {
    utility.runAjax("data/newslist.json", "load", main);
});



// utility
var utility = {
    runAjax : function(url, listener, reqFunc){
        var oReq = new XMLHttpRequest();
        oReq.addEventListener(listener, reqFunc);

        //함수실행
        oReq.open("GET", url);
        oReq.send();
    }
}



 function main(){
    var json = JSON.parse(this.responseText);
    
    model.set(json);
    model.create("isSubscribe", true, json);
    
    menuView();
    headerView();
    contentView();
    
   // console.log(controller.join(model.init,view));

}

//각 뷰 함수에는 이벤트만 걸 예정
function headerView(){

}


function menuView(){
    view._showSubTitleList();
    
    let pressName = document.querySelectorAll("nav > ul > li");

    for(let i=0; i<pressName.length; i++){
        pressName[i].addEventListener("click", function(evt) {
            name = pressName[i].innerHTML;
                view._showContent(name);       
        });
    }
}

function contentView(){
   //삭제' 
}


/* Model */
var model = {
    set: function(data){
        this.data = data;
    },
    create: function(k, v, data){
        for (let i=0; i<data.length; i++){
            data[i][k] = v;
            data[i].id = i;
        }
        data = this.set(data);
    }
}


/* view */
var view = {
    makeTemplate : function(parent, childnode, k, obj) {
        contentHTML = '';
        

    },

    
    showPageNum: function(){
        //페이지 번호 1/2
    },


    _showContent: function(title){
       id = controller._getSelectedPageId('title', title, model.data);
       el = controller._getSelectedPageContent(id);

        
        template = document.querySelector("#newsTemplate").innerHTML;
        contentBox = document.querySelector(".content");
        contentHTML = '';

        articleData = el.newslist;
        for(var i=0; i<articleData.length; i++){
            contentHTML += "<li>"+articleData[i]+"</li>"
        }
       
        template = template.replace("{title}", el.title)
                                    .replace("{imgurl}", el.imgurl)
                                    .replace("{newsList}", contentHTML);
        contentBox.innerHTML = template;
     },

     _showSubTitleList: function(){

        controller._getCurrentSubscribedList();
        titleList = controller.title;
        
        template = document.querySelector("#companyListTemplate").innerHTML;
        container = document.querySelector(".mainArea > nav");
        contentHTML = '';
        
        for(var i=0; i<titleList.length; i++){
            contentHTML += "<li>"+titleList[i]+"</li>"
        }

        template = template.replace("{companyList}", contentHTML);
        container.innerHTML = template;
     },

     //구독한 리스트
   
 
}


// controller
var controller = {
    _changeSubStatus: function(){
        id = controller._getSelectedPageId('title', title, model.data);
        el = controller._getSelectedPageContent(id);

    },
    
    _filter: function(k, v, obj){
        var result = obj.filter(function (el) {
            return el[k] === v
        });
        return result? result : null;
    },

    _getObjValList: function(k, obj){
        return obj.map(function (el) { return el[k]; });
    },

    _getSelectedPageId: function(k, v, obj){   
        return obj.findIndex(x => x[k]==v);
    },

    _getSelectedPageContent: function(num){
        return this._filter("id", num, obj)[0];
    },

    _getCurrentSubscribedList: function(data, title, imgurl){
         this.data = this._filter("isSubscribe", true, model.data);
         this.title = this._getObjValList('title', this.data);
         this.imgurl = this._getObjValList('imgurl', this.data);
         this.newslist = this._getObjValList('newslist', this.data);
        //  return this.title;
    }



    
    

    


    

}

// ar model = {
//     set: function(data){
//         this.data = data;
//     },
//     create: function(k, v, data){
//         for (let i=0; i<data.length; i++){
//             data[i][k] = v;
//             data[i].id = i;
//         }
//         data = this.set(data);
//     }
// }

