


(function() {
    var DOM = {
        mainArea : document.querySelector(".mainArea"),
        sideNav : document.querySelector("nav").querySelector("ul"),
        pageNum : document.querySelectorAll("span"),
        contentBox : document.querySelector(".content"),
        leftButton : document.querySelector(".left"),
        rightButton : document.querySelector(".right"),
        companyList : document.querySelector("nav").querySelector("ul").children,
    };

    var url = 'data/newslist.json';
    runXHR(url);

    function runXHR(url) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", main);
        oReq.open("GET", url);
        oReq.send();
    }

    function main() {
        var dataSet = JSON.parse(this.responseText);
        init(dataSet);
        evtn(dataSet);
    }

    function init(data){
        DOM.sideNav.insertAdjacentHTML('beforebegin', "<span><strong></strong>/"+data.length+"</span>");
        for (var i in data) {
            companyName = data[i].title ;
            DOM.sideNav.insertAdjacentHTML('beforeend', "<li>"+companyName+"</li>");
        };
        showArticleContainer(0, data);
    }
    var index = 0;
    function evtn(data){
        
        for(var i=0; i<DOM.companyList.length; i++){
            DOM.companyList[i].addEventListener("click", function(evt) {
                index = [].indexOf.call (this.parentNode.children, this);
                showArticleContainer(index, data)                
		    });
        }

        DOM.rightButton.addEventListener("click", function(evt){
            index++;
            if (index > data.length-1){ index = data.length-1;}
            showArticleContainer(index, data); 
        });

        DOM.leftButton.addEventListener("click", function(evt){
            if (index < 1){
                index = 1;
            }
            index--;
            showArticleContainer(index, data);
        });
    }
    
    function deleteCompanyList(index, data){
        DOM.sideNav.removeChild(DOM.sideNav.childNodes[index+1]);
        setArticleContainerHTML(index, data);
    }


    function showArticleContainer(index, data){
        
        setArticleContainerHTML(index, data);

        var closeButton = DOM.contentBox.querySelector('button');
        closeButton.addEventListener("click", function(evt){
            target = evt.target;
            if (target.tagName === "A"){
                target = target.parentNode;
            }
            console.log(target);
            companyName = DOM.companyList[index].innerHTML;
        
            deleteCompanyList(index, data);
            
            
        });
    }

    function setArticleContainerHTML(index, data){

        DOM.mainArea.querySelector("strong").innerHTML = index+1;
        companyName = DOM.companyList[index].innerHTML;
        itemIndex = data.findIndex(x => x.title==companyName);

        Newstemplate = document.querySelector("#newsTemplate").innerHTML;
        Newstemplate = Newstemplate.replace("{title}", data[itemIndex].title);
        Newstemplate = Newstemplate.replace("{imgurl}", data[itemIndex].imgurl);
        articleHTML = '';
        articleData = data[itemIndex].newslist;
        for(var i=0; i<articleData.length; i++){
            articleHTML += "<li>"+articleData[i]+"</li>"
        }
        Newstemplate = Newstemplate.replace("{newsList}", articleHTML);
        DOM.contentBox.innerHTML = Newstemplate;
    }




})();