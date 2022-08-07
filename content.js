var images = document.getElementsByTagName('img');
for (var i = 0, l = images.length; i < l; i++) {
  images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height;
}


updateChildren(document)

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {


        for(let addedNode of mutation.addedNodes) {
            updateChildren(addedNode)
        }
    })
});
observer.observe(document, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
});

function updateChildren(node) {
    var paragraphs = node.getElementsByTagName('p')
            for(let p of paragraphs) {
                // console.log(p.innerHTML)
                // let capture = "[[(?P<cardname>).*]]"
                let capture = /\[\[(?<name>.*?)\]\]/g

                
                // p.innerHTML = p.innerHTML.replaceAll(capture, "FOO BAR BAZ 1 ")
                
                
                p.innerHTML = p.innerHTML.replaceAll(capture, function(match, cardName, offset) {
                    console.log(match)
                    console.log(cardName)

                    // https://c1.scryfall.com/file/scryfall-cards/normal/front/f/1/f1933d08-07fe-45ea-9b60-d9afb98d5753.jpg?1562855620
                    
                    let img = 'https://c1.scryfall.com/file/scryfall-cards/normal/front/f/1/f1933d08-07fe-45ea-9b60-d9afb98d5753.jpg?1562855620'
                    return `<span style="background:blue;">${cardName}</span><img src=${img}></img>`
                    // return "||" + cardName + "||"
                })


                // p.innerHTML = p.innerHTML.replaceAll("the", "FOO BAR BAZ")
                // p.innerHTML = "foo"
            }
}