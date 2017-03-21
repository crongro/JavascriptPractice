(function() {
    var DOM = {
        mainArea : document.querySelector(".mainArea"),
        sideNav : document.querySelector("nav").querySelector("ul"),
        pageNum : document.querySelectorAll("span"),
        contentBox : document.querySelector(".content"),
        leftButton : document.querySelector(".left"),
        rightButton : document.querySelector(".right"),
        companyList : document.querySelector("nav > ul").children
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
            DOM.sideNav.insertAdjacentHTML('beforeend', "<li>"+data[i].title+"</li>");
        };
        setArticleContainerHTML(0, data);
    }

    function evtn(data){
        for(let i=0; i<DOM.companyList.length; i++){
            DOM.companyList[i].addEventListener("click", function(evt) {
                title = DOM.companyList[i].innerHTML;
                index = getNewIndexNum(title, data);
                setArticleContainerHTML(index, data)                
		    });
        }

        DOM.rightButton.addEventListener("click", function(evt){
            newsName = document.querySelector(".newsName").innerHTML;
            newsIndex = getNewIndexNum(newsName, data);
            if (newsIndex === data.length-1){
                newsIndex = -1;
            }
            setArticleContainerHTML(newsIndex+1, data); 
        });

        DOM.leftButton.addEventListener("click", function(evt){
            newsName = document.querySelector(".newsName").innerHTML;
            newsIndex = getNewIndexNum(newsName, data);
            if (newsIndex === 0){
                newsIndex = data.length;
            }
            setArticleContainerHTML(newsIndex-1, data);
        });
          // function showArticleContainer(index, data){
        //setArticleContainerHTML(index, data);
       
    

    }

   
    
    function deleteCompanyList(companyName, data){

        sideNavHTML = DOM.sideNav.innerHTML;
        sideNavHTML = sideNavHTML.replace('<li>'+companyName+'</li>', '');
        DOM.sideNav.innerHTML = sideNavHTML;
        setArticleContainerHTML(itemIndex, data);
        
    }

    function setArticleContainerHTML(index, data){
        DOM.mainArea.querySelector("strong").innerHTML = index+1;
        companyName = DOM.companyList[index].innerHTML;
        //itemIndex = data.findIndex(x => x.title==companyName);
        newsTemplate = document.querySelector("#newsTemplate").innerHTML;
        articleHTML = '';
        articleData = data[index].newslist;
        for(var i=0; i<articleData.length; i++){
            articleHTML += "<li>"+articleData[i]+"</li>"
        }
        newsTemplate = newsTemplate.replace("{title}", data[index].title).replace("{imgurl}", data[index].imgurl).replace("{newsList}", articleHTML);
        DOM.contentBox.innerHTML = newsTemplate;


        var closeButton = DOM.contentBox.querySelector('button');
        var companyName = document.querySelector(".newsName").innerHTML;
        closeButton.addEventListener("click", function(evt){
            target = evt.target;
            if (target.tagName === "A"){ target = target.parentNode; }
        
            // index = getNewIndexNum(companyName, data);
            console.log(index);
            deleteCompanyList(companyName, data);
            
            //companyName = DOM.companyList[index].innerHTML;
            //deleteCompanyList(index, data); 
        });
    }
})();


// (function(doc, win) {
//     console.log(doc.body);
//     var div = doc.querySelector("div");
//     console.log(div);
// }) (document, window);
// 

// arrowLeft.addEventListener("click", function(){
//     moveLR(jsonObj, "L", currentIdx); //이벤트 큐에 저장된다.
// });

// arrowLeft.addEventListener("click", moveLR.bind(null, jsonObj, "L", curreniDX))