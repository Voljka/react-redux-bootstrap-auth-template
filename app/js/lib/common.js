export const dynamicSort = (property) => {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export const dynamicSortMultiple = () => {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            console.log(result);
            i++;
        }
        return result;
    }
}

export const sortObjectsByValues = (obj) => {
    var keys=Object.keys(obj);
    var kva= keys.map(function(k,i)
    {
        return [k,obj[k]];
    });
    kva.sort(function(a,b){
        if(a[1]>b[1]) return -1;if(a[1]<b[1]) return 1;
        return 0
    });
    var o={}
    kva.forEach(function(a){ o[a[0]]=a[1]})
    return o;
}

export const sortObjectsByKeys = (obj, key) => {
    var keys=Object.keys(obj);
    var kva= keys.map(function(k,i)
    {
        return [k,obj[k]];
    });
    kva.sort(function(a,b){
        k=key;      if(a[1][k]>b[1][k]) return -1;if(a[1][k]<b[1][k]) return 1;
        return 0
    });
    var o={}
    kva.forEach(function(a){ o[a[0]]=a[1]})
    return o;
}

export const arrayToObject = (array) => {
    
    let result = {};

    array.forEach( element => {

        result[element.id] = element.name
    })

    return result;
}

export const cutString = (string, stringLength) => {

    if (string.length < (stringLength + 1)) 
        return string 
    else 
        return string.substring(0, stringLength-2) + '..'
}