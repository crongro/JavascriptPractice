//constructor
// function BaseObj(title, imgurl, newlist, subscribe){
//     this.title = title;
//     this.imgurl = imgurl;
//     this.newlist = [];
//     this.subscribe = subscribe;
// }



var utilObj = {
    runAjax : function(url){
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function(){
             data = JSON.parse(this.responseText);
        });
        oReq.open("GET", url);
        oReq.send();
        
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    console.log(utilObj.runAjax('data/newslist.json'));

});

var model = {

}

// 삭제 시  model.controller.isSubscrbe
// 




var view = {
    showPageNum: function(){
        //페이지 번호 1/2
    },

     showContent: function(){
       
     },
     showNavCompany: function(){
          //subscribedPress리스트 보여줌
     },

     hideContent : function(){

     },


     hideNavCompany : function(){

     }
     
}


var controller = function(model){
// //     this.model = model 
//         return this;
// // }
}
// newObject
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

    isSubscrbe: function(){
     // 클릭시 false로 바꿈

    },

    subscribedPress: function(){
         //filter = false인 객체만 조회
     }
}

// controller.join(model,view);

