"use strict";
(async function (){
    function books(){
        return fetch('https://openlibrary.org/books/OL7353617M.json')
            .then(response => response.json())
            // .then(data => {
            //     return data.title;
            //
            // })
            .catch((error) => error)
    }
    let title = await books();
    console.log(title);
})()
