//constructor
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
    // 구독 key / val 추가
    model._createNewKeyVal("isSubscribe", true, json);
    
    a = view._showSubscription();
    view._showNavCompanyList(a);
   // console.log(controller.join(model.init,view));

}


document.addEventListener("DOMContentLoaded", function() {
    utility.runAjax("data/newslist.json", "load", main);
});

    
var model = {
    init: [],
    _createNewKeyVal: function(key, val, data){
        for (let i=0; i<data.length; i++){
            data[i][key] = val;
            data[i].id = i;
            model.init.push(data[i]);
        }
    },
}


var view = {
    join : function(model) {
        this.model = model;
    },

    requestPageInfo: function(){

    },

    showPageNum: function(){
        //페이지 번호 1/2
    },

    showContent: function(){
       
     },
     _showNavCompanyList: function(data){
        template = document.querySelector("#companyListTemplate").innerHTML;
        container = document.querySelector(".mainArea > nav");
        contentHTML = '';
        for(var i=0; i<data.length; i++){
            contentHTML += "<li>"+data[i].title+"</li>"
        }
        template = template.replace("{companyList}", contentHTML);
        container.innerHTML = template;
     },

     hideContent : function(){

     },


     hideNavCompany : function(){

     },

     //구독한 리스트
     _showSubscription: function(){
         return controller._filter("isSubscribe", true, model.init);
     }     
}

var controller = {
    join : function(model, view) {
        this.model = model;
        this.view = view;
    },

    getCompanyName : function(){
        //이벤트 실행시, 해당 노드 innerHTML을 찾아 CompanyName값을 가져옴.

    },
    getIndex: function(){
        //해당 객체 회사명을 조회해 index값만 반환
    },

    subscribedPress: function(){
     // 클릭시 false로 바꿈

    },

    subscribedPress: function(){
        
    },

    _filter: function(key, val, data){
        var result = data.filter(function (el) {
            return el[key] === val
        });
        return result? result : null;
    }
}

// var result = allData.filter(function( obj ) {
//         return obj.isSubscribe == true;
//     });
//     console.log(result);
// 

