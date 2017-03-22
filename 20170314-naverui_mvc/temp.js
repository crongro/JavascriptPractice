
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
    
    uiView.menu();
    uiView.header();
    // menu = document.querySelector(".mainArea > nav");
    // menu.addEventListener("load", function() {
    //     console.log(sdf);
    uiView.content();

    
//});
    

}

//각 뷰 함수에는 이벤트만 걸 예정
var uiView = {
    header : function(){
        // view._getCurrentSubscribedList();

    },

    menu: function(){
        view._showSubTitleList();
        
        // show first list 
        firstTitle = view.firstTitle
        view._showContent(firstTitle);
        let pressName = document.querySelectorAll("nav > ul > li");
        for(let i=0; i<pressName.length; i++){
            pressName[i].addEventListener("click", function(evt) {
                name = pressName[i].innerHTML;
                item = pressName[i]
                view._getCurrentIndex(item);

                view._showContent(name);
                uiView.content();
            });
        }
    },

    content: function(){
        const subButton = document.querySelector(".content button");
        if (subButton !== null){
            subButton.addEventListener("click", function(evt){
                target = evt.target;
                if (target.tagName.toLowerCase() !== "button"){ target = target.parentNode; }
                name = document.querySelector(".newsName").innerHTML;
                view._changeSubStatus(name);
                uiView.menu();
                uiView.content();
            });
        }
    }

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

    
    _getCurrentIndex: function(child){
        container = document.querySelector(".mainArea > nav > span");

        nameParent = child.parentNode;
        index = Array.prototype.indexOf.call(nameParent.children, child)+1;

        content = container.innerHTML;
        
        content = content.replace("{currentPageNum}", index);
        // container.innerHTML = content;
        
        // content.innerHTML = container;

    },

    _noSubscribedContent: function(){
        contentBox = document.querySelector(".content");
        contentBox.innerHTML = "현재 구독 중인 언론사가 없습니다";
    },

    _showContent: function(companyName){
        if (companyName === undefined){
            view._noSubscribedContent();
            return;
        }
        controller._getSelectedPageContent(companyName);
        template = document.querySelector("#newsTemplate").innerHTML;
        contentBox = document.querySelector(".content");
        contentHTML = '';
    
        for(var i=0; i<controller.newslist.length; i++){
            contentHTML += "<li>"+controller.newslist[i]+"</li>"
        }
        template = template.replace("{title}", controller.title)
                           .replace("{imgurl}", controller.imgurl)
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

        template = template.replace("{companyList}", contentHTML)
        
        // .replace("{currentPageNum}", titleList.length);

        container.innerHTML = template;
        this.firstTitle = titleList[0];
     },

     _changeSubStatus: function(companyName){
         controller._unscribed(companyName);
     }

     //구독한 리스트
   
 
}


// controller
var controller = {
    //false로 바꾼다...
    _unscribed: function(companyName){
        data = this._getSelectedPageContent(companyName);
        this.data.isSubscribe = false;
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

    _getSelectedID: function(k, v, obj){   
        return obj.findIndex(x => x[k]==v);
    },

    _getSelectedPageContent: function(companyName, data, title, imgurl, newslist, id, isSubscribe){
        this.data = this._filter("title", companyName, model.data)[0];
        this.title = this.data.title;
        this.imgurl = this.data.imgurl;
        this.newslist = this.data.newslist;
        this.id = this.data.id;
        this.isSubscribe = this.data.isSubscribe;
    },

    _getCurrentSubscribedList: function(data, title, imgurl, newslist){
         this.data = this._filter("isSubscribe", true, model.data);
         this.title = this._getObjValList('title', this.data);
         this.imgurl = this._getObjValList('imgurl', this.data);
         this.newslist = this._getObjValList('newslist', this.data);    
    }
}
