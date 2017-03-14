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

    var url = '../data/newslist.json';
    runXHR(url);

    function runXHR(url) {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", main);
        oReq.open("GET", url);
        oReq.send();
    }

    function main() {
        var data = JSON.parse(this.responseText);
        init(data);
        evtn(data);
    }

    function init(data){
        DOM.sideNav.insertAdjacentHTML('beforebegin', "<span><strong></strong>/"+data.length+"</span>");
        for (var i in data) {
            companyName = data[i].title ;
            DOM.sideNav.insertAdjacentHTML('beforeend', "<li>"+companyName+"</li>");
        };
        showArticleContainer(0, data[0]);
    }

    function evtn(data){
        var index = 0;
        for(var i=0; i<DOM.companyList.length; i++){
            DOM.companyList[i].addEventListener("click", function(evt) {
                index = [].indexOf.call (this.parentNode.children, this);
                showArticleContainer(index, data[index])                
		    });
        }

        var index = 0;
        DOM.rightButton.addEventListener("click", function(evt){
            index++;
            if (index > data.length-1){ index = data.length-1;}
            showArticleContainer(index, data[index]); 
        });

        DOM.leftButton.addEventListener("click", function(evt){
            if (index < 1){
                index = 1;
            }
            index--;
            showArticleContainer(index, data[index]);
        });

        
        // closeButton.addEventListener("click", function(evt){
        //     if (evt.target.tagName === "A"){
        //         evt.target;
        //         console.log(evt.target.parentNode);
        //     }
        //     console.log(evt);
        //     index = [].indexOf.call (this.parentNode.children, this);
            
        //     deleteList(index, data);
        //     //content의 해당 인덱스 번호 삭제 -> 불필요
        //     data.splice(index,1);
        //     showArticleContainer(index, data[index]);
        //     //data배열의 현재 인덱스 값 삭제
        //     //신문기사 숫자 변경하기 --> data값 삭제후 변경
        //     readNavLength(index, data);
        // });
        


    }
    
    //hwigyum written
    function deleteCompanyList(index, data){
        //var title = data[index].title;
        // for(i=0; i < liList.length; i++){
        //     if(controlData === liList[i].innerText){
        //         DOM.sideNav.removeChild(liList[i])
        //     }
        // }
    }

    function readNavLength(index, data){
        var contentLength = document.querySelector(".mainArea nav span");
        var baseString = "<span>​<strong>​" //1​</strong>​"/4"</span>​""
        // var baseHTML = contentLength.innerHTML;
        baseString = baseString + (index+1) + "</strong>​/" + data.length + "</span>​"
        contentLength.innerHTML = baseString;
    }

    function showArticleContainer(index, data){
        DOM.mainArea.querySelector("strong").innerHTML = index+1;
        Newstemplate = document.querySelector("#newsTemplate").innerHTML;
        Newstemplate = Newstemplate.replace("{title}", data.title);
        Newstemplate = Newstemplate.replace("{imgurl}", data.imgurl);
        articleHTML = '';
        articleData = data.newslist;
        for(var i=0; i<articleData.length; i++){
            articleHTML += "<li>"+articleData[i]+"</li>"
        }
        Newstemplate = Newstemplate.replace("{newsList}", articleHTML);
        DOM.contentBox.innerHTML = Newstemplate;

        var closeButton = DOM.contentBox.querySelector('button');
        closeButton.addEventListener("click", function(evt){
            target = evt.target;
            if (target.tagName === "A"){
                target = target.parentNode;
            }
            deleteCompanyList(index, data);

           
            // index = [].indexOf.call (this.parentNode.children, this);
            
            // deleteList(index, data);
            // //content의 해당 인덱스 번호 삭제 -> 불필요
            // data.splice(index,1);
            // showArticleContainer(index, data[index]);
            // //data배열의 현재 인덱스 값 삭제
            // //신문기사 숫자 변경하기 --> data값 삭제후 변경
            // readNavLength(index, data);
        });

    }



})();