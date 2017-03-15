2015.03.14

### 1. DOM className을 정규표현식을 사용

* 조건1 : "-"가 들어가 있는 클래스
* 조건2 : "_"가 들어가 있는 클래스

```javascript
var sectionList = document.querySelectorAll("div");

function chkClassDashStr(lst){
    var count = 0;
    for (var i = 0; i < lst.length; i++){
        str = lst[i].className;
        if ( /[-_]/g.test(str)){
            lst[i].className = deleteClassStr(str);
            count++;
        }
    }
    return count;
}

chkClassDashStr(sectionList);

function deleteClassStr(){
    return '';
}
```

```javascript
const className = 'scrollbar-v scrollbar-show scrollbar-disabled goodDash badCamell forExample1'; // tag.className;
console.log(className.match(/[^\s]*[-_][^\s]*(?=\s|$)/g));
```