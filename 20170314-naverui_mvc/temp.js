/** /
2017. 03. 23.
Sujin Lee

*/

document.addEventListener("DOMContentLoaded", function() {
    util.runAjax("data/newslist.json", "load", main);
});

/* execute */
function main(){
    let json = JSON.parse(this.responseText);
    model.set(json);
    model.create("isSubscribe", true, json);
    uiView.init();
    uiView.menu();    
    uiView.header();
    uiView.content();
}

/* Utility */
var util = {
    runAjax : function(url, listener, reqFunc){
        let oReq = new XMLHttpRequest();
        oReq.addEventListener(listener, reqFunc);
        oReq.open("GET", url);
        oReq.send();
    },
    $: function(selector) {
        return document.querySelector(selector);
    },
    $$: function(selector){
        return document.querySelectorAll(selector);
    },
    getChildOrder: function(elChild) {
        const elParent = elChild.parentNode;
        let nIndex = Array.prototype.indexOf.call(elParent.children, elChild);
        return nIndex;
    },
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

    init: function(){
        view._showPageContent(0); 
        index = controller._getCurrentIndex(util.$(".newsName"));
        console.log(index);
    },

    header : function(){
        let buttons = util.$$(".btn > button");
        for(let i=0; i<buttons.length; i++){
            buttons[i].addEventListener("click", function(evt){
                target = evt.target;
                if (target.tagName.toLowerCase() !== "button"){ target = target.parentNode; }
                if (target.className === 'right'){ view._moveContentPage("right"); }
                if (target.className === 'left'){ view._moveContentPage("left"); }
                uiView.content();
            });
        }
    },

    menu: function(){
        view._showSubTitleList();
        view._getCurrentPageInfo();
        uiView.menuEvent();   
    },

    menuEvent: function(){
        util.$(".mainArea ul").addEventListener("click", function(evt) {
            const currentOrder = util.getChildOrder(evt.target);
            view._showPageContent(currentOrder);
            view._getCurrentPageInfo();
            uiView.content();
        });
    },

    content: function(){
        const subButton = util.$(".content button");
        currentIndex = controller._getCurrentIndex(util.$(".newsName"));
        if (currentIndex === 0 && titleList.length > 0){
            beforeIndex = titleList.length-1
            
        }
        beforeIndex = currentIndex - 1
//loc_array[loc_array.length-1]


        // if (beforeIndex === 0){
        //     currentIndex + 1;
        //     console.log(currentIndex);
        // }
        uiView.contentEvent(currentIndex, beforeIndex);
    },

    contentEvent: function(currentIndex, beforeIndex){
        const subButton = util.$(".content button");
        subButton.addEventListener("click", function(evt){
            target = evt.target;
            if (target.tagName.toLowerCase() !== "button"){ target = target.parentNode; }
            
            console.log(currentIndex, beforeIndex);
            view._changeSubStatus(currentIndex);
            view._showPageContent(beforeIndex);
            //view._showSubTitleList();
        
            view._getCurrentPageInfo();
            
            uiView.menu();
            
            uiView.content();
        });
       // }
    }
}

/* view */
var view = {
    _getCurrentPageInfo: function(){
        const container = util.$(".info_page");
        let sHTML = container.innerHTML;
        let companyName = util.$(".newsName");
        controller._getCurrentSubscribedList();
        titleList = controller.title;
        if (companyName === null){
            index = 0, totalPages = 0;
        }
        else {
            index = titleList.indexOf(companyName.innerHTML)+1
            totalPages = titleList.length;
        }
        let currentPageRegex = /(<strong\b[^>]*>)[^<>]*(<\/strong>)/i;
        let totalPageRegex = /(<span\b[^>]*>)[^<>]*(<\/span>)/i;
        sHTML = sHTML.replace(currentPageRegex, "$1"+index+"$2")
                     .replace(totalPageRegex, "$1"+totalPages+"$2");
        container.innerHTML = sHTML;
    },

    _noSubscribedContent: function(){
        contentBox = util.$(".content");
        contentBox.innerHTML = "현재 구독 중인 언론사가 없습니다";
    },

    _showPageContent: function(idx){
        if (idx === -1){
            view._noSubscribedContent();
            return;
        }
        controller._getSelectedPageContent(idx);
        if (controller.data === 0){
            view._noSubscribedContent();
            return;
        }
        template = util.$("#newsTemplate").innerHTML;
        contentBox = util.$(".content");
        sHTML = '';
        for(var i=0; i<controller.newslist.length; i++){
            sHTML += "<li>"+controller.newslist[i]+"</li>"
        }
        template = template.replace("{title}", controller.title)
                           .replace("{imgurl}", controller.imgurl)
                           .replace("{newsList}", sHTML);
        contentBox.innerHTML = template;
     },

     _showSubTitleList: function(){
        controller._getCurrentSubscribedList();
        titleList = controller.title;
        template = util.$("#companyListTemplate").innerHTML;
       
        sHTML = '';
        for(let i=0; i<titleList.length; i++){
            sHTML += "<li>"+titleList[i]+"</li>"
        }
        template = template.replace("{companyList}", sHTML)
        
         container = util.$(".mainArea > nav");
         container.innerHTML = template;
        // const currentOrder = util.getChildOrder(container);
        // this.firstIndex = currentOrder;
     },

     _changeSubStatus: function(idx){
         controller._unscribed(idx);
     },

     _moveContentPage: function(position){
        index = controller._getCurrentIndex(util.$(".newsName"));
        if (position === "right"){
            index ++;
            if (index === titleList.length){ index = 0; }
        }
        if (position === "left"){
            index --;            
            if (index < 0){index = titleList.length-1;}
        }
        view._showPageContent(index);
        view._getCurrentPageInfo();        
     }
}

/* controller */
var controller = {
    _getCurrentIndex: function(node){
        this._getCurrentSubscribedList();
        titleList = this.title;
        idx = titleList.indexOf(node.innerHTML);
        return idx;
    },
    _unscribed: function(idx){
        data = this._getSelectedPageContent(idx);
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

    _getSelectedPageContent: function(num, data, title, imgurl, newslist, id, isSubscribe){
        this._getCurrentSubscribedList();
        
        this.data = this.data[num];
        
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
// if (this.data.length === 0){
//             view._noSubscribedContent();
//             return;
//         }
