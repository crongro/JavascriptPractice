document.addEventListener("DOMContentLoaded", function() {
    utility.runAjax("data/newslist.json", "load", main);
});

function main(){
    var json = JSON.parse(this.responseText);
    model.set(json);
    model.create("isSubscribe", true, json);

    uiView.menu();    
    uiView.header();
    uiView.content();
}

/* Utility */
var utility = {
    runAjax : function(url, listener, reqFunc){
        var oReq = new XMLHttpRequest();
        oReq.addEventListener(listener, reqFunc);
        oReq.open("GET", url);
        oReq.send();
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

/* uiView*/
var uiView = {
    header : function(){
        let buttons = document.querySelectorAll(".btn > button");
        for(let i=0; i<buttons.length; i++){
            tagName = buttons[i].className;
            buttons[i].addEventListener("click", function(evt){
                target = evt.target;
                if (target.tagName.toLowerCase() !== "button"){ target = target.parentNode; }
                if (target.className === 'right'){ view._moveContentPage("right"); }
                if (target.className === 'left'){ view._moveContentPage("left"); }
                uiView.content();
            });
        }
    },

    init: function(){
        view._showSubTitleList();
        firstTitle = view.firstTitle;
        view._showPageContent(firstTitle); 
        view._getCurrentPageInfo();  
    },

    menu: function(){
        view._showSubTitleList();
        view._showPageContent(view.firstTitle); 
        view._getCurrentPageInfo();       
       
        let pressList = document.querySelectorAll("nav > ul > li");
        let pressNum = pressList.length;

        for(let i=0; i<pressNum; i++){
            pressList[i].addEventListener("click", function(evt) {
                name = pressList[i].innerHTML;
                view._showPageContent(name);
                view._getCurrentPageInfo();
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

/* view */
var view = {
    _getCurrentPageInfo: function(){
        const container = document.querySelector(".info_page");
        let content = container.innerHTML;
        
        companyName = document.querySelector(".newsName");
        controller._getCurrentSubscribedList();
        titleList = controller.title;

        if (companyName === null){
            index = 0;
            totalPages = 0;
        }
        else {
            index = titleList.indexOf(companyName.innerHTML)+1
            totalPages = titleList.length;
        }

        let currentPageRegex = /(<strong\b[^>]*>)[^<>]*(<\/strong>)/i;
        let totalPageRegex = /(<span\b[^>]*>)[^<>]*(<\/span>)/i;

        content = content.replace(currentPageRegex, "$1"+index+"$2")
                         .replace(totalPageRegex, "$1"+totalPages+"$2");
        container.innerHTML = content;
    },

    _noSubscribedContent: function(){
        contentBox = document.querySelector(".content");
        contentBox.innerHTML = "현재 구독 중인 언론사가 없습니다";
    },

    _showPageContent: function(companyName){
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
        for(let i=0; i<titleList.length; i++){
            contentHTML += "<li>"+titleList[i]+"</li>"
        }
        template = template.replace("{companyList}", contentHTML)
        container.innerHTML = template;
        this.firstTitle = titleList[0];
     },

     _changeSubStatus: function(companyName){
         controller._unscribed(companyName);
     },

     _moveContentPage: function(position){
        let companyName = document.querySelector(".newsName").innerHTML;
        controller._getCurrentSubscribedList();
        titleList = controller.title;
        if (companyName === null){ return; }
        index = titleList.indexOf(companyName);
        if (position === "right"){
            index = index+1;
            if (index === titleList.length){ index = 0; }
        }

        if (position === "left"){
            index = index-1;            
            if (index < 0){
                index = titleList.length-1;
            }
        }
        if (position === 'next'){
            index = index;
        }
        view._showPageContent(titleList[index]);
        view._getCurrentPageInfo();        
     }
}


// controller
var controller = {

    _unscribed: function(companyName){
        data = this._getSelectedPageContent(companyName);
        this.data.isSubscribe = false;
    },
    
    _filter: function(k, v, obj){
        let result = obj.filter(function (el) {
            return el[k] === v
        });
        return result? result : null;
    },

    _getObjValList: function(k, obj){
        return obj.map(function (el) { return el[k]; });
    },

    // _getSelectedID: function(k, v, obj){   
    //     return obj.findIndex(x => x[k]==v);
    // },

    _getSelectedPageContent: function(companyName, data, title, imgurl, newslist, id, isSubscribe){
        this._getCurrentSubscribedList();
        this.data = this._filter("title", companyName, this.data)[0];
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
