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
    view.init();
    view.menu();
    headerView();
    contentView();
    
   // console.log(controller.join(model.init,view));

}

//각 뷰 함수에는 이벤트만 걸 예정
function headerView(){

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
    }
}


var view = {
    init : function(){
        title = controller._getCurrentSubList()[0].title;
        domView._showContent(title); 
    },
    
    menu: function(){
        domView._showSubTitleList();
        let pressName = document.querySelectorAll("nav > ul > li");

        for(let i=0; i<pressName.length; i++){
            pressName[i].addEventListener("click", function(evt) {
                title = pressName[i].innerHTML;
                domView._showContent(title); 
            });
        }
    },

    header : function(){

    },

    content: function(title){
        
    }
    
}

/* view */
var domView = {
    makeTemplate : function(template, contentBox, k, obj) {
        contentHTML = '';
        

    },
    
    showPageNum: function(){
        //페이지 번호 1/2
    },


    _showContent: function(title){
        id = controller._getSelectedPageId('title', title);
        content = controller._getSelectedPageContent(id);
        
        template = document.querySelector("#newsTemplate").innerHTML;
        contentBox = document.querySelector(".content");
        contentHTML = '';

        articleData = content.newslist;
        for(var i=0; i<articleData.length; i++){
            contentHTML += "<li>"+articleData[i]+"</li>"
        }
       
        template = template.replace("{title}", content.title)
                           .replace("{imgurl}", content.imgurl)
                           .replace("{newsList}", contentHTML);
        contentBox.innerHTML = template;
     },

     _showSubTitleList: function(){
        obj = controller._getCurrentSubList();
        titleList = controller._getObjValList('title', obj);
        
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
    //   _createNewData: function(k, v){
    //     for (let i=0; i<model.data.length; i++){
    //         model.data[i][k] = v;
    //         model.data[i].id = i; //id 추가
    //         model.data.push(model.data[i]);
    //     }
    // },

    _changeSubStatus: function(){
     // 클릭시 false로 바꿈

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

    _getSelectedPageId: function(k, v){   
        return model.data.findIndex(x => x[k]==v);
    },
    _getSelectedPageContent: function(num){
        return this._filter("id", num, model.data)[0];
    },
    _getCurrentSubList: function(){
         return controller._filter("isSubscribe", true, model.data);
    },  

}
